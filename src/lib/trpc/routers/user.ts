import { publicProcedure, router } from '../t'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const userRouter = router({
  get: publicProcedure.input(z.object({ userId: z.string() })).query(async ({ ctx, input }) => {
    const user = await ctx.db.query.users.findFirst({
      columns: { email: false, emailVerified: false },
      where: (user, { eq }) => eq(user.id, input.userId),
    })
    if (!user) throw new TRPCError({ code: 'NOT_FOUND' })
    return user
  }),
})
