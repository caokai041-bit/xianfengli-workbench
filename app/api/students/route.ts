import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { getSessionUser, hashPassword } from "@/lib/auth";

async function requireAdmin(request: Request) {
  const user = await getSessionUser(request);
  return user?.role === "admin" ? user : null;
}

export async function POST(request: Request) {
  if (!(await requireAdmin(request))) return Response.json({ error: "仅管理员可新增账号" }, { status: 403 });
  const payload = (await request.json()) as { username?: string; password?: string; name?: string; className?: string; studentNo?: string };
  const username = payload.username?.trim().toLowerCase() ?? "";
  const password = payload.password ?? "";
  const name = payload.name?.trim() ?? "";
  if (!/^[a-z0-9_-]{3,24}$/.test(username) || password.length < 6 || !name) {
    return Response.json({ error: "请填写姓名；账号限3至24位字母、数字；密码至少6位" }, { status: 400 });
  }
  const existing = await getDb().select({ id: users.id }).from(users).where(eq(users.username, username)).limit(1);
  if (existing.length) return Response.json({ error: "该账号已存在" }, { status: 409 });
  await getDb().insert(users).values({
    id: crypto.randomUUID(),
    username,
    passwordHash: await hashPassword(username, password),
    name,
    role: "student",
    className: payload.className?.trim() ?? "",
    studentNo: payload.studentNo?.trim() ?? "",
    status: "active",
    createdAt: new Date().toISOString(),
  });
  return Response.json({ ok: true }, { status: 201 });
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin(request))) return Response.json({ error: "仅管理员可管理账号" }, { status: 403 });
  const payload = (await request.json()) as { id?: string; status?: "active" | "disabled" };
  if (!payload.id || !["active", "disabled"].includes(payload.status ?? "")) return Response.json({ error: "参数错误" }, { status: 400 });
  await getDb().update(users).set({ status: payload.status }).where(eq(users.id, payload.id));
  return Response.json({ ok: true });
}
