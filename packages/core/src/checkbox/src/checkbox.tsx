import type { CheckboxProps } from './checkbox.props'

import { isNullish } from '@mink-ui/shared/is/is-nullish'

import { defineName } from '../../_shared/utils/define-name'
import TouchEffect from '../../touch-effect/src'
import { useCheckboxProps } from './hooks/use-checkbox-props'

function Checkbox(props: CheckboxProps) {
  const {
    picked,
    omitted,
    ns,
    cssNames,
    cssAttrs,
    checked,
    handleOnChange,
  } = useCheckboxProps(props)

  const { disabled } = picked
  const { children } = omitted

  return (
    <TouchEffect
      component="Checkbox"
      disabled={disabled}
      selector={`.${ns}__inner`}
    >
      <label
        className={cssNames.root}
        style={cssAttrs.root}
      >
        <input
          className={cssNames.input}
          style={cssAttrs.input}
          checked={!!checked}
          type="checkbox"
          onChange={handleOnChange}
        />
        <span className={cssNames.inner} style={cssAttrs.inner} />
        {!isNullish(children) && (
          <span className={cssNames.label} style={cssAttrs.label}>
            {children}
          </span>
        )}
      </label>
    </TouchEffect>
  )
}

defineName(Checkbox)

export default Checkbox
