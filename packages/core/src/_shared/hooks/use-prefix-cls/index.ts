import { ConfigContext } from '@mink-ui/core/config-provider/_shared.context'

export function usePrefixCls(name?: string) {
  const { prefixCls = 'mink' } = ConfigContext.useState()
  return name ? `${prefixCls}-${name}` : prefixCls
}
