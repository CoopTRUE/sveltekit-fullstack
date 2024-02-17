// We have a different utils.ts file because we import database related functions from drizzle-orm and we don't want to import those in the client side
import { pick } from '$lib/utils'
import { getTableColumns } from 'drizzle-orm'
import type { AnyPgTable } from 'drizzle-orm/pg-core'

/**
 * Used in .select({...pickSchema(schema, 'column1', 'column2', ...)})
 */
export function pickSchema<T extends AnyPgTable>(schema: T, ...keys: (keyof T['_']['columns'])[]) {
  return pick(getTableColumns(schema), ...keys)
}
