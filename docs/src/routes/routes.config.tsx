/* This file is automatically generated, please do not manually modify it */
import type { CustomRouteObject } from '@shared/types'

import { CommonLayout } from '@features/layouts'
import lazyLoad from '@libs/lazy-load'
import NotFound from '@pages/404'
import HomeLayout from '@pages/home/layout'
import { Outlet } from 'react-router-dom'

const routes: CustomRouteObject[] = [
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        component: lazyLoad(() => import('@pages/home/page')),
      },
      {
        element: <CommonLayout />,
        children: [
          {
            path: 'component',
            element: <Outlet />,
            children: [
              {
                index: true,
                component: lazyLoad(() => import('@pages/components/overview/page')),
                meta: { category: 'component', title: '组件总览' },
              },
              {
                path: 'alert',
                meta: {
                  category: 'component',
                  title: 'Alert',
                  subtitle: '警告提示',
                  desc: '警告提示，展现需要关注的信息。',
                  tags: 'tag',
                  group: { title: '反馈', order: 5 },
                },
                component: lazyLoad(() => import('@mink-ui/core/alert/__docs__/index.zh-CN.md')),
              },
              {
                path: 'badge',
                meta: {
                  category: 'component',
                  title: 'Badge',
                  subtitle: '徽标数',
                  desc: '图标右上角的圆形徽标数字。',
                  group: { title: '反馈', order: 5 },
                },
                component: lazyLoad(() => import('@mink-ui/core/badge/__docs__/index.zh-CN.md')),
              },
              {
                path: 'button',
                meta: {
                  category: 'component',
                  title: 'Button',
                  subtitle: '按钮',
                  desc: '按钮是一种命令组件，可发起一个即时操作。',
                  group: { title: '基础', order: 0 },
                },
                component: lazyLoad(() => import('@mink-ui/core/button/__docs__/index.zh-CN.md')),
              },
              {
                path: 'checkbox',
                meta: {
                  category: 'component',
                  title: 'CheckBox',
                  subtitle: '复选框',
                  desc: 'CheckBox 按钮组 desc',
                  group: { title: '数据录入', order: 3 },
                },
                component: lazyLoad(() => import('@mink-ui/core/checkbox/__docs__/index.zh-CN.md')),
              },
              {
                path: 'collapse',
                meta: {
                  category: 'component',
                  title: 'Collapse',
                  subtitle: '折叠面板',
                  desc: '可以折叠/展开的内容区域。',
                  group: { title: '数据展示', order: 4 },
                },
                component: lazyLoad(() => import('@mink-ui/core/collapse/__docs__/index.zh-CN.md')),
              },
              {
                path: 'divider',
                meta: {
                  category: 'component',
                  title: 'Divider',
                  subtitle: '分割线',
                  desc: '区隔内容的分割线。',
                  tags: 'layout',
                  group: { title: '布局', order: 1 },
                },
                component: lazyLoad(() => import('@mink-ui/core/divider/__docs__/index.zh-CN.md')),
              },
              {
                path: 'form',
                meta: {
                  category: 'component',
                  title: 'Form',
                  subtitle: '表单',
                  desc: 'Form 表单 desc',
                  group: { title: '数据录入', order: 3 },
                },
                component: lazyLoad(() => import('@mink-ui/core/form/__docs__/index.zh-CN.md')),
              },
              {
                path: 'grid',
                meta: {
                  category: 'component',
                  title: 'Grid',
                  subtitle: '栅格',
                  desc: '24 栅格系统。',
                  group: { title: '布局', order: 1 },
                },
                component: lazyLoad(() => import('@mink-ui/core/grid/__docs__/index.zh-CN.md')),
              },
              {
                path: 'modal',
                meta: {
                  category: 'component',
                  title: 'Modal',
                  subtitle: '对话框',
                  desc: '展示一个对话框，提供标题、内容区、操作区。',
                  group: { title: '反馈', order: 5 },
                },
                component: lazyLoad(() => import('@mink-ui/core/modal/__docs__/index.zh-CN.md')),
              },
              {
                path: 'notification',
                meta: {
                  category: 'component',
                  title: 'Notification',
                  subtitle: '通知提醒框',
                  desc: '全局展示通知提醒信息。',
                  tags: 'test',
                  group: { title: '反馈', order: 5 },
                },
                component: lazyLoad(() => import('@mink-ui/core/notification/__docs__/index.zh-CN.md')),
              },
              {
                path: 'segmented',
                meta: {
                  category: 'component',
                  title: 'Segmented',
                  subtitle: '分段控制器',
                  desc: '用于展示多个选项并允许用户选择其中单个选项。',
                  group: { title: '数据展示', order: 5 },
                },
                component: lazyLoad(() => import('@mink-ui/core/segmented/__docs__/index.zh-CN.md')),
              },
              {
                path: 'tooltip',
                meta: {
                  category: 'component',
                  title: 'Tooltip',
                  subtitle: '文字提示',
                  desc: '简单的文字提示气泡框。',
                  group: { title: '数据展示', order: 5 },
                },
                component: lazyLoad(() => import('@mink-ui/core/tooltip/__docs__/index.zh-CN.md')),
              },
            ],
          },
          {
            path: 'component-en',
            element: <Outlet />,
            children: [
              {
                path: 'alert',
                meta: {
                  category: 'component-en',
                  title: 'Alert',
                  desc: '警告提示，展现需要关注的信息。',
                  group: { title: '反馈', order: 5 },
                },
                component: lazyLoad(() => import('@mink-ui/core/alert/__docs__/index.en-US.md')),
              },
              {
                path: 'badge',
                meta: {
                  category: 'component-en',
                  title: 'Badge',
                  desc: '图标右上角的圆形徽标数字。en',
                  group: { title: 'Feedback', order: 1 },
                },
                component: lazyLoad(() => import('@mink-ui/core/badge/__docs__/index.en-US.md')),
              },
              {
                path: 'button',
                meta: {
                  category: 'component-en',
                  title: 'Button',
                  desc: '按钮是一种命令组件，可发起一个即时操作。',
                  group: { title: 'Basic', order: 0 },
                },
                component: lazyLoad(() => import('@mink-ui/core/button/__docs__/index.en-US.md')),
              },
              {
                path: 'checkbox',
                meta: {
                  category: 'component-en',
                  title: 'CheckBox',
                  desc: 'CheckBox 按钮组 desc',
                  group: { title: '数据录入', order: 3 },
                },
                component: lazyLoad(() => import('@mink-ui/core/checkbox/__docs__/index.en-US.md')),
              },
              {
                path: 'collapse',
                meta: {
                  category: 'component-en',
                  title: 'Collapse',
                  desc: '可以折叠/展开的内容区域。',
                  group: { title: '数据展示', order: 4 },
                },
                component: lazyLoad(() => import('@mink-ui/core/collapse/__docs__/index.en-US.md')),
              },
              {
                path: 'divider',
                meta: {
                  category: 'component-en',
                  title: 'Divider',
                  desc: '区隔内容的分割线。',
                  tags: 'layout',
                  group: { title: '布局', order: 1 },
                },
                component: lazyLoad(() => import('@mink-ui/core/divider/__docs__/index.en-US.md')),
              },
              {
                path: 'form',
                meta: {
                  category: 'component-en',
                  title: 'Form',
                  desc: 'Form 表单 desc',
                  group: { title: '数据录入', order: 3 },
                },
                component: lazyLoad(() => import('@mink-ui/core/form/__docs__/index.en-US.md')),
              },
              {
                path: 'grid',
                meta: {
                  category: 'component-en',
                  title: 'Grid',
                  desc: '24 栅格系统。',
                  group: { title: '布局', order: 1 },
                },
                component: lazyLoad(() => import('@mink-ui/core/grid/__docs__/index.en-US.md')),
              },
              {
                path: 'modal',
                meta: {
                  category: 'component-en',
                  title: 'Modal',
                  desc: '展示一个对话框，提供标题、内容区、操作区。',
                  group: { title: '反馈', order: 5 },
                },
                component: lazyLoad(() => import('@mink-ui/core/modal/__docs__/index.en-US.md')),
              },
              {
                path: 'notification',
                meta: {
                  category: 'component-en',
                  title: 'Notification',
                  subtitle: '通知提醒框',
                  desc: '全局展示通知提醒信息。',
                  group: { title: '反馈', order: 5 },
                },
                component: lazyLoad(() => import('@mink-ui/core/notification/__docs__/index.en-US.md')),
              },
              {
                path: 'segmented',
                meta: {
                  category: 'component-en',
                  title: 'Segmented',
                  desc: '用于展示多个选项并允许用户选择其中单个选项。',
                  group: { title: '数据展示', order: 5 },
                },
                component: lazyLoad(() => import('@mink-ui/core/segmented/__docs__/index.en-US.md')),
              },
              {
                path: 'tooltip',
                meta: {
                  category: 'component-en',
                  title: 'Tooltip',
                  desc: '简单的文字提示气泡框。',
                  group: { title: '数据展示', order: 5 },
                },
                component: lazyLoad(() => import('@mink-ui/core/tooltip/__docs__/index.en-US.md')),
              },
            ],
          },
          {
            path: 'blog',
            element: <Outlet />,
            children: [
              {
                index: true,
                meta: { category: 'blog', title: '第一篇文章', date: '2024-11-10T00:00:00.000Z' },
                component: lazyLoad(() => import('@pages/blogs/2024-11-10.md')),
              },
            ],
          },
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
