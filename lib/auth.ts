import { and, eq, gt } from "drizzle-orm";
import { getDb } from "@/db";
import { sessions, users, type User } from "@/db/schema";

const COOKIE_NAME = "xianfeng_session";
const encoder = new TextEncoder();

function bytesToHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function hashPassword(username: string, password: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: encoder.encode(`xianfeng:${username}`), iterations: 100_000 },
    key,
    256,
  );
  return bytesToHex(bits);
}

export function sessionCookie(token: string, maxAge = 60 * 60 * 24 * 7) {
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}; Secure`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Secure`;
}

export function cookieToken(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`));
  return match?.[1] ?? "";
}

export async function createSession(userId: string) {
  const db = getDb();
  const now = new Date();
  const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const token = `${crypto.randomUUID()}${crypto.randomUUID().replaceAll("-", "")}`;
  await db.insert(sessions).values({
    id: token,
    userId,
    createdAt: now.toISOString(),
    expiresAt: expires.toISOString(),
  });
  return token;
}

export async function getSessionUser(request: Request): Promise<User | null> {
  const token = cookieToken(request);
  if (!token) return null;
  const db = getDb();
  const rows = await db
    .select({ user: users })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(and(eq(sessions.id, token), gt(sessions.expiresAt, new Date().toISOString())))
    .limit(1);
  const user = rows[0]?.user ?? null;
  return user?.status === "active" ? user : null;
}

export async function destroySession(request: Request) {
  const token = cookieToken(request);
  if (token) await getDb().delete(sessions).where(eq(sessions.id, token));
}

export function publicUser(user: User) {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    className: user.className,
    studentNo: user.studentNo,
    status: user.status,
  };
}
