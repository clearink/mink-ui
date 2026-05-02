import type { ExpandedName } from '../_shared.props'
import type { CollapseProps, OmittedCollapseProps, PickedCollapseProps } from '../collapse.props'

import { isUndefined } from '@mink-ui/shared/is/is-undefined'
import { omit } from '@mink-ui/shared/object/omit'

import { useControlledState } from '../../../_shared/hooks/use-controlled-state'
import { useEvent } from '../../../_shared/hooks/use-event'
import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { SizeContext } from '../../../config-provider/src/_shared.context'
import { defaultCollapseProps as defaultProps } from '../collapse.props'
import { normalizeExpandedNames } from '../utils/format'
import { useCollapseClassNames } from './use-class-names'

export function useCollapseProps(props: CollapseProps) {
  const globalConfig = useConfiguration('collapse')
  const sizeContext = SizeContext.use()

  const {
    accordion,
    expandedNames: _names,
    defaultExpandedNames: _default,
    onChange,
    size = sizeContext,
    bordered = defaultProps.bordered,
    collapsible = defaultProps.collapsible,
    expandIcon = defaultProps.expandIcon,
    expandIconPlacement = defaultProps.expandIconPlacement,
  } = props

  const omitted = props as OmittedCollapseProps
  const picked = { bordered, collapsible, expandIcon, expandIconPlacement, size } as PickedCollapseProps

  const [expandedNames, setExpandedNames] = useControlledState({
    value: isUndefined(_names) ? undefined : normalizeExpandedNames(_names, accordion),
    defaultValue: () => normalizeExpandedNames(_default, accordion),
    onChange: (names, name: ExpandedName) => { onChange?.(name, names) },
  })

  const { ns, classNames } = useCollapseClassNames(picked, omitted)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      globalConfig.classNames,
      { root: globalConfig.className },
      classNames,
      omitted.classNames,
      { root: omitted.className },
    ],
    [
      globalConfig.styles,
      { root: globalConfig.style },
      omitted.styles,
      { root: omitted.style },
    ],
    { picked, omitted },
  )

  const outerCssNames = { ...omit(cssNames, ['root', 'item']), root: cssNames.item }
  const outerCssAttrs = { ...omit(cssAttrs, ['root', 'item']), root: cssAttrs.item }

  const handleOnChange = useEvent((name: ExpandedName) => {
    let names = expandedNames.concat()

    const index = names.indexOf(name)

    const isExpanded = index !== -1

    if (accordion) names = isExpanded ? [] : [name]
    else if (isExpanded) names.splice(index, 1)
    else names.push(name)

    setExpandedNames(names, name)
  })

  return {
    picked,
    omitted,
    ns,
    cssNames,
    cssAttrs,
    expandedNames,
    outerCssNames,
    outerCssAttrs,
    handleOnChange,
  }
}
