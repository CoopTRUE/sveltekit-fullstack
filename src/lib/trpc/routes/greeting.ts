import { logger } from '../middleware'
import t from '../t'

const greeting = t.procedure.use(logger).query(({ ctx }) => {
  const name = ctx.session?.user?.name
  const msg = name ? `Hello, ${name}!` : 'Hello!'
  return msg
})

export default greeting
