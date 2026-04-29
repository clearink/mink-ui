import path from 'node:path'

import slash from 'slash'

import md5 from './md5.ts'

/**
 * @description 格式化文件路径
 */
export function formatFilePath(relative: string, parent: string | undefined) {
  return slash(parent ? path.resolve(path.dirname(parent), relative) : relative)
}

export function formatUniqueId(prefix: string, content: string, suffix: string) {
  return `${prefix}${md5(content)}${suffix}`
}

/**
 * @description 格式化示例样式名称
 */
export function formatCssName(filePath: string) {
  return `css-${md5(filePath)}`
}
