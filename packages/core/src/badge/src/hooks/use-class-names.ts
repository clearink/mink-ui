import type { OmittedBadgeProps, PickedBadgeProps } from '../badge.props'
import type { OmittedScrollNumberProps } from '../scroll-number.props'

import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'
import { cn } from '../../../_shared/libs/cn'

export function useBadgeClassNames(_picked: PickedBadgeProps, omitted: OmittedBadgeProps) {
  const { dot, prefixCls } = omitted

  const ns = useNamespace('badge', prefixCls)

  return {
    ns,
    classNames: {
      root: cn(ns, {
        [`${ns}--dot`]: dot,
      }),
      indicator: `${ns}__indicator`,
    },
  }
}

export function useScrollNumberClassNames(omitted: OmittedScrollNumberProps) {
  const { rootNamespace: rootNs } = omitted

  const ns = `${rootNs}-scroll-number`

  return {
    ns,
    classNames: {
      root: ns,
    },
  }
}
