import type { RequestEvent } from '@sveltejs/kit'
import type { inferAsyncReturnType } from '@trpc/server'

export async function createContext({ locals }: RequestEvent) {
  const { auth } = locals
  return { auth }
}

export type Context = inferAsyncReturnType<typeof createContext>
