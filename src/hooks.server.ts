import { createContext } from '$lib/trpc/context'
import { appRouter } from '$lib/trpc/routers/_app'
import authHandle from './authHandle'
import protectHandle from './protectHandle'
import { type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { createTRPCHandle } from 'trpc-sveltekit'

const PRELOAD_TYPES = ['js', 'css', 'font']

const preloadHandle = (({ event, resolve }) =>
  resolve(event, {
    preload: ({ type }) => PRELOAD_TYPES.includes(type),
  })) satisfies Handle

export const handle = sequence(
  preloadHandle,
  authHandle,
  createTRPCHandle({ router: appRouter, createContext }),
  protectHandle
)
