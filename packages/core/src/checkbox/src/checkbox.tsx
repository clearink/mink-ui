import type { CheckboxProps } from './checkbox.props'

import { defineName } from '../../_shared/utils/define-name'
import { isRenderable } from '../../_shared/utils/renderable'
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
    handleChange,
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
          onChange={handleChange}
        />
        <span className={cssNames.inner} style={cssAttrs.inner} />

        {isRenderable(children) && (
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
