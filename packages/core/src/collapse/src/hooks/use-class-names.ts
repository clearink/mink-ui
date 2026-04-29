import type { CollapseItemProps } from '../collapse-item.props'
import type { OmittedCollapseProps, PickedCollapseProps } from '../collapse.props'

import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'
import { cn } from '../../../_shared/libs/cn'

export function useCollapseClassNames(picked: PickedCollapseProps, omitted: OmittedCollapseProps) {
  const { bordered, expandIconPlacement, size } = picked
  const { ghost, prefixCls } = omitted

  const ns = useNamespace('collapse', prefixCls)

  return {
    ns,
    classNames: {
      root: cn(ns, {
        [`${ns}--bordered`]: bordered && !ghost,
        [`${ns}--ghost`]: ghost,
        [`${ns}--icon-end`]: expandIconPlacement === 'end',
        [`${ns}--lg`]: size === 'large',
        [`${ns}--sm`]: size === 'small',
      }),
    },
  }
}

export function useCollapseItemClassNames(omitted: CollapseItemProps) {
  const { expanded, rootNamespace: rootNs, collapsible } = omitted

  const ns = useNamespace(preset => `${rootNs || preset}-item`)

  return {
    ns,
    classNames: {
      root: cn(ns, {
        [`${ns}--disabled`]: collapsible === 'disabled',
        [`${ns}--expanded`]: expanded,
      }),
      header: cn(`${ns}__header`, {
        [`${ns}__header--collapsible`]: collapsible === 'header',
      }),
      icon: cn(`${ns}__icon`, {
        [`${ns}__icon--collapsible`]: collapsible === 'icon',
      }),
      title: cn(`${ns}__title`, {
        [`${ns}__title--collapsible`]: collapsible === 'title',
      }),
      extra: `${ns}__extra`,
      content: `${ns}__content`,
    },
  }
}
