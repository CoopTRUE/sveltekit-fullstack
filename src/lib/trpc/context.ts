import { db } from '$lib/server/db'
import type { RequestEvent } from '@sveltejs/kit'
import type { inferAsyncReturnType } from '@trpc/server'

export async function createContext({ locals }: RequestEvent) {
  const { getSession } = locals
  return { getSession, db }
}

export type Context = inferAsyncReturnType<typeof createContext>
