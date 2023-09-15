import { trpc } from '$lib/trpc/client.js'

export async function load({ parent }) {
  const { queryClient } = await parent()
  await queryClient.prefetchQuery({
    queryKey: ['mockData'],
    queryFn: () => trpc().mockData.query(),
  })
}
