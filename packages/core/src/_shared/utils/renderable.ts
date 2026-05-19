import { isNullish } from '@mink-ui/shared/is/is-nullish'

/**
 * @description 判断 ReactNode 是否可渲染，目前排除的有 null, undefined, false, ''
 * 还可以自定义判断条件
 */
export function isRenderable(node: any, custom?: (node: any) => boolean) {
  return (!isNullish(node) && node !== false && node !== '') || !!custom?.(node)
}
