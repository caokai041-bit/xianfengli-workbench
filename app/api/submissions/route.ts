import { env } from "cloudflare:workers";
import { getDb } from "@/db";
import { submissions } from "@/db/schema";
import { getSessionUser } from "@/lib/auth";
import { TASK_MAP } from "@/lib/tasks";

const MAX_FILE_SIZE = 8 * 1024 * 1024;
const ACCEPTED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export async function POST(request: Request) {
  const user = await getSessionUser(request);
  if (!user || user.role !== "student") return Response.json({ error: "仅学生可提交申请" }, { status: 403 });

  const form = await request.formData();
  const taskId = String(form.get("taskId") ?? "");
  const description = String(form.get("description") ?? "").trim();
  const evidenceUrl = String(form.get("evidenceUrl") ?? "").trim();
  const requestedPoints = Number(form.get("requestedPoints") ?? 0);
  const file = form.get("file");
  const task = TASK_MAP[taskId];

  if (!task || description.length < 10) {
    return Response.json({ error: "请选择任务，并填写不少于10字的完成说明" }, { status: 400 });
  }
  if (!Number.isInteger(requestedPoints) || requestedPoints < 1 || (task.maxPoints !== null && requestedPoints > task.maxPoints)) {
    return Response.json({ error: "申请分值超出该任务的计分范围" }, { status: 400 });
  }
  if (!(file instanceof File) && !evidenceUrl) {
    return Response.json({ error: "请上传证明材料或填写材料链接" }, { status: 400 });
  }

  let evidenceKey = "";
  let evidenceName = "";
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_SIZE || !ACCEPTED_TYPES.has(file.type)) {
      return Response.json({ error: "材料仅支持 PDF、JPG、PNG、DOCX，且不超过8MB" }, { status: 400 });
    }
    if (!env.BUCKET) return Response.json({ error: "文件存储暂不可用，请改用材料链接" }, { status: 503 });
    evidenceKey = `${user.id}/${Date.now()}-${crypto.randomUUID()}`;
    evidenceName = file.name.slice(0, 120);
    await env.BUCKET.put(evidenceKey, file.stream(), { httpMetadata: { contentType: file.type } });
  }

  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  await getDb().insert(submissions).values({
    id,
    userId: user.id,
    taskId,
    description,
    evidenceName,
    evidenceKey,
    evidenceUrl,
    requestedPoints,
    awardedPoints: 0,
    status: "pending",
    reviewReason: "",
    submittedAt: now,
  });
  return Response.json({ ok: true, id }, { status: 201 });
}
