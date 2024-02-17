import { createTRPCClient, type TRPCClientInit } from './createClient'
import type { Router } from './routers/_app'
import type { QueryClient } from '@tanstack/svelte-query'
import transformer from 'superjson'
import { svelteQueryWrapper } from 'trpc-svelte-query-adapter'

let browserClient: ReturnType<typeof svelteQueryWrapper<Router>>

export function trpc(init?: TRPCClientInit, queryClient?: QueryClient) {
  const isBrowser = typeof window !== 'undefined'
  if (isBrowser && browserClient) return browserClient
  const client = svelteQueryWrapper<Router>({
    client: createTRPCClient<Router>({ init, transformer }),
    queryClient,
  })
  if (isBrowser) browserClient = client
  return client
}
