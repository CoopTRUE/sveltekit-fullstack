import type { users as usersSchema } from './server/db/schema'
import type { RouterOutputs } from './trpc/routers/_app'
import type { InferSelectModel } from 'drizzle-orm'

export type UnsafeUser = InferSelectModel<typeof usersSchema>
// export type User = Omit<UnsafeUser, 'email' | 'emailVerified'>
export type PageUser = RouterOutputs['user']['get']
