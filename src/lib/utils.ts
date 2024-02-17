import { browser } from '$app/environment'
import { type ClassValue, clsx } from 'clsx'
import { cubicOut } from 'svelte/easing'
import type { TransitionConfig } from 'svelte/transition'
import { twMerge } from 'tailwind-merge'

/**
 * Run prefetch functions only when needed
 */
export function prefetchApi(...prefetchFunctions: (() => Promise<unknown>)[]) {
  if (!browser) return
  prefetchFunctions.map((fn) => fn())
}

/**
 * **YOU MUST AWAIT THIS FUNCTION**
 *
 * Run and await prefetch functions only when needed.
 *
 * This is different from `prefetchApi` as it will wait for all the prefetch functions to settle before continuing.
 *
 * Use this when you want to SSR the fetched data (No loading state)
 */
export async function prerenderApi(...prefetchFunctions: (() => Promise<unknown>)[]) {
  const promises = prefetchFunctions.map((fn) => fn())
  await Promise.allSettled(promises)
}

// https://stackoverflow.com/questions/53966509/typescript-type-safe-omit-function
export const omit = <T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> => {
  const cloned = { ...obj }
  for (const key of keys) {
    delete cloned[key]
  }
  return cloned
}

// https://stackoverflow.com/a/60227013
export function pick<T extends object, K extends keyof T>(base: T, ...keys: K[]): Pick<T, K> {
  const entries = keys.map((key) => [key, base[key]])
  return Object.fromEntries(entries)
}

export function preloadImage(url: string) {
  return new Promise<void>((resolve) => {
    if (!browser) resolve()
    const img = new Image()
    img.src = url
    img.onload = () => resolve()
  })
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type FlyAndScaleParams = {
  y?: number
  x?: number
  start?: number
  duration?: number
}

export const flyAndScale = (
  node: Element,
  params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
  const style = getComputedStyle(node)
  const transform = style.transform === 'none' ? '' : style.transform

  const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
    const [minA, maxA] = scaleA
    const [minB, maxB] = scaleB

    const percentage = (valueA - minA) / (maxA - minA)
    const valueB = percentage * (maxB - minB) + minB

    return valueB
  }

  const styleToString = (style: Record<string, number | string | undefined>): string => {
    return Object.keys(style).reduce((str, key) => {
      if (style[key] === undefined) return str
      return str + `${key}:${style[key]};`
    }, '')
  }

  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0])
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0])
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1])

      return styleToString({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t,
      })
    },
    easing: cubicOut,
  }
}
