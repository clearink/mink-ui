import type { DataItem } from '../interface.ts'

export function renderBlogSource(items: DataItem[]) {
  return `
import type { CustomRouteObject } from '@/_shared/types'

import { Outlet } from 'react-router-dom'

import lazyLoad from '@/libs/lazy-load'

const routes: CustomRouteObject[] = [
  {
    path: 'blog',
    element: <Outlet />,
    children: [
      ${items
        .sort((a, b) => `${a.path}`.localeCompare(`${b.path}`))
        .map((item, index, list) => {
          return `{
            ${index === list.length - 1 ? 'index: true' : `path: ${JSON.stringify(item.meta.path)}`},
            meta: ${JSON.stringify(item.meta)},
            component: lazyLoad(() => import(${JSON.stringify(item.path)})),
          }`
        })
        .join(',\n')}
    ]
  }
]

export default routes
`
}

export function renderComponentSource(items: DataItem[]) {
  return `
import type { CustomRouteObject } from '@/_shared/types'

import { Outlet } from 'react-router-dom'

import lazyLoad from '@/libs/lazy-load'

const routes: CustomRouteObject[] = [
  {
    path: 'component',
    element: <Outlet />,
    children: [
      {
        index: true,
        component: lazyLoad(() => import('@/pages/overview/page')),
        meta: { category: 'component', title: '组件总览' },
      },
      ${items
        .filter(item => item.meta.category === 'component')
        .sort((a, b) => `${a.path}`.localeCompare(`${b.path}`))
        .map((item) => {
          return `{
            path: ${JSON.stringify(item.meta.path)},
            meta: ${JSON.stringify(item.meta)},
            component: lazyLoad(() => import(${JSON.stringify(item.path)})),
          }`
        })
        .join(',\n')}
    ],
},
  {
    path: 'component-en',
    element: <Outlet />,
    children: [
      {
        index: true,
        component: lazyLoad(() => import('@/pages/overview/page')),
        meta: { category: 'component-en', title: '组件总览' },
      },
      ${items
        .filter(item => item.meta.category === 'component-en')
        .sort((a, b) => `${a.path}`.localeCompare(`${b.path}`))
        .map((item) => {
          return `{
            path: ${JSON.stringify(item.meta.path)},
            meta: ${JSON.stringify(item.meta)},
            component: lazyLoad(() => import(${JSON.stringify(item.path)})),
          }`
        })
        .join(',\n')}
    ],
  }
]

export default routes
`
}
