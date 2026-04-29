import type { VoidFn } from '@mink-ui/shared/interface'
import type { PickedInternalTooltipProps } from '../tooltip.props'

import isEqual from 'react-fast-compare'

import { useWatchValue } from '../../../../hooks/use-watch-value'

export function useWatchCoords(picked: PickedInternalTooltipProps, onUpdate: VoidFn) {
  const { placement, arrow, flip, shift, offset } = picked

  const options = { compare: isEqual, listener: onUpdate }

  // 影响布局的属性会被 watch
  return useWatchValue([placement, offset, arrow, shift, flip], options)
}
