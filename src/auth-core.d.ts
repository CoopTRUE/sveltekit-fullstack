import type { users } from '$lib/server/schema/schema'
import type { InferSelectModel } from 'drizzle-orm'

declare module '@auth/core/types' {
  interface Session {
    user: InferSelectModel<typeof users>
  }
}
