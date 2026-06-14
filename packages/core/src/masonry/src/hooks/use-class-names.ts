import type { MasonryItemProps } from '../masonry-item.props'
import type { OmittedMasonryProps } from '../masonry.props'

import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'
import { cn } from '../../../_shared/libs/cn'

export function useMasonryClassNames<V>(omitted: OmittedMasonryProps<V>) {
  const { prefixCls } = omitted

  const ns = useNamespace('masonry', prefixCls)

  return {
    ns,
    classNames: {
      root: cn(ns, {
        // 根据条件添加 modifier classes
      }),
    },
  }
}

export function useMasonryItemClassNames(omitted: MasonryItemProps) {
  const { outerNamespace: ons } = omitted

  const ns = useNamespace(preset => `${ons || `${preset}-masonry`}-item`)

  return {
    classNames: {
      root: ns,
    },
  }
}
