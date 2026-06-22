import type { SegmentedItemProps } from '../segmented-item.props'

import { useComposeRefs } from '../../../_shared/hooks/use-compose-refs'
import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useSegmentedItemClassNames } from './use-class-names'

export function useSegmentedItemProps(props: SegmentedItemProps) {
  const { option, outerCssNames, outerCssAttrs, onChange, onCollect } = props
  const { ref, value, disabled } = option

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

  const refComposed = useComposeRefs(ref, (el) => { onCollect(el, option) })

  const handleChange = () => { !disabled && onChange?.(value) }

  return {
    omitted: props,
    ns,
    cssNames,
    cssAttrs,
    refComposed,
    handleChange,
  }
}
