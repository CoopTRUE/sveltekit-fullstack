import type { AdapterAccount } from '@auth/core/adapters'
import { timestamp, pgTable, text, primaryKey, integer } from 'drizzle-orm/pg-core'

export * from './auth'

export const users = pgTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
})
