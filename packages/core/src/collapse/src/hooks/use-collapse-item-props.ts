import type { CollapsibleType } from '../_shared.props'
import type { CollapseItemProps } from '../collapse-item.props'

import { omit } from '@mink-ui/shared/object/omit'

import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { isPressKey } from '../../../_shared/utils/keyboard'
import { excludedCollapseItemProps } from '../collapse-item.props'
import { useCollapseItemClassNames } from './use-class-names'

export function useCollapseItemProps(props: CollapseItemProps) {
  const {
    name,
    accordion,
    collapsible,
    expanded,
    outerCssNames,
    outerCssAttrs,
    onChange,
  } = props

  const { ns, classNames } = useCollapseItemClassNames(props)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      outerCssNames,
      classNames,
      props.classNames,
      { root: props.className },
    ],
    [
      outerCssAttrs,
      props.styles,
      { root: props.style },
    ],
    { meta: props },
  )

  const restAttrs = omit(props, excludedCollapseItemProps)

  const resolveCollapsibleProps = (targets: CollapsibleType[]) => {
    if (!targets.includes(collapsible!)) return

    const disabled = collapsible === 'disabled'

    return {
      'aria-expanded': expanded,
      'aria-disabled': disabled,
      'tabIndex': disabled ? -1 : 0,
      'role': accordion ? 'tab' : 'button',
      'onClick': disabled ? undefined : () => { onChange(name) },
      'onKeyDown': disabled ? undefined : (e: any) => { isPressKey(e.key, 'enter') && onChange(name) },
    }
  }

  return {
    omitted: props,
    ns,
    cssNames,
    cssAttrs,
    restAttrs,
    resolveCollapsibleProps,
  }
}
