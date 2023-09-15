import { createContext } from '$lib/trpc/context'
import { appRouter } from '$lib/trpc/routers/_app'

export async function load(event) {
  const caller = appRouter.createCaller(await createContext(event))
  const msg = await caller.greeting()
  return { msg }
}
