import { constants } from './constants'
import { formatAttrName } from './format-attr-name'
import { isArray, isObject, toArray } from './shared'

export type IconJson = {
  [K in string]: IconJson | string
}

export interface BuildIconSourceOptions {
  base64: string
  dirName: string
  fileName: string
  iconName: string
  json: IconJson
}

export interface IconNode {
  attrs: Record<string, any>
  children: IconNode[]
  tag: string
}

const re = new RegExp(`^${constants.iconAttrNamePrefix}`)

function buildIconNodes(json: IconJson | string, type: 'attr' | 'node' = 'node') {
  const isFormatNode = type === 'node'

  const init = isFormatNode ? [] : {}

  if (!isObject(json)) return init

  return Object.entries(json).reduce((res, [key, val]) => {
    const isTag = !re.test(key)

    if (!isFormatNode && !isTag) { res[formatAttrName(key)] = val }
    else if (isTag && isArray(res)) {
      toArray(val).forEach((node) => {
        res.push({
          tag: key,
          attrs: buildIconNodes(node, 'attr'),
          children: buildIconNodes(node, 'node'),
        })
      })
    }

    return res
  }, init)
}

function buildJsxTags(nodes: IconNode[], level: number) {
  if (!Array.isArray(nodes)) return ''

  return nodes.reduce((res, node) => {
    const isTopSvg = level === 0 && node.tag === 'svg'

    const text = buildJsxTags(node.children, level + 1)

    const attrs = Object.entries(node.attrs).map(([k, v]) => ` ${k}="${v}"`).join('')

    res += `<${node.tag}${isTopSvg ? ' {...props}' : attrs}>${text}</${node.tag}>`
    return res
  }, '')
}

export function genIconSource(
  options: BuildIconSourceOptions,
) {
  const { base64, fileName, dirName, iconName, json } = options

  const nodes = buildIconNodes(json) as unknown as IconNode[]

  const rootAttrs = nodes[0] && nodes[0].tag === 'svg' ? nodes[0].attrs : {}

  return `/* eslint-disable */
// @ts-nocheck
/* This file is automatically generated, please do not manually modify it */
import { withIcon } from "../_shared/components"
import type { IconProps } from "../_shared/types"
import { withDefaults } from "../_shared/utils"

function ${iconName}(_props: IconProps) {
  ${Object.keys(rootAttrs).length
    ? `const props = withDefaults(_props, ${JSON.stringify(rootAttrs)})`
    : 'const props = _props'}
  return ${buildJsxTags(nodes, 0)}
}

/** ![${fileName}](${base64}) */
export default withIcon(${iconName}, ${JSON.stringify({ name: fileName, theme: dirName })})
`
}
