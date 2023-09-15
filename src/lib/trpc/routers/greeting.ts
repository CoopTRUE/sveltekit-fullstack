import { logger } from '../middleware'
import { publicProcedure } from '../t'

export const greeting = publicProcedure.use(logger).query(({ ctx }) => {
  const name = ctx.session?.user?.name
  const msg = name ? `Hello, ${name}!` : 'Hello!'
  return msg
})
