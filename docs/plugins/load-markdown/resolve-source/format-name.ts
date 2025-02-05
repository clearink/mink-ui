import { constants } from '@mink-ui/scripts'
import path from 'node:path'

import md5 from '../utils/md5'

function capitalize<T extends string>(str: T) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}` as Capitalize<T>
}

export function formatExampleName(filePath: string) {
  return path
    .basename(filePath)
    .slice(0, -path.extname(filePath).length)
    .split(/[-_]/)
    .filter(Boolean)
    .reduce((result, str) => `${result}${capitalize(str)}`, '')
}

export function formatInfoName(filePath: string) {
  return `info${md5(filePath)}`
}

export function getComponentName(filePath: string) {
  const rootDir = constants.resolveCore('src')

  const re = new RegExp(`^${rootDir}/(.*?)/__docs__/.*?\.md$`)

  return (filePath.match(re)?.[1] || '').replace(/[-_]/g, '')
}

export function formatCssWrapName(filePath: string) {
  return `css${md5(filePath)}`
}
