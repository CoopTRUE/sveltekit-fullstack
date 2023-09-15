import type { Config } from 'drizzle-kit'

export default {
  schema: './src/lib/server/schema/schema.ts',
  out: './drizzle',
} satisfies Config
