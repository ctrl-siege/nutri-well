import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await payload.db.drizzle.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await payload.db.drizzle.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await payload.db.drizzle.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await payload.db.drizzle.run(sql`CREATE TABLE \`patients\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`first_name\` text NOT NULL,
  	\`last_name\` text NOT NULL,
  	\`full_name\` text,
  	\`birth_date\` text NOT NULL,
  	\`gender\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`college_department\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`patients_email_idx\` ON \`patients\` (\`email\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`patients_updated_at_idx\` ON \`patients\` (\`updated_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`patients_created_at_idx\` ON \`patients\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE TABLE \`nutrition_assessments\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`patient_id\` integer NOT NULL,
  	\`assessment_date\` text NOT NULL,
  	\`food_nutrition_history\` text NOT NULL,
  	\`anthropometric_height\` numeric NOT NULL,
  	\`anthropometric_weight\` numeric NOT NULL,
  	\`anthropometric_bmi\` numeric,
  	\`anthropometric_notes\` text,
  	\`biochemical_data_content\` text NOT NULL,
  	\`physical_findings_content\` text NOT NULL,
  	\`client_history_content\` text NOT NULL,
  	\`assessment_tools_content\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`patient_id\`) REFERENCES \`patients\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await payload.db.drizzle.run(sql`CREATE INDEX \`nutrition_assessments_patient_idx\` ON \`nutrition_assessments\` (\`patient_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`nutrition_assessments_created_at_idx\` ON \`nutrition_assessments\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE TABLE \`nutrition_assessments_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`nutrition_assessments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE INDEX \`nutrition_assessments_rels_order_idx\` ON \`nutrition_assessments_rels\` (\`order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`nutrition_assessments_rels_parent_idx\` ON \`nutrition_assessments_rels\` (\`parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`nutrition_assessments_rels_path_idx\` ON \`nutrition_assessments_rels\` (\`path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`nutrition_assessments_rels_media_id_idx\` ON \`nutrition_assessments_rels\` (\`media_id\`);`)
  await payload.db.drizzle.run(sql`CREATE TABLE \`nutrition_diagnoses_nutrition_problems\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`domain\` text NOT NULL,
  	\`content\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`nutrition_diagnoses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE INDEX \`nutrition_diagnoses_nutrition_problems_order_idx\` ON \`nutrition_diagnoses_nutrition_problems\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`nutrition_diagnoses_nutrition_problems_parent_id_idx\` ON \`nutrition_diagnoses_nutrition_problems\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE TABLE \`nutrition_diagnoses_pes_statements\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`problem\` text NOT NULL,
  	\`etiology\` text NOT NULL,
  	\`signs\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`nutrition_diagnoses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE INDEX \`nutrition_diagnoses_pes_statements_order_idx\` ON \`nutrition_diagnoses_pes_statements\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`nutrition_diagnoses_pes_statements_parent_id_idx\` ON \`nutrition_diagnoses_pes_statements\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE TABLE \`nutrition_diagnoses\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`patient_id\` integer NOT NULL,
  	\`assessment_id\` integer NOT NULL,
  	\`diagnosis_date\` text NOT NULL,
  	\`domain_notes_intake\` text,
  	\`domain_notes_clinical\` text,
  	\`domain_notes_behavioral\` text,
  	\`domain_notes_other\` text,
  	\`status\` text DEFAULT 'draft' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`patient_id\`) REFERENCES \`patients\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`assessment_id\`) REFERENCES \`nutrition_assessments\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await payload.db.drizzle.run(sql`CREATE INDEX \`nutrition_diagnoses_patient_idx\` ON \`nutrition_diagnoses\` (\`patient_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`nutrition_diagnoses_assessment_idx\` ON \`nutrition_diagnoses\` (\`assessment_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`nutrition_diagnoses_created_at_idx\` ON \`nutrition_diagnoses\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`patients_id\` integer,
  	\`nutrition_assessments_id\` integer,
  	\`nutrition_diagnoses_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`patients_id\`) REFERENCES \`patients\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`nutrition_assessments_id\`) REFERENCES \`nutrition_assessments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`nutrition_diagnoses_id\`) REFERENCES \`nutrition_diagnoses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_patients_id_idx\` ON \`payload_locked_documents_rels\` (\`patients_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_nutrition_assessments_id_idx\` ON \`payload_locked_documents_rels\` (\`nutrition_assessments_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_locked_documents_rels_nutrition_diagnoses_id_idx\` ON \`payload_locked_documents_rels\` (\`nutrition_diagnoses_id\`);`)
  await payload.db.drizzle.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await payload.db.drizzle.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.run(sql`DROP TABLE \`users\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`media\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`patients\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`nutrition_assessments\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`nutrition_assessments_rels\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`nutrition_diagnoses_nutrition_problems\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`nutrition_diagnoses_pes_statements\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`nutrition_diagnoses\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`payload_preferences\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`payload_migrations\`;`)
}
