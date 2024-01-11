import { router } from '../t'
import { userRouter } from './user'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

export const appRouter = router({
  user: userRouter,
})

export type Router = typeof appRouter

export type RouterInputs = inferRouterInputs<Router>
export type RouterOutputs = inferRouterOutputs<Router>
