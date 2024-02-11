import type { Context } from './context'
import { TRPCError, initTRPC } from '@trpc/server'
import superjson from 'superjson'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const { router, middleware, createCallerFactory } = t
export const auth = middleware(async ({ ctx, next }) => {
  const session = await ctx.auth()
  if (!session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({ ctx: { session, auth: null as never } })
})

export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(auth)
