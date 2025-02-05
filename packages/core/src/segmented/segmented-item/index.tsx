import { usePrefixCls, useSemanticStyles } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName } from '@mink-ui/core/_shared/utils'
import { type ForwardedRef, forwardRef } from 'react'

import type { SegmentedItemProps } from './props'

import useFormatClassNames from './hooks/use-format-class-names'

function SegmentedItem(props: SegmentedItemProps, _ref: ForwardedRef<HTMLLabelElement>) {
  const { checked, disabled, label, onChange, title, value } = props

  const prefixCls = usePrefixCls('segmented-item')

  const classNames = useFormatClassNames(prefixCls, props)

  const styles = useSemanticStyles(props)

  return (
    <label ref={_ref} className={classNames.root} style={styles.root}>
      <input
        className={classNames.radio}
        checked={checked}
        disabled={disabled}
        type="radio"
        onChange={() => {
          !disabled && onChange(value)
        }}
      />
      <div className={classNames.label} style={styles.label} title={title}>
        {label}
      </div>
    </label>
  )
}

betterDisplayName(SegmentedItem, 'Segmented.Item')

export default forwardRef(SegmentedItem)
