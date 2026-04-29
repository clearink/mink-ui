import type { CustomRouteObject } from '@/_shared/types'

import { CommonLayout } from '@/features/layouts'
import lazyLoad from '@/libs/lazy-load'
import NotFound from '@/pages/404'
import HomeLayout from '@/pages/home/layout'
import blogRoutes from './blogs.routes'
import componentsRoutes from './components.routes'

const routes: CustomRouteObject[] = [
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        component: lazyLoad(() => import('@/pages/home/page')),
      },
      {
        element: <CommonLayout />,
        children: [
          ...componentsRoutes,
          ...blogRoutes,
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

export default routes
