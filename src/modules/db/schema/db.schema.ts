import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { v4 } from "uuid";

export const userRoles = {
    SUPER_USER: "super_user",
    ADMIN: "admin",
    USER: "user",
} as const;


export const roleSchema = pgEnum('role', Object.values(userRoles) as [string, ...string[]])

export const activationTokenSchema = pgTable('activation_token', {
    id: uuid('id').primaryKey().references(() => userSchema.id),
    token: varchar('token').notNull(),
})

export const userSchema = pgTable("user", {
    id: uuid("id").$defaultFn(() => v4()).primaryKey(),
    username: varchar("username").notNull(),
    email: varchar("email", { length: 254 }).notNull(),
    hash: varchar("hash").notNull(),
    firstName: varchar("first_name").notNull(),
    lastName: varchar("last_name").notNull(),
    role: roleSchema('role'),
    createdAt: timestamp("created_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
})

export type User = typeof userSchema.$inferSelect
export type UserRole = (typeof userRoles)[keyof typeof userRoles]