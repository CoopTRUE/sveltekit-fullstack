import * as schema from './schema'
import { DATABASE_URL } from '$env/static/private'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const queryClient = postgres(DATABASE_URL)
const db = drizzle(queryClient, { schema })

export default db
