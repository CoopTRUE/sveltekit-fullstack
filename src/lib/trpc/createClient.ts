// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// ripped from https://github.com/icflorescu/trpc-sveltekit/blob/main/package/src/server.ts
// modified to log client requests in development
import {
  createTRPCProxyClient,
  httpBatchLink,
  type HTTPHeaders,
  loggerLink,
  type TRPCLink,
} from '@trpc/client'
import type { AnyRouter } from '@trpc/server'
import { browser, dev } from '$app/environment'

export type TRPCClientInit = { fetch?: typeof window.fetch; url: { origin: string } }

type CreateTRPCClientOptions<Router extends AnyRouter> = (
  | {
      links?: never

      /**
       * The tRPC api endpoint URL.
       * @default '/trpc'
       */
      url?: `/${string}`

      /**
       * A page store or SvelteKit load event.
       * @see https://kit.svelte.dev/docs/modules#$app-stores
       * @see https://kit.svelte.dev/docs/load
       */
      init?: TRPCClientInit

      /**
       * Additional headers to send with the request. Can be a function that returns headers.
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Headers
       */
      headers?: HTTPHeaders | (() => HTTPHeaders | Promise<HTTPHeaders>)
    }
  | {
      /**
       * A custom list of links to use for the tRPC Client instead of the default one.
       * @see https://trpc.io/docs/links
       */
      links: TRPCLink<Router>[]

      url?: never
      init?: never
      headers?: never
    }
) & {
  /**
   * A function that transforms the data before transferring it.
   * @see https://trpc.io/docs/data-transformers
   */
  transformer?: Router['_def']['_config']['transformer']
}

/**
 * Create a tRPC client.
 * @see https://trpc.io/docs/vanilla
 */
export function createTRPCClient<Router extends AnyRouter>(
  { links, url = '/trpc', transformer, init, headers }: CreateTRPCClientOptions<Router> = {
    url: '/trpc',
  }
) {
  if (links) return createTRPCProxyClient<Router>({ transformer, links })

  if (typeof window === 'undefined' && !init) {
    throw new Error(
      'Calling createTRPCClient() on the server requires passing a valid LoadEvent argument'
    )
  }

  return createTRPCProxyClient<Router>({
    transformer,
    links: [
      loggerLink({
        enabled: () => dev && browser,
      }),
      httpBatchLink({
        url:
          typeof window === 'undefined' ? `${init.url.origin}${url}` : `${location.origin}${url}`,
        fetch: typeof window === 'undefined' ? init.fetch : init?.fetch ?? window.fetch,
        headers,
      }),
    ],
  })
}
