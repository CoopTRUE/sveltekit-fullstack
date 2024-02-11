import { AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private'
import db from '$lib/server/db'
import * as schema from '$lib/server/db/schema'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { SvelteKitAuth } from '@auth/sveltekit'
import Google from '@auth/sveltekit/providers/google'
import type { PgTableFn } from 'drizzle-orm/pg-core'

function customTableFn(tableName: 'user' | 'account' | 'session', ..._: unknown[]) {
  // user -> users, account -> accounts, etc.
  const correctedTableName = `${tableName}s` as const
  const table = schema[correctedTableName]
  return table
}

export const { handle, signIn, signOut } = SvelteKitAuth({
  // @ts-expect-error - Overriding the default table function
  adapter: DrizzleAdapter(db, customTableFn as PgTableFn),
  trustHost: true,
  secret: AUTH_SECRET,
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: ({ session }) => session,
  },
})
