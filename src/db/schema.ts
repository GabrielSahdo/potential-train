import { text, sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
    id: text('id'),
    email: text('email'),
    salt: text('salt'),
    passwordHash: text('password_hash'),
})

export type UserDB = typeof users.$inferSelect;
