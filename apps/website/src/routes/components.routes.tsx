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
      {
        path: 'alert',
        meta: {
          category: 'component',
          path: 'alert',
          title: 'Alert',
          subtitle: '警告提示',
          desc: '警告提示，展现需要关注的信息。',
          tags: 'tag',
          group: { title: '反馈', order: 5 },
        },
        component: lazyLoad(() => import('../../../../packages/core/src/alert/__docs__/zh-CN.md')),
      },
      {
        path: 'badge',
        meta: {
          category: 'component',
          path: 'badge',
          title: 'Badge',
          subtitle: '徽标',
          desc: '用于展示状态标记或数字。',
          group: { title: '数据展示', order: 3 },
        },
        component: lazyLoad(() => import('../../../../packages/core/src/badge/__docs__/zh-CN.md')),
      },
      {
        path: 'button',
        meta: {
          category: 'component',
          path: 'button',
          title: 'Button',
          subtitle: '按钮',
          desc: '按钮用于开始一个即时操作。',
          group: { title: '通用', order: 4 },
        },
        component: lazyLoad(() => import('../../../../packages/core/src/button/__docs__/zh-CN.md')),
      },
      {
        path: 'collapse',
        meta: {
          category: 'component',
          path: 'collapse',
          title: 'Collapse',
          subtitle: '折叠面板',
          desc: '折叠展示内容区域。',
          group: { title: '数据展示', order: 5 },
        },
        component: lazyLoad(() => import('../../../../packages/core/src/collapse/__docs__/zh-CN.md')),
      },
      {
        path: 'divider',
        meta: {
          category: 'component',
          path: 'divider',
          title: 'Divider',
          subtitle: '分割线',
          desc: '区隔内容的分割线。',
          tags: 'layout',
          group: { title: '布局', order: 1 },
        },
        component: lazyLoad(() => import('../../../../packages/core/src/divider/__docs__/zh-CN.md')),
      },
      {
        path: 'form',
        meta: {
          category: 'component',
          path: 'form',
          title: 'Form',
          subtitle: '表单',
          desc: '表单。',
          group: { title: '输入', order: 2 },
        },
        component: lazyLoad(() => import('../../../../packages/core/src/form/__docs__/zh-CN.md')),
      },
      {
        path: 'grid',
        meta: {
          category: 'component',
          path: 'grid',
          title: 'Grid',
          subtitle: '栅格',
          desc: '24 栅格系统。',
          group: { title: '布局', order: 1 },
        },
        component: lazyLoad(() => import('../../../../packages/core/src/grid/__docs__/zh-CN.md')),
      },
      {
        path: 'segmented',
        meta: {
          category: 'component',
          path: 'segmented',
          title: 'Segmented',
          subtitle: '分段控制器',
          desc: '用于在多个选项之间进行切换。',
          group: { title: '数据展示', order: 3 },
        },
        component: lazyLoad(() => import('../../../../packages/core/src/segmented/__docs__/zh-CN.md')),
      },
      {
        path: 'space',
        meta: {
          category: 'component',
          path: 'space',
          title: 'Space',
          subtitle: '间距',
          desc: '设置组件之前的间距。',
          group: { title: '布局', order: 1 },
        },
        component: lazyLoad(() => import('../../../../packages/core/src/space/__docs__/zh-CN.md')),
      },
      {
        path: 'tooltip',
        meta: {
          category: 'component',
          path: 'tooltip',
          title: 'Tooltip',
          subtitle: '文字提示',
          desc: '简单的文字提示气泡框。',
          group: { title: '数据展示', order: 5 },
        },
        component: lazyLoad(() => import('../../../../packages/core/src/tooltip/__docs__/zh-CN.md')),
      },
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
      {
        path: 'alert',
        meta: {
          category: 'component-en',
          path: 'alert',
          title: 'Alert',
          subtitle: '警告提示',
          desc: '警告提示，展现需要关注的信息。',
          tags: 'tag1',
          group: { title: '反馈', order: 5 },
        },
        component: lazyLoad(() => import('../../../../packages/core/src/alert/__docs__/en-US.md')),
      },
      {
        path: 'badge-en',
        meta: {
          category: 'component-en',
          path: 'badge-en',
          title: 'Badge',
          subtitle: 'Badge',
          desc: 'Used to display status markers or numbers.',
          group: { title: 'Data Display', order: 3 },
        },
        component: lazyLoad(() => import('../../../../packages/core/src/badge/__docs__/en-US.md')),
      },
      {
        path: 'button',
        meta: {
          category: 'component-en',
          path: 'button',
          title: 'Button',
          subtitle: '按钮',
          desc: '按钮用于开始一个即时操作。',
          group: { title: '通用', order: 0 },
        },
        component: lazyLoad(() => import('../../../../packages/core/src/button/__docs__/en-US.md')),
      },
      {
        path: 'collapse-en',
        meta: {
          category: 'component-en',
          path: 'collapse-en',
          title: 'Collapse',
          subtitle: 'Collapse',
          desc: 'A content area that can be collapsed and expanded.',
          group: { title: 'Data Display', order: 5 },
        },
        component: lazyLoad(() => import('../../../../packages/core/src/collapse/__docs__/en-US.md')),
      },
      {
        path: 'divider',
        meta: {
          category: 'component-en',
          path: 'divider',
          title: 'Divider',
          subtitle: '分割线',
          desc: '区隔内容的分割线。',
          tags: 'layout',
          group: { title: '布局', order: 1 },
        },
        component: lazyLoad(() => import('../../../../packages/core/src/divider/__docs__/en-US.md')),
      },
      {
        path: 'form',
        meta: {
          category: 'component-en',
          path: 'form',
          title: 'Form',
          subtitle: '表单',
          desc: '表单。',
          group: { title: '输入', order: 2 },
        },
        component: lazyLoad(() => import('../../../../packages/core/src/form/__docs__/en-US.md')),
      },
      {
        path: 'grid',
        meta: {
          category: 'component-en',
          path: 'grid',
          title: 'Grid',
          subtitle: '栅格',
          desc: '24 栅格系统。',
          group: { title: '布局', order: 1 },
        },
        component: lazyLoad(() => import('../../../../packages/core/src/grid/__docs__/en-US.md')),
      },
      {
        path: 'segmented-en',
        meta: {
          category: 'component-en',
          path: 'segmented-en',
          title: 'Segmented',
          subtitle: 'Segmented Control',
          desc: 'Used to switch between multiple options.',
          group: { title: 'Data Display', order: 3 },
        },
        component: lazyLoad(() => import('../../../../packages/core/src/segmented/__docs__/en-US.md')),
      },
      {
        path: 'space',
        meta: {
          category: 'component-en',
          path: 'space',
          title: 'Space',
          subtitle: '间距',
          desc: '设置组件之前的间距。',
          group: { title: '布局', order: 1 },
        },
        component: lazyLoad(() => import('../../../../packages/core/src/space/__docs__/en-US.md')),
      },
      {
        path: 'tooltip-en',
        meta: {
          category: 'component-en',
          path: 'tooltip-en',
          title: 'Tooltip',
          subtitle: 'Tooltip',
          desc: 'A simple text popup tooltip.',
          group: { title: 'Data Display', order: 5 },
        },
        component: lazyLoad(() => import('../../../../packages/core/src/tooltip/__docs__/en-US.md')),
      },
    ],
  },
]

export default routes
