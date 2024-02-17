import { trpc } from '$lib/trpc/client'
import { prefetchApi } from '$lib/utils.js'

export async function load(event) {
  const { queryClient } = await event.parent()
  const { userId } = event.params
  const api = trpc(event, queryClient).createUtils()

  // Wrap () => ... because prefetchApi only accepts functions, not promises
  prefetchApi(() => api.user.default.prefetch({ userId }))

  return { userId }
}
