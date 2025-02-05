import { constants } from '@mink-ui/scripts'
import glob from 'fast-glob'
import matter from 'gray-matter'
import fs from 'node:fs'

import type { WatcherDataItem } from '../interface'

import formatRoutePath from './format-route-path'

export default function formatGroupItems(groups: string[]) {
  return groups.reduce((result, pattern) => {
    glob.sync(pattern).forEach((file) => {
      const filePath = constants.resolveCwd(file)

      const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })

      const { data: meta } = matter(fileContent)

      const routePath = formatRoutePath(meta.category, filePath)

      result.push({ meta, filePath, routePath })
    })

    return result
  }, [] as WatcherDataItem[])
}
