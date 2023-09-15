import t from '../t'

const mockData = t.procedure.query(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return Array.from({ length: 10 }, () => crypto.randomUUID())
})

export default mockData
