import { handle as authHandle } from './auth'
import protectHandle from './protectHandle'
import trpcHandle from './trpcHandle'
import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

const PRELOAD_TYPES = ['js', 'css', 'font']

const preloadHandle = (({ event, resolve }) =>
  resolve(event, {
    preload: ({ type }) => PRELOAD_TYPES.includes(type),
  })) satisfies Handle

export const handle = sequence(preloadHandle, authHandle, trpcHandle, protectHandle)
