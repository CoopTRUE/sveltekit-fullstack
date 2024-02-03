import { timestamp, pgTable, text } from 'drizzle-orm/pg-core'

export * from './auth'

export const users = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { withTimezone: true }),
  body: text('body').notNull().default('test body'),
  image: text('image').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})
