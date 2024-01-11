import type { UnsafeUser } from '$lib/types'

declare module '@auth/core/types' {
  interface Session {
    // Unsafe because it includes email and emailVerified
    user: UnsafeUser
  }
}
