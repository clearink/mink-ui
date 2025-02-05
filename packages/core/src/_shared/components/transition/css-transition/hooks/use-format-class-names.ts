import { fallback, isString } from '@mink-ui/shared'
import { useMemo } from 'react'

import type { CssTransitionClassNames, CssTransitionProps } from '../props'

import { APPEAR, ENTER, EXIT } from '../../_shared.constant'

export default function useFormatClassNames<E extends HTMLElement>(
  props: CssTransitionProps<E>,
) {
  const { classNames: cn } = props

  return useMemo(() => {
    const values = [APPEAR, ENTER, EXIT].reduce((res, step) => {
      res[step] = { from: undefined, active: undefined, done: undefined }
      return res
    }, {} as CssTransitionClassNames)

    if (!cn) return values

    const isGenerated = isString(cn)

    values[ENTER].from = isGenerated ? `${cn}-enter-from` : cn.enterFrom
    values[ENTER].active = isGenerated ? `${cn}-enter-active` : cn.enterActive
    values[ENTER].to = isGenerated ? `${cn}-enter-to` : cn.enterTo
    values[ENTER].done = isGenerated ? `${cn}-enter-done` : cn.enterDone

    values[EXIT].from = isGenerated ? `${cn}-exit-from` : cn.exitFrom
    values[EXIT].active = isGenerated ? `${cn}-exit-active` : cn.exitActive
    values[EXIT].to = isGenerated ? `${cn}-exit-to` : cn.exitTo
    values[EXIT].done = isGenerated ? `${cn}-exit-done` : cn.exitDone

    values[APPEAR].from = isGenerated ? values[ENTER].from : fallback(cn.appearFrom, cn.enterFrom)
    values[APPEAR].active = isGenerated ? values[ENTER].active : fallback(cn.appearFrom, cn.enterFrom)
    values[APPEAR].to = isGenerated ? values[ENTER].to : fallback(cn.appearTo, cn.enterTo)
    values[APPEAR].done = isGenerated ? values[ENTER].done : fallback(cn.appearDone, cn.enterDone)

    return values
  }, [cn])
}
