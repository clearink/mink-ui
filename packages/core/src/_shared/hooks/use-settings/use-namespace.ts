import { isFunction } from '@mink-ui/shared/is/is-function'

import { GlobalConfigContext } from '../../../config-provider/src/_shared.context'

/**
 * @description 组件 className 前缀
 */
export function useNamespace(component: (preset: string) => string): string
export function useNamespace(component: string, custom: string | undefined): string
export function useNamespace(arg1: any, arg2?: string) {
  const { rootPrefixCls: preset } = GlobalConfigContext.use()

  if (arg1 && isFunction(arg1)) return arg1(preset)

  return arg2 ?? `${preset}-${arg1}`
}
