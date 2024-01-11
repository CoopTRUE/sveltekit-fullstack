import { trpc } from '$lib/trpc/client'
import { error } from '@sveltejs/kit'

export async function load(event) {
  const { queryClient } = await event.parent()
  const { userId } = event.params

  await queryClient
    .fetchQuery({
      queryKey: ['user', userId],
      queryFn: () => trpc(event).user.get.query({ userId }),
    })
    .catch(() => error(404, 'User not found'))

  return { userId }
}
