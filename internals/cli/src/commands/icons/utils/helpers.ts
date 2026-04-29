import type { XmlNode } from '../../../interface'

import { optimize } from 'svgo'

import { isArray } from '../../../utils/helpers'

/**
 * @description 将 svg 内容转换成 base64 字符
 */
export function toBase64(source: string) {
  const size = 50

  const newSource = source
    .replace(/<svg(.*?)>/g, `<svg$1 width="${size}" height="${size}" fill="#cacaca">`)
    .replace(/#333/g, '#1677ff')
    .replace(/#E6E6E6/gi, '#e6f4ff')

  return optimize(newSource, { datauri: 'base64' }).data
}

/**
 * @description 清理 svg 内容, 去除不必要的属性
 */
export function clearIcon(source: string) {
  return optimize(source, {
    floatPrecision: 2,
    plugins: [
      { name: 'cleanupAttrs' },
      { name: 'removeDoctype' },
      { name: 'removeXMLProcInst' },
      { name: 'removeXMLNS' },
      { name: 'removeComments' },
      { name: 'removeMetadata' },
      { name: 'removeTitle' },
      { name: 'removeDesc' },
      { name: 'removeUselessDefs' },
      { name: 'removeEditorsNSData' },
      { name: 'removeEmptyAttrs' },
      { name: 'removeHiddenElems' },
      { name: 'removeEmptyText' },
      { name: 'removeEmptyContainers' },
      { name: 'removeViewBox' },
      { name: 'cleanupEnableBackground' },
      { name: 'convertStyleToAttrs' },
      { name: 'convertColors' },
      { name: 'convertPathData' },
      { name: 'convertTransform' },
      { name: 'removeUnknownsAndDefaults' },
      { name: 'removeNonInheritableGroupAttrs' },
      { name: 'removeUselessStrokeAndFill' },
      { name: 'removeUnusedNS' },
      { name: 'cleanupIds' },
      { name: 'cleanupNumericValues' },
      { name: 'moveElemsAttrsToGroup' },
      { name: 'moveGroupAttrsToElems' },
      { name: 'collapseGroups' },
      { name: 'removeRasterImages' },
      { name: 'mergePaths' },
      { name: 'convertShapeToPath' },
      { name: 'sortAttrs' },
      { name: 'removeDimensions' },
      { name: 'removeAttrs', params: { attrs: ['class', 'viewBox'] } },
    ],
  })
}

/**
 * @description 将 XmlNode[] 转换成 jsx
 */
export function xmlToJsx(nodes: XmlNode[], level: number): string {
  if (!isArray(nodes)) return ''

  return nodes.reduce((result, node) => {
    const root = level === 0 && node.tag === 'svg'

    const text = xmlToJsx(node.children, level + 1)

    const attrs = Object.entries(node.attrs)
      .map(([k, v]) => ` ${k}="${v}"`)
      .join('')

    return `${result}<${node.tag}${root ? ' {...props}' : attrs}>${text}</${node.tag}>`
  }, '')
}
