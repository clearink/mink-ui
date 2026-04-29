import type { SegmentedItemProps } from '../segmented-item.props'

import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useSegmentedItemClassNames } from './use-class-names'

export function useSegmentedItemProps(props: SegmentedItemProps) {
  const {
    value,
    disabled,
    rootCssNames,
    rootCssAttrs,
    onChange,
  } = props

  const { ns, classNames } = useSegmentedItemClassNames(props)

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

  const handleOnChange = () => { !disabled && onChange?.(value) }

  return {
    omitted: props,
    ns,
    cssNames,
    cssAttrs,
    handleOnChange,
  }
}
