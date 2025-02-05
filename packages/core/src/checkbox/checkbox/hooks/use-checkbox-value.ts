import { useControllableState } from '@mink-ui/core/_shared/hooks'

import type { CheckboxProps } from '../props'

export default function useCheckboxValue(props: CheckboxProps) {
  const { checked, defaultChecked, onChange } = props

  return useControllableState({ defaultValue: defaultChecked, onChange, value: checked })
}
