import { AUTH_SECRET, GITHUB_ID, GITHUB_SECRET } from '$env/static/private'
import GitHub from '@auth/core/providers/github'
import { SvelteKitAuth } from '@auth/sveltekit'
import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

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

export const handle = sequence(preloadHandle, authHandle)
