import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  role: text("role", { enum: ["student", "admin"] }).notNull(),
  className: text("class_name").notNull().default(""),
  studentNo: text("student_no").notNull().default(""),
  status: text("status", { enum: ["active", "disabled"] }).notNull().default("active"),
  createdAt: text("created_at").notNull(),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  expiresAt: text("expires_at").notNull(),
  createdAt: text("created_at").notNull(),
});

export const submissions = sqliteTable("submissions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  taskId: text("task_id").notNull(),
  description: text("description").notNull(),
  evidenceName: text("evidence_name").notNull().default(""),
  evidenceKey: text("evidence_key").notNull().default(""),
  evidenceUrl: text("evidence_url").notNull().default(""),
  requestedPoints: integer("requested_points").notNull(),
  awardedPoints: integer("awarded_points").notNull().default(0),
  status: text("status", { enum: ["pending", "approved", "rejected"] }).notNull().default("pending"),
  reviewReason: text("review_reason").notNull().default(""),
  reviewerId: text("reviewer_id").references(() => users.id),
  submittedAt: text("submitted_at").notNull(),
  reviewedAt: text("reviewed_at"),
});

export type User = typeof users.$inferSelect;
export type Submission = typeof submissions.$inferSelect;
