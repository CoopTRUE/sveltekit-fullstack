import greeting from './routes/greeting'
import t from './t'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

const router = t.router({
  greeting,
})

export default router

export type Router = typeof router

export type RouterInputs = inferRouterInputs<Router>
export type RouterOutputs = inferRouterOutputs<Router>
