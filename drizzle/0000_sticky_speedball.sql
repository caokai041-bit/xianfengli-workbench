CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`task_id` text NOT NULL,
	`description` text NOT NULL,
	`evidence_name` text DEFAULT '' NOT NULL,
	`evidence_key` text DEFAULT '' NOT NULL,
	`evidence_url` text DEFAULT '' NOT NULL,
	`requested_points` integer NOT NULL,
	`awarded_points` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`review_reason` text DEFAULT '' NOT NULL,
	`reviewer_id` text,
	`submitted_at` text NOT NULL,
	`reviewed_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`reviewer_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`name` text NOT NULL,
	`role` text NOT NULL,
	`class_name` text DEFAULT '' NOT NULL,
	`student_no` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);