declare module '@auth/core/types' {
  interface Session {
    user: import('drizzle-orm').InferSelectModel<typeof import('$lib/server/schema/schema').users>
  }
}
