import type { CustomRouteObject } from '@/_shared/types'

import { Outlet } from 'react-router-dom'

import lazyLoad from '@/libs/lazy-load'

const routes: CustomRouteObject[] = [
  {
    path: 'blog',
    element: <Outlet />,
    children: [
      {
        path: '2025-10-16',
        meta: { category: 'blog', path: '2025-10-16', title: 'docs-loader 原理及实现', date: '2025-10-16' },
        component: lazyLoad(() => import('../pages/__blogs__/2025-10-16.md')),
      },
      {
        index: true,
        meta: { category: 'blog', path: '2025-10-17', title: '测试title', date: '2025-10-17' },
        component: lazyLoad(() => import('../pages/__blogs__/2025-10-17.md')),
      },
    ],
  },
]

export default routes
