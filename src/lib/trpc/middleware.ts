import { middleware } from './t'
import { TRPCError } from '@trpc/server'

export const logger = middleware(async ({ path, type, next }) => {
  const start = Date.now()
  const result = await next()
  const ms = Date.now() - start
  console.log(`${result.ok ? 'OK' : 'ERR'} ${type} ${path} - ${ms}ms`)
  return result
})

export const auth = middleware(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    })
  }
  return next()
})
