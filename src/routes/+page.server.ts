import { createContext } from '$lib/trpc/context'
import { router } from '$lib/trpc/router'

export async function load(event) {
  const caller = router.createCaller(await createContext(event))
  const msg = await caller.greeting()
  return { msg }
}
