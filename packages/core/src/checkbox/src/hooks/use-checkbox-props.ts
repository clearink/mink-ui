import type { ChangeEvent } from 'react'
import type { CheckboxProps, OmittedCheckboxProps, PickedCheckboxProps } from '../checkbox.props'

import { fallback } from '@mink-ui/shared/function/fallback'

import { useControlledState } from '../../../_shared/hooks/use-controlled-state'
import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { DisabledContext } from '../../../config-provider/src/_shared.context'
import { CheckboxGroupContext } from '../_shared.context'
import { useCheckboxClassNames } from './use-class-names'

export function useCheckboxProps(props: CheckboxProps) {
  const globalConfig = useConfiguration('checkbox')
  const checkboxGroupContext = CheckboxGroupContext.use()
  const disabledContext = DisabledContext.use()

  const {
    checked: _checked,
    defaultChecked,
    onChange,
    disabled = fallback(props.disabled || checkboxGroupContext.disabled, disabledContext),
  } = props

  const omitted = props as OmittedCheckboxProps
  const picked: PickedCheckboxProps = { disabled }

  const [checked, setChecked] = useControlledState({
    value: _checked,
    defaultValue: defaultChecked,
    onChange,
  })

  const { ns, classNames } = useCheckboxClassNames(picked, omitted, { checked })

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      globalConfig.classNames,
      { root: globalConfig.className },
      classNames,
      omitted.classNames,
      { root: omitted.className },
    ],
    [
      globalConfig.styles,
      { root: globalConfig.style },
      omitted.styles,
      { root: omitted.style },
    ],
    { picked, omitted },
  )

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return

    setChecked(e.target.checked)
  }

  return {
    picked,
    omitted,
    ns,
    cssNames,
    cssAttrs,
    checked,
    handleOnChange,
  }
}
