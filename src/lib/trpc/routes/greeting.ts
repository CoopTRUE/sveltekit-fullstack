import { logger } from '../middleware/logger'
import { t } from '../t'

export const greeting = t.procedure.use(logger).query(({ ctx }) => {
  const name = ctx.session?.user?.name
  const msg = name ? `Hello, ${name}!` : 'Hello!'
  return msg
})
