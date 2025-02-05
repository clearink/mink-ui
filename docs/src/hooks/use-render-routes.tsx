import type { CustomRouteObject } from '@shared/types'

import { coalesce, isArray } from '@mink-ui/shared'
import { useMemo } from 'react'
import { Route } from 'react-router-dom'

function render(routes?: CustomRouteObject[], level = 0) {
  if (!isArray(routes)) return null

  return routes.map((route, order) => {
    const { index, path, children, element, component: H } = route

    const key = `${level}-${order}`

    const node = coalesce(element, H ? <H /> : null)

    return (
      <Route key={key} index={index} path={path} element={node}>
        {render(children, level + 1)}
      </Route>
    )
  })
}

export default function useRenderRoutes(routes: CustomRouteObject[]) {
  return useMemo(() => render(routes), [routes])
}
