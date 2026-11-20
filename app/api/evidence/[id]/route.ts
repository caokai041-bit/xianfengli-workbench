import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { submissions } from "@/db/schema";
import { getSessionUser } from "@/lib/auth";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser(request);
  if (!user) return new Response("Unauthorized", { status: 401 });
  const { id } = await context.params;
  const [record] = await getDb().select().from(submissions).where(eq(submissions.id, id)).limit(1);
  if (!record || !record.evidenceData || (user.role !== "admin" && record.userId !== user.id)) return new Response("Not found", { status: 404 });
  return new Response(Buffer.from(record.evidenceData, "base64"), {
    headers: {
      "Content-Type": record.evidenceKey || "application/octet-stream",
      "Content-Disposition": `inline; filename*=UTF-8''${encodeURIComponent(record.evidenceName || "evidence")}`,
    },
  });
}
