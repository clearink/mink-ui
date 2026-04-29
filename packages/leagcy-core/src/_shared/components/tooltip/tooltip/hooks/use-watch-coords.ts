import type { InternalTooltipProps } from '../props'

import isEqual from 'react-fast-compare'

import { useWatchValue } from '../../../../hooks'

export default function useWatchCoords(props: InternalTooltipProps, onCallback: () => void) {
  const { arrow, flip, offset, placement, shift } = props

  const options = { compare: isEqual, listener: onCallback }

  // 影响布局的属性会被 watch
  useWatchValue([placement, offset, arrow, shift, flip], options)
}
