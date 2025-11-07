import { sql } from "drizzle-orm";
import { pgTable, text, varchar, doublePrecision, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const accessPoints = pgTable("access_points", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  status: text("status").notNull().default("offline"),
  uptime: text("uptime").default("0%"),
  connectedUsers: integer("connected_users").default(0),
  signalStrength: integer("signal_strength").default(0),
  bandwidth: text("bandwidth").default("0 MB/s"),
  firmwareVersion: text("firmware_version").default("v1.0.0"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const customers = pgTable("customers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  plan: text("plan").notNull(),
  status: text("status").notNull().default("active"),
  connectedApId: varchar("connected_ap_id").references(() => accessPoints.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAccessPointSchema = createInsertSchema(accessPoints).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCustomerSchema = createInsertSchema(customers).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type AccessPoint = typeof accessPoints.$inferSelect;
export type InsertAccessPoint = z.infer<typeof insertAccessPointSchema>;
export type Customer = typeof customers.$inferSelect;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
