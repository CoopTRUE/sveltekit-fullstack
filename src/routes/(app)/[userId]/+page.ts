import { trpc } from '$lib/trpc/client'
import { error } from '@sveltejs/kit'

export async function load(event) {
  const { queryClient } = await event.parent()
  const { userId } = event.params

  const client = trpc(event, queryClient)
  const user = await client.user.get.createServerQuery({ userId }, { ssr: true })

  return { user, userId }
}
