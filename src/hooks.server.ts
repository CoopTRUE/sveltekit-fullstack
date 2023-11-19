import { AUTH_SECRET, GITHUB_ID, GITHUB_SECRET } from '$env/static/private'
import { db } from '$lib/server/db'
import { createContext } from '$lib/trpc/context'
import { appRouter } from '$lib/trpc/routers/_app'
import GitHub from '@auth/core/providers/github'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { SvelteKitAuth } from '@auth/sveltekit'
import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { createTRPCHandle } from 'trpc-sveltekit'

const PRELOAD_TYPES = ['js', 'css', 'font']

const preloadHandle = (({ event, resolve }) => {
  return resolve(event, {
    preload: ({ type }) => PRELOAD_TYPES.includes(type),
  })
}) satisfies Handle

const authHandle = SvelteKitAuth({
  // @ts-expect-error auth-core.d.ts too strict
  adapter: DrizzleAdapter(db),
  trustHost: true,
  secret: AUTH_SECRET,
  providers: [
    GitHub({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
  ],
  callbacks: {
    // @ts-expect-error auth-core.d.ts too strict
    session({ session, user }) {
      console.log({ ...session, user })
      return { ...session, user }
    },
  },
})

export const handle = sequence(
  preloadHandle,
  authHandle,
  createTRPCHandle({ router: appRouter, createContext })
)
