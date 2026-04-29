import type { CollapsibleType } from '../_shared.props'
import type { CollapseItemProps } from '../collapse-item.props'

import { omit } from '@mink-ui/shared/object/omit'

import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { isKeyPressed } from '../../../config-provider/src/utils/keyboard'
import { excludedCollapseItemProps } from '../collapse-item.props'
import { useCollapseItemClassNames } from './use-class-names'

export function useCollapseItemProps(props: CollapseItemProps) {
  const {
    name,
    accordion,
    collapsible,
    expanded,
    rootCssNames,
    rootCssAttrs,
    onChange,
  } = props

  const { ns, classNames } = useCollapseItemClassNames(props)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      rootCssNames,
      classNames,
      props.classNames,
      { root: props.className },
    ],
    [
      rootCssAttrs,
      props.styles,
      { root: props.style },
    ],
    { omitted: props },
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
      'onKeyDown': disabled ? undefined : (e: any) => { isKeyPressed(e, 'enter') && onChange(name) },
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
