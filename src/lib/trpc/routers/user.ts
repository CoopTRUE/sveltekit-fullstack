import db from '$lib/server/db'
import { publicProcedure, router } from '../t'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const userRouter = router({
  get: publicProcedure.input(z.object({ userId: z.string() })).query(async ({ input }) => {
    const user = await db.query.users.findFirst({
      columns: { email: false, emailVerified: false },
      where: (user, { eq }) => eq(user.id, input.userId),
    })
    if (!user) throw new TRPCError({ code: 'NOT_FOUND' })
    return user
  }),
})
