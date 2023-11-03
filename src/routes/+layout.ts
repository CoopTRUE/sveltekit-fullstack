import { browser } from '$app/environment'
import { QueryClient } from '@tanstack/svelte-query'

export const load = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
        refetchOnMount: false,
        staleTime: Infinity,
      },
    },
  })

  return { queryClient }
}
