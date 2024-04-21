import { type Handle, redirect } from '@sveltejs/kit'

export default (async ({ event, resolve }) => {
  const route = event.route.id
  const isDev = route?.startsWith('/dev')
  const isApp = route?.startsWith('/(app)')
  const isProtected = route?.startsWith('/(app)/(protected)')

  if (isDev) return resolve(event)
  if (isApp && !isProtected) return resolve(event)

  console.log('Got session for checking auth in protectHandle')
  const session = await event.locals.auth()
  const user = session?.user

  function getClientIp() {
    return event.request.headers.get('cf-connecting-ip') || 'LOCALHOST'
  }
  if (!isProtected && user) {
    console.log(`${getClientIp()} ${route} failed because user`)
    redirect(302, '/explore')
  }
  if (isProtected && !user) {
    console.log(`${getClientIp()} ${route} failed because no user`)
    redirect(302, '/')
  }
  return resolve(event)
}) satisfies Handle
