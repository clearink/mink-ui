import type { SegmentedItemProps } from '../segmented-item.props'
import type { OmittedSegmentedProps, PickedSegmentedProps } from '../segmented.props'

import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'
import { cn } from '../../../_shared/libs/cn'

/**
 * @description 获取组件的 className
 */
export function useSegmentedClassNames(_picked: PickedSegmentedProps, omitted: OmittedSegmentedProps) {
  const { disabled, oreientation, prefixCls } = omitted

  const ns = useNamespace('segmented', prefixCls)

  return {
    ns,
    classNames: {
      root: cn(ns, {
        [`${ns}--disabled`]: disabled,
        [`${ns}--vertical`]: oreientation === 'vertical',
      }),
      inner: `${ns}__inner`,
      thumb: `${ns}__thumb`,
    },
  }
}

export function useSegmentedItemClassNames(omitted: SegmentedItemProps) {
  const { rootNamespace: rootNs, checked, disabled, isShowThumb } = omitted

  const ns = useNamespace(preset => `${rootNs || preset}-item`)

  return {
    ns,
    classNames: {
      root: cn(ns, {
        [`${ns}--disabled`]: disabled,
        [`${ns}--selected`]: checked && !isShowThumb,
      }),
      label: `${ns}__label`,
    },
  }
}
