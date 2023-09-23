import type { Context } from './context'
import { TRPCError, initTRPC } from '@trpc/server'
import superjson from 'superjson'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const { middleware } = t
export const auth = middleware(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    })
  }
  return next()
})

export const { router } = t
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(auth)
