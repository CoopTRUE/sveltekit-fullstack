import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { SvelteKitAuth } from '@auth/sveltekit'
import Google from '@auth/sveltekit/providers/google'
import db from '$lib/server/db'
import * as schema from '$lib/server/db/schema'

function customTableFn(tableName: 'user' | 'account' | 'session', ..._: unknown[]) {
  // user -> users, account -> accounts, etc.
  const correctedTableName = `${tableName}s` as const
  const table = schema[correctedTableName]
  return table
}

export const { handle, signIn, signOut } = SvelteKitAuth({
  // @ts-expect-error - we need to pass a custom table function
  adapter: DrizzleAdapter(db, customTableFn),
  trustHost: true,
  providers: [Google],
  callbacks: { session: ({ session }) => session },
})
