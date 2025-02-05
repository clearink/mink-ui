import { isUndefined } from '@mink-ui/shared'
import path from 'node:path'
import slash from 'slash'

function moduleMatches(pattern: RegExp | string, value: string) {
  if (pattern instanceof RegExp) return pattern.test(value)

  if (pattern.length > value.length) return false

  return pattern === value || value.startsWith(`${pattern}/`)
}

export interface ResolveAliasOptions {
  filePath: string
  specifier: string | undefined
  alias: { find: RegExp | string, replacement: string }[]
  externals: (RegExp | string)[]
}

export function resolveAlias(options: ResolveAliasOptions) {
  const { externals, specifier, alias, filePath } = options

  const matched = !isUndefined(specifier)
    && externals.every(e => !moduleMatches(e, specifier))
    && alias.find(e => moduleMatches(e.find, specifier))

  if (!matched) return

  const { find, replacement } = matched

  let text = slash(path.relative(path.dirname(filePath), replacement))

  if (!text.startsWith('.')) text = `./${text}`

  const re = find instanceof RegExp ? find : new RegExp(`^${find}`)

  return slash(specifier.replace(re, text))
}
