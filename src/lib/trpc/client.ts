import type { Router } from './router'
import superjson from 'superjson'
import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit'

let browserClient: ReturnType<typeof createTRPCClient<Router>>

export function trpc(init?: TRPCClientInit) {
  const isBrowser = typeof window !== 'undefined'
  if (isBrowser && browserClient) return browserClient
  const client = createTRPCClient<Router>({ init, transformer: superjson })
  if (isBrowser) browserClient = client
  return client
}
