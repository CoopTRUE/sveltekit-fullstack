import type { UnsafeUser } from '$lib/server/db/schema'
import type { AdapterSession } from '@auth/core/adapters'
import '@auth/sveltekit'

declare module '@auth/sveltekit' {
  interface Session extends AdapterSession {
    // Unsafe because it includes email and emailVerified
    user: UnsafeUser
  }
}
