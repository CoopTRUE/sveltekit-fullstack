import type { Context } from './context'
import { initTRPC } from '@trpc/server'
import transformer from 'trpc-transformer'

const t = initTRPC.context<Context>().create({
  transformer,
})

export default t
