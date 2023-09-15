import { publicProcedure } from '../t'

export const mockData = publicProcedure.query(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return Array.from({ length: 10 }, () => crypto.randomUUID())
})
