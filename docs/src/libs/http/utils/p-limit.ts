export default function pLimit(limit: number) {
  const _queue: (() => Promise<void>)[] = []

  let _count: number = 0

  const _run = () => {
    if (_count < limit && _queue.length) {
      _queue.shift()?.()
    }
  }

  const execute = async <T>(fn: (...args: any[]) => Promise<T>, args: any[], resolve) => {
    _count++

    const promise = Promise.resolve(fn(...args))

    resolve(promise)

    try { await promise }
    catch { }

    _count--

    _run()
  }

  return function <T>(fn: (...args: any[]) => Promise<T>, ...args: any[]): Promise<T> {
    return new Promise((resolve) => {
      _queue.push(execute.bind(null, fn, args, resolve))

      // 需要自动获取第一个任务去执行
      Promise.resolve().then(_run)
    })
  }
}
