import type { UnsafeUser } from '$lib/types'
import '@auth/sveltekit'

declare module '@auth/sveltekit' {
  interface Session {
    // Unsafe because it includes email and emailVerified
    user: UnsafeUser
  }
}
