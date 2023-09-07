import { greeting } from './routes/greeting'
import { t } from './t'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

export const router = t.router({
  greeting,
})

export type Router = typeof router

export type RouterInputs = inferRouterInputs<Router>
export type RouterOutputs = inferRouterOutputs<Router>
