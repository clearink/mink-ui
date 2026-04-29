import type { CustomRouteMeta, CustomRouteObject } from '@/_shared/types'

import { useMemo } from 'react'

import formatRecords from '../utils/format-records'

export default function useSiderMenus(routes: CustomRouteObject[], category?: string) {
  const records = useMemo(() => Array
    .from(formatRecords(routes))
    .map(([href, meta]) => ({ ...meta, href })), [routes])

  return useMemo(() => {
    const groups = records
      .filter(e => e.category === category)
      .reduce((result, item) => {
        const id = item.group?.title

        !result.has(id) && result.set(id, [])

        result.get(id)!.push(item)

        return result
      }, new Map<string | undefined, CustomRouteMeta[]>())

    return category === 'blog'
      ? Array
          .from(groups)
          .map(([group, meta]) => [
            group,
            meta.sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime()),
          ] as const)
      : Array
          .from(groups)
          .sort((a, b) => (a[1][0].group?.order || 0) - (b[1][0].group?.order || 0))
          .map(([group, meta]) => [
            group,
            meta.sort((a, b) => (a.title || '').localeCompare(b.title || '')),
          ] as const)
  }, [records, category])
}
