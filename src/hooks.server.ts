const PRELOAD_TYPES = ['js', 'css', 'font']

export function handle({ event, resolve }) {
  return resolve(event, {
    preload: ({ type }) => PRELOAD_TYPES.includes(type),
  })
}
