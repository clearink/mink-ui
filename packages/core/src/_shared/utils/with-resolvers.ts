export function withResolvers<T>() {
  let resolve: (value: T | PromiseLike<T>) => void,
    reject: (reason?: any) => void

  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  return {
    promise,
    resolve: resolve!,
    reject: reject!,
  }
}
