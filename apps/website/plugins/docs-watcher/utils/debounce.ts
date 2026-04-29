export default function debounce<F extends (...args: any) => any>(delay: number, fn: F) {
  let id: number

  function inner(this: unknown, ...args: any[]) {
    clearTimeout(id)

    id = setTimeout(() => { fn.apply(this, args) }, delay) as any
  }

  return [inner as F, () => { clearTimeout(id) }] as const
}
