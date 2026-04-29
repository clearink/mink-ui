import type { CustomRouteObject } from '@/_shared/types'

import { Route } from 'react-router-dom'
import { useMemo } from 'react'
import { isArray } from '@mink-ui/shared/is/is-array'

function renderRoutes(routes?: CustomRouteObject[], level = 0) {
  if (!isArray(routes)) return null

  return routes.map((route, order) => {
    const { index, path, children, element, component: H } = route

    const key = `${level}-${order}`

    const node = element ?? (H ? <H /> : null)

    return (
      <Route key={key} element={node} index={index} path={path}>
        {renderRoutes(children, level + 1)}
      </Route>
    )
  })
}

export default function useRenderRoutes(routes: CustomRouteObject[]) {
  return useMemo(() => renderRoutes(routes), [routes])
}
