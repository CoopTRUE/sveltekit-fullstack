import type { AdapterAccount } from '@auth/core/adapters'
import type { InferSelectModel } from 'drizzle-orm'
import { timestamp, pgTable, text, primaryKey, integer } from 'drizzle-orm/pg-core'

export * from './auth'

export const users = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow().notNull(),
})
