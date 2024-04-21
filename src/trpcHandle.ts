// onError inspired by t3 onError
// https://github.com/t3-oss/create-t3-app/blob/main/cli/template/extras/src/app/api/trpc/%5Btrpc%5D/route.ts
import type { TRPCError } from '@trpc/server'
import { dev } from '$app/environment'
import { createContext } from '$lib/trpc/context'
import { appRouter } from '$lib/trpc/routers/_app'
import { createTRPCHandle } from 'trpc-sveltekit'

function handleError({ path, error }: { path: string; error: TRPCError }) {
  console.error(`❌ tRPC failed on ${path}: ${error.message}`)
}

export default createTRPCHandle({
  router: appRouter,
  createContext,
  onError: dev ? handleError : undefined,
})
