import { usePrefixCls } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName, withDefaults } from '@mink-ui/core/_shared/utils'
import { DisabledContext } from '@mink-ui/core/config-provider/_shared.context'
import TouchEffect from '@mink-ui/core/touch-effect'
import { isNullish, omit } from '@mink-ui/shared'

import type { CheckboxProps } from './props'

import { CheckboxGroupContext } from '../_shared.context'
import useCheckboxValue from './hooks/use-checkbox-value'
import useFormatClassNames from './hooks/use-format-class-names'

const excluded = [
  'autoFocus',
  'children',
  'disabled',
  'checked',
  'defaultChecked',
  'indeterminate',
  'onChange',
] as const

function Checkbox(_props: CheckboxProps) {
  const group = CheckboxGroupContext.useState()

  const props = withDefaults(
    {
      ..._props,
      disabled: _props.disabled || group.disabled,
    },
    {
      disabled: DisabledContext.useState(),
    },
  )

  const { children, disabled } = props

  const prefixCls = usePrefixCls('checkbox')

  const [checked, setChecked, controlled] = useCheckboxValue(props)

  const classNames = useFormatClassNames(prefixCls, props, { checked })

  const attrs = omit(props, excluded)

  return (
    <TouchEffect
      component="Checkbox"
      disabled={checked || disabled || controlled}
      selector={`.${prefixCls}__inner`}
    >
      <label {...attrs} className={classNames.root}>
        <input
          className={classNames.input}
          checked={!!checked}
          type="checkbox"
          onChange={(e) => {
            !disabled && setChecked(e.target.checked)
          }}
        />
        <span className={classNames.inner} />
        {!isNullish(children) && <span className={classNames.label}>{children}</span>}
      </label>
    </TouchEffect>
  )
}

betterDisplayName(Checkbox)

export default Checkbox
