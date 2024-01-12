import dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'

dotenv.config()

export default defineConfig({
  schema: './src/lib/server/db/schema.ts',
  driver: 'pg',
  out: './drizzle',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
})
