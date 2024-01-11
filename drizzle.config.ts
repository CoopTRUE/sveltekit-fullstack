import dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'

dotenv.config()

export default {
  schema: './src/lib/server/db/schema.ts',
  driver: 'pg',
  out: './drizzle',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config
