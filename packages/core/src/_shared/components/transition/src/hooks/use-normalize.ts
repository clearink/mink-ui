import type { TransitionMotions, TransitionTimeouts } from '../_shared.props'
import type { CssTransitionProps } from '../css-transition.props'

import { useMemo } from 'react'
import { fallback } from '@mink-ui/shared/function/fallback'
import { isNullish } from '@mink-ui/shared/is/is-nullish'
import { isNumber } from '@mink-ui/shared/is/is-number'
import { isString } from '@mink-ui/shared/is/is-string'

import { APPEAR, ENTER, EXIT } from '../_shared.constant'

/**
 * @description 标准化过渡类名
 */
export function useNormalizeMotions<E extends HTMLElement>(props: CssTransitionProps<E>) {
  const { classNames: css } = props

  return useMemo(() => {
    const values: TransitionMotions = { [APPEAR]: {}, [ENTER]: {}, [EXIT]: {} }

    if (isNullish(css)) return values

    const isGenerated = isString(css)

    values[ENTER].from = isGenerated ? `${css}-enter-from` : css.enterFrom
    values[ENTER].active = isGenerated ? `${css}-enter-active` : css.enterActive
    values[ENTER].to = isGenerated ? `${css}-enter-to` : css.enterTo
    values[ENTER].done = isGenerated ? `${css}-enter-done` : css.enterDone

    values[APPEAR].from = isGenerated ? values[ENTER].from : fallback(css.appearFrom, css.enterFrom)
    values[APPEAR].active = isGenerated ? values[ENTER].active : fallback(css.appearFrom, css.enterFrom)
    values[APPEAR].to = isGenerated ? values[ENTER].to : fallback(css.appearTo, css.enterTo)
    values[APPEAR].done = isGenerated ? values[ENTER].done : fallback(css.appearDone, css.enterDone)

    values[EXIT].from = isGenerated ? `${css}-exit-from` : css.exitFrom
    values[EXIT].active = isGenerated ? `${css}-exit-active` : css.exitActive
    values[EXIT].to = isGenerated ? `${css}-exit-to` : css.exitTo
    values[EXIT].done = isGenerated ? `${css}-exit-done` : css.exitDone

    return values
  }, [css])
}

/**
 * @description 标准化过渡时间
 */
export function useNormalizeTimeouts<E extends HTMLElement>(props: CssTransitionProps<E>) {
  const { timeouts: to } = props

  return useMemo(() => {
    const values: TransitionTimeouts = { [APPEAR]: undefined, [ENTER]: undefined, [EXIT]: undefined }

    if (isNullish(to)) return values

    const isGenerated = isNumber(to)

    values[ENTER] = isGenerated ? to : to.enter

    values[APPEAR] = isGenerated ? to : fallback(to.appear, to.enter)

    values[EXIT] = isGenerated ? to : to.exit

    return values
  }, [to])
}
