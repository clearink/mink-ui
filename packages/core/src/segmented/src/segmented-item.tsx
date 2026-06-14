import type { SegmentedItemProps } from './segmented-item.props'

import { defineName } from '../../_shared/utils/define-name'
import { useSegmentedItemProps } from './hooks/use-segmented-item-props'

function SegmentedItem(props: SegmentedItemProps) {
  const {
    omitted,
    ns,
    cssNames,
    cssAttrs,
    refCombined,
    handleChange,
  } = useSegmentedItemProps(props)

  const { checked, disabled, option } = omitted

  const { label, title } = option

  return (
    <label ref={refCombined} className={cssNames.root} style={cssAttrs.root}>
      <input
        className={`${ns}__radio`}
        checked={checked}
        disabled={disabled}
        type="radio"
        onChange={handleChange}
      />
      <div className={cssNames.label} style={cssAttrs.label} title={title}>
        {label}
      </div>
    </label>
  )
}

defineName(SegmentedItem, 'Segmented.Item')

export default SegmentedItem
