import { page } from '$app/stores'
import { trpc } from './trpc/client'
import type { PageUser } from './types'
import {
  createQuery,
  type CreateQueryResult,
  type DefinedCreateQueryResult,
} from '@tanstack/svelte-query'
import { get } from 'svelte/store'

type GetQueryResult<TDefined, TData> = TDefined extends true
  ? DefinedCreateQueryResult<TData>
  : CreateQueryResult<TData>

export function createUserQuery<TDefined extends boolean = false>({ userId }: { userId: string }) {
  const query = createQuery({
    queryKey: ['user', userId],
    queryFn: () => trpc(get(page)).user.get.query({ userId }),
  })
  return query as GetQueryResult<TDefined, PageUser>
}
