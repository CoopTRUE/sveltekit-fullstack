import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export {
  postgresAccountsTable as accounts,
  postgresSessionsTable as sessions,
  postgresVerificationTokensTable as verificationTokens,
} from '@auth/drizzle-adapter'

export const users = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  emailVerified: timestamp('emailVerified', { withTimezone: true }),
  body: text('body').notNull().default('test body'),
  image: text('image').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})
export type UnsafeUser = InferSelectModel<typeof users>
export type User = Omit<UnsafeUser, 'email' | 'emailVerified'>
export type CreateUser = InferInsertModel<typeof users>
