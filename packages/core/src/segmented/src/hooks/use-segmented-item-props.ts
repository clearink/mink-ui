import type { SegmentedItemProps } from '../segmented-item.props'

import { useMergeRefs } from '../../../_shared/hooks/use-merge-refs'
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
    { omitted: props },
  )

  const mergedRef = useMergeRefs(ref, (el) => { onCollect(el, config) })

  const handleOnChange = () => { !disabled && onChange?.(value) }

  return {
    omitted: props,
    ns,
    cssNames,
    cssAttrs,
    mergedRef,
    handleOnChange,
  }
}
