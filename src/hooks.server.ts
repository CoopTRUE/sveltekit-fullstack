import { AUTH_SECRET, GITHUB_ID, GITHUB_SECRET } from '$env/static/private'
import { createContext } from '$lib/trpc/context'
import router from '$lib/trpc/router'
import GitHub from '@auth/core/providers/github'
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
  trustHost: true,
  secret: AUTH_SECRET,
  providers: [
    GitHub({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
  ],
})

export const handle = sequence(
  preloadHandle,
  authHandle,
  createTRPCHandle({ router, createContext })
)
