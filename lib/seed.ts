import { getDb } from "@/db";
import { submissions, users } from "@/db/schema";

const demoUsers = [
  { id: "admin-demo", username: "admin", passwordHash: "3c3aad7cb839a9e7a13e59ece6bf030189f434a1775744ddafb30b5fd40c1952", name: "陈老师", role: "admin" as const, className: "学生党建工作组", studentNo: "", status: "active" as const, createdAt: "2026-09-01T00:00:00.000Z" },
  { id: "student-demo-01", username: "stu01", passwordHash: "a432dc3255aae89a1e283bcc41e7ad862eb13b1033a2a125f0c661a4509e2601", name: "林晓舟", role: "student" as const, className: "供应链2401", studentNo: "2024010101", status: "active" as const, createdAt: "2026-09-01T00:00:00.000Z" },
  { id: "student-demo-02", username: "stu02", passwordHash: "9e8a64c0e6c278fe0fc24d781e4d578da7a1e2c586ed9755c251136b6993e63d", name: "周雨桐", role: "student" as const, className: "供应链2402", studentNo: "2024010206", status: "active" as const, createdAt: "2026-09-01T00:00:00.000Z" },
  { id: "student-demo-03", username: "stu03", passwordHash: "0e69410e58d4528fa101884d06bcf4f4b000ee9b680b47307b623c33f8c2948f", name: "王子涵", role: "student" as const, className: "物流管理2401", studentNo: "2024020112", status: "active" as const, createdAt: "2026-09-01T00:00:00.000Z" },
  { id: "student-demo-04", username: "stu04", passwordHash: "be3df45c5c8118b27b0450fc8d3dcc710d3986a33c02c73bf2ba55089b2a71a3", name: "赵一诺", role: "student" as const, className: "物流管理2402", studentNo: "2024020218", status: "active" as const, createdAt: "2026-09-01T00:00:00.000Z" },
];

const demoSubmissions = [
  { id: "demo-s01", userId: "student-demo-02", taskId: "t05", description: "在团支部开展党的二十届四中全会精神学习分享，完成签到与活动记录。", evidenceUrl: "https://example.com/demo", requestedPoints: 8, awardedPoints: 8, status: "approved" as const, reviewReason: "材料完整，活动记录清晰。", reviewerId: "admin-demo", submittedAt: "2026-11-17T06:20:00.000Z", reviewedAt: "2026-11-18T02:10:00.000Z", evidenceName: "", evidenceKey: "" },
  { id: "demo-s02", userId: "student-demo-02", taskId: "t22", description: "本学期累计完成校内志愿服务32小时，提交志愿汇平台记录。", evidenceUrl: "https://example.com/demo", requestedPoints: 12, awardedPoints: 12, status: "approved" as const, reviewReason: "时长核验无误。", reviewerId: "admin-demo", submittedAt: "2026-11-15T09:10:00.000Z", reviewedAt: "2026-11-16T01:20:00.000Z", evidenceName: "", evidenceKey: "" },
  { id: "demo-s03", userId: "student-demo-03", taskId: "t08", description: "担任班级学习委员并完成学期阶段性履职总结，班级考核结果合格。", evidenceUrl: "https://example.com/demo", requestedPoints: 5, awardedPoints: 5, status: "approved" as const, reviewReason: "履职情况属实。", reviewerId: "admin-demo", submittedAt: "2026-11-13T08:30:00.000Z", reviewedAt: "2026-11-14T01:10:00.000Z", evidenceName: "", evidenceKey: "" },
  { id: "demo-s04", userId: "student-demo-03", taskId: "t14", description: "完成学院迎新志愿服务主题推文撰写并在学院公众号发布。", evidenceUrl: "https://example.com/demo", requestedPoints: 3, awardedPoints: 3, status: "approved" as const, reviewReason: "推文已发布。", reviewerId: "admin-demo", submittedAt: "2026-11-12T03:15:00.000Z", reviewedAt: "2026-11-12T09:45:00.000Z", evidenceName: "", evidenceKey: "" },
  { id: "demo-s05", userId: "student-demo-04", taskId: "t10", description: "面向班级开展诚信考试主题微课，介绍考试纪律与学术诚信要求。", evidenceUrl: "https://example.com/demo", requestedPoints: 5, awardedPoints: 0, status: "pending" as const, reviewReason: "", reviewerId: null, submittedAt: "2026-11-20T03:25:00.000Z", reviewedAt: null, evidenceName: "", evidenceKey: "" },
  { id: "demo-s06", userId: "student-demo-01", taskId: "t04", description: "本学期学习强国连续四个月月均积分超过400分，提交积分明细截图。", evidenceUrl: "https://example.com/demo", requestedPoints: 2, awardedPoints: 0, status: "pending" as const, reviewReason: "", reviewerId: null, submittedAt: "2026-11-20T05:00:00.000Z", reviewedAt: null, evidenceName: "", evidenceKey: "" },
];

export async function ensureDemoData() {
  const db = getDb();
  await db.insert(users).values(demoUsers).onConflictDoNothing();
  await db.insert(submissions).values(demoSubmissions).onConflictDoNothing();
}
