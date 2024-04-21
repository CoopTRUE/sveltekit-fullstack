import { protectedProcedure, router } from '../t'
import { TRPCError } from '@trpc/server'
import db from '$lib/server/db'
import { z } from 'zod'

export const userRouter = router({
  default: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      ctx.session.user
      const user = await db.query.users.findFirst({
        columns: { email: false, emailVerified: false },
        where: (user, { eq }) => eq(user.id, input.userId),
      })
      if (!user) throw new TRPCError({ code: 'NOT_FOUND' })
      return user
    }),
})
