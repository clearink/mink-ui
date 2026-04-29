import type { CheckboxProps } from '../props'

import { useControllableState } from '../../../_shared/hooks'

export default function useCheckboxValue(props: CheckboxProps) {
  const { checked, defaultChecked, onChange } = props

  return useControllableState({ defaultValue: defaultChecked, onChange, value: checked })
}
