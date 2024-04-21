import type { Context } from './context'
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'

export const transformer = superjson
const t = initTRPC.context<Context>().create({
  transformer,
})

export const { router, middleware, createCallerFactory } = t
const auth = middleware(async ({ ctx, next }) => {
  const session = await ctx.auth()
  if (!session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({ ctx: { session, auth: null as never } })
})

export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(auth)
