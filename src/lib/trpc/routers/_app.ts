import { router } from '../t'
import { greeting } from './greeting'
import { mockData } from './mockData'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

export const appRouter = router({
  greeting,
  mockData,
})

export type Router = typeof appRouter

export type RouterInputs = inferRouterInputs<Router>
export type RouterOutputs = inferRouterOutputs<Router>
