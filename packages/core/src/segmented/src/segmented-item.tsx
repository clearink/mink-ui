import type { SegmentedItemProps } from './segmented-item.props'

import { defineName } from '../../_shared/utils/define-name'
import { useSegmentedItemProps } from './hooks/use-segmented-item-props'

function SegmentedItem(props: SegmentedItemProps) {
  const { omitted, ns, cssNames, cssAttrs, handleOnChange } = useSegmentedItemProps(props)

  const { ref, checked, label, title, disabled } = omitted

  return (
    <label ref={ref} className={cssNames.root} style={cssAttrs.root}>
      <input
        className={`${ns}__radio`}
        checked={checked}
        disabled={disabled}
        type="radio"
        onChange={handleOnChange}
      />
      <div className={cssNames.label} style={cssAttrs.label} title={title}>
        {label}
      </div>
    </label>
  )
}

defineName(SegmentedItem, 'Segmented.Item')

export default SegmentedItem
