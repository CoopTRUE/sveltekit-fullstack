import type { Context } from './context'
import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const middleware = t.middleware
export const router = t.router
export const publicProcedure = t.procedure
