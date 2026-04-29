import type { CustomPluginOptions } from '../interface.ts'

import chokidar from 'chokidar'

import debounce from './debounce.ts'

export default function startupWatcher(
  groups: CustomPluginOptions['groups'],
  handler: () => Promise<void>,
) {
  if (!Object.keys(groups).length) return

  const [callback, cleanupTimeout] = debounce(200, handler)

  const watchers = Object.values(groups).map(({ input }) => {
    const watcher = chokidar
      .watch(input, { ignoreInitial: true })
      .on('ready', callback)
      .on('add', callback)
      .on('change', callback)
      .on('unlink', callback)

    return () => {
      cleanupTimeout()
      watcher.close()
    }
  })

  return () => { watchers.forEach((fn) => { fn() }) }
}
