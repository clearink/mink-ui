import path from 'node:path'
import slash from 'slash'

export function formatFilePath(relative: string, parent: string) {
  return slash(path.resolve(path.dirname(parent), relative))
}
