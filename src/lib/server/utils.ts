// We have a different utils.ts file because we import database related functions from drizzle-orm and we don't want to import those in the client side
import { pick } from '$lib/utils'
import { getTableColumns } from 'drizzle-orm'
import type { AnyPgTable } from 'drizzle-orm/pg-core'

type InferColumnNames<T extends AnyPgTable> = keyof T['_']['columns']

/**
 * Fully type-safe way to pick columns from a schema (plus rename-symbol support in IDEs)
 *
 * @example
 *
 * ```ts
 * .select({
 *  ...pickSchema(userSchema, { id: true, email: true })
 * })
 * ```
 */
export function pickSchema<T extends AnyPgTable>(
  schema: T,
  include: { [P in InferColumnNames<T>]?: true }
) {
  return pick(getTableColumns(schema), ...(Object.keys(include) as InferColumnNames<T>[]))
}
