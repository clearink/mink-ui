import type { SegmentedItemProps } from '../segmented-item.props'

import { useCombinedRefs } from '../../../_shared/hooks/use-combined-refs'
import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useSegmentedItemClassNames } from './use-class-names'

export function useSegmentedItemProps(props: SegmentedItemProps) {
  const { config, outerCssNames, outerCssAttrs, onChange, onCollect } = props
  const { ref, value, disabled } = config

  const { ns, classNames } = useSegmentedItemClassNames(props)

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

  const refCombined = useCombinedRefs(ref, (el) => { onCollect(el, config) })

  const handleChange = () => { !disabled && onChange?.(value) }

  return {
    omitted: props,
    ns,
    cssNames,
    cssAttrs,
    refCombined,
    handleChange,
  }
}
