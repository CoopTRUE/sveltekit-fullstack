import { trpc } from '$lib/trpc/client.js'

export async function load(data) {
  const { queryClient } = await data.parent()
  queryClient.prefetchQuery({
    queryKey: ['mockData'],
    queryFn: () => trpc(data).mockData.query(),
  })
}
