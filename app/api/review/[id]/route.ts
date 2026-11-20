import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { submissions } from "@/db/schema";
import { getSessionUser } from "@/lib/auth";
import { TASK_MAP } from "@/lib/tasks";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser(request);
  if (!user || user.role !== "admin") return Response.json({ error: "仅管理员可审核" }, { status: 403 });
  const { id } = await context.params;
  const payload = (await request.json()) as { action?: "approve" | "reject"; points?: number; reason?: string };
  const [record] = await getDb().select().from(submissions).where(eq(submissions.id, id)).limit(1);
  if (!record || record.status !== "pending") return Response.json({ error: "该申请不存在或已审核" }, { status: 404 });

  const reason = payload.reason?.trim() ?? "";
  if (payload.action === "reject") {
    if (!reason) return Response.json({ error: "驳回时必须填写原因" }, { status: 400 });
    await getDb().update(submissions).set({ status: "rejected", awardedPoints: 0, reviewReason: reason, reviewerId: user.id, reviewedAt: new Date().toISOString() }).where(eq(submissions.id, id));
    return Response.json({ ok: true });
  }

  const points = Number(payload.points);
  const task = TASK_MAP[record.taskId];
  if (payload.action !== "approve" || !task || !Number.isInteger(points) || points < 0 || (task.maxPoints !== null && points > task.maxPoints)) {
    return Response.json({ error: "审核分值不符合任务计分规则" }, { status: 400 });
  }
  await getDb().update(submissions).set({ status: "approved", awardedPoints: points, reviewReason: reason, reviewerId: user.id, reviewedAt: new Date().toISOString() }).where(eq(submissions.id, id));
  return Response.json({ ok: true });
}
