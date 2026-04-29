export const logger = {
  info: (component: string, message: string, ...args: any[]) => {
    console.info(
      `%c[Mink UI - ${component}] %cInfo:%c ${message}`,
      'color: #1890ff; font-weight: bold;', // component样式
      'color: #52c41a; font-weight: bold;', // info标签样式
      'color: inherit;', // 消息样式
      ...args,
    )
  },

  error: (component: string, message: string, ...args: any[]) => {
    console.error(
      `%c[Mink UI - ${component}] %cError:%c ${message}`,
      'color: #1890ff; font-weight: bold;',
      'color: #ff4d4f; font-weight: bold;',
      'color: inherit;',
      ...args,
    )
  },

  warn: (component: string, message: string, ...args: any[]) => {
    console.warn(
      `%c[Mink UI - ${component}] %cWarning:%c ${message}`,
      'color: #1890ff; font-weight: bold;',
      'color: #faad14; font-weight: bold;',
      'color: inherit;',
      ...args,
    )
  },
}
