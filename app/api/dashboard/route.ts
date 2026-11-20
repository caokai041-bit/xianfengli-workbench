import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { submissions, users } from "@/db/schema";
import { getSessionUser, publicUser } from "@/lib/auth";
import { MODULES, TASK_MAP, TASKS, VETO_ITEMS } from "@/lib/tasks";

export async function GET(request: Request) {
  const current = await getSessionUser(request);
  if (!current) return Response.json({ error: "请先登录" }, { status: 401 });

  const db = getDb();
  const studentRows = await db.select().from(users).where(eq(users.role, "student"));
  const allRows = await db
    .select({ submission: submissions, student: users })
    .from(submissions)
    .innerJoin(users, eq(submissions.userId, users.id))
    .orderBy(desc(submissions.submittedAt));

  const approvedByStudent = new Map<string, number>();
  for (const row of allRows) {
    if (row.submission.status === "approved") {
      approvedByStudent.set(row.student.id, (approvedByStudent.get(row.student.id) ?? 0) + row.submission.awardedPoints);
    }
  }
  const rankings = studentRows
    .map((student) => ({ ...publicUser(student), totalPoints: approvedByStudent.get(student.id) ?? 0 }))
    .sort((a, b) => b.totalPoints - a.totalPoints || a.name.localeCompare(b.name, "zh-CN"))
    .map((student, index) => ({ ...student, rank: index + 1 }));

  const visibleRows = current.role === "admin" ? allRows : allRows.filter((row) => row.student.id === current.id);
  const records = visibleRows.map(({ submission, student }) => ({
    ...submission,
    student: publicUser(student),
    task: TASK_MAP[submission.taskId] ?? null,
    evidencePath: submission.evidenceData ? `/api/evidence/${submission.id}` : "",
  }));

  return Response.json({
    user: publicUser(current),
    modules: MODULES,
    tasks: TASKS,
    vetoItems: VETO_ITEMS,
    records,
    rankings,
    students: current.role === "admin" ? studentRows.map(publicUser) : undefined,
  });
}
