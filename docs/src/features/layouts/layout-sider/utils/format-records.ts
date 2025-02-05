import type { CustomRouteMeta, CustomRouteObject } from '@shared/types'

import { isArray } from '@mink-ui/shared'

export default function formatRecords(
  routes: CustomRouteObject[] | undefined,
  parent = '/',
  map = new Map<string, CustomRouteMeta>(),
) {
  if (!isArray(routes)) return map

  return routes.reduce((result, route) => {
    const { path, children, index, meta } = route

    const full = [parent, index ? '' : path || '']
      .filter(Boolean)
      .join('/')
      .replace(/\/+/g, '/')

    if (children) formatRecords(children, full, result)
    else if (meta) result.set(full, meta)

    return result
  }, map)
}
