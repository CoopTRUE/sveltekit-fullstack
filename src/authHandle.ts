import { AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private'
import db from '$lib/server/db'
import * as schema from '$lib/server/db/schema'
import Google from '@auth/core/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { SvelteKitAuth } from '@auth/sveltekit'
import type { PgTableFn } from 'drizzle-orm/pg-core'

const map = {
  ...schema,
  verification_token: schema.verificationTokens,
}
const tableFn = <T extends keyof typeof map>(name: T, ..._: unknown[]) => {
  return map[name]
}

export default SvelteKitAuth({
  adapter: DrizzleAdapter(db, tableFn as PgTableFn),
  trustHost: true,
  secret: AUTH_SECRET,
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
})
