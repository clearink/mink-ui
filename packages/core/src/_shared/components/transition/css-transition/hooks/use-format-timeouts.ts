import { isNullish, isNumber } from '@mink-ui/shared'
import { useMemo } from 'react'

import type { CssTransitionProps, CssTransitionTimeouts } from '../props'

import { APPEAR, ENTER, EXIT } from '../../_shared.constant'

export default function useFormatTimeouts<E extends HTMLElement>(props: CssTransitionProps<E>) {
  const { timeouts: _timeouts } = props

  return useMemo(() => {
    const values = {} as CssTransitionTimeouts

    if (isNullish(_timeouts)) return values

    const isNumeric = isNumber(_timeouts)

    values[APPEAR] = isNumeric ? _timeouts : _timeouts.appear
    values[ENTER] = isNumeric ? _timeouts : _timeouts.enter
    values[EXIT] = isNumeric ? _timeouts : _timeouts.exit

    return values
  }, [_timeouts])
}
