import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { createSession, hashPassword, publicUser, sessionCookie } from "@/lib/auth";
import { ensureDemoData } from "@/lib/seed";

export async function POST(request: Request) {
  await ensureDemoData();
  const payload = (await request.json().catch(() => ({}))) as { username?: string; password?: string };
  const username = payload.username?.trim().toLowerCase() ?? "";
  const password = payload.password ?? "";
  if (!username || !password) return Response.json({ error: "请输入账号和密码" }, { status: 400 });

  const [user] = await getDb().select().from(users).where(eq(users.username, username)).limit(1);
  if (!user || user.status !== "active" || (await hashPassword(username, password)) !== user.passwordHash) {
    return Response.json({ error: "账号或密码不正确" }, { status: 401 });
  }
  const token = await createSession(user.id);
  return Response.json(
    { user: publicUser(user) },
    { headers: { "Set-Cookie": sessionCookie(token) } },
  );
}
