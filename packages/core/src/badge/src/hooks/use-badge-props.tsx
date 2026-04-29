import type { BadgeProps, OmittedBadgeProps, PickedBadgeProps } from '../badge.props'

import { useMemo } from 'react'
import { fallback } from '@mink-ui/shared/function/fallback'
import { isNumber } from '@mink-ui/shared/is/is-number'

import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { defaultBadgeProps as defaultProps } from '../badge.props'
import { useBadgeClassNames } from './use-class-names'

export function useBadgeProps(props: BadgeProps) {
  const globalConfig = useConfiguration('badge')

  const {
    count,
    overflowCount = fallback(globalConfig.overflowCount, defaultProps.overflowCount),
  } = props

  const omitted = props as OmittedBadgeProps
  const picked: PickedBadgeProps = { overflowCount }

  const { ns, classNames } = useBadgeClassNames(picked, omitted)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      { ...globalConfig.classNames },
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
  )

  const numberItems = useMemo(() => {
    if (!isNumber(count)) return null

    const capped = Math.min(count, overflowCount!)

    const items = `${Math.abs(capped)}`.split('').map((char, i) => ({
      key: `${i}`,
      char,
      scroll: true,
    }))

    if (capped < 0) items.unshift({ key: '-', char: '-', scroll: false })

    if (count > overflowCount!) items.push({ key: '+', char: '+', scroll: false })

    return items
  }, [count, overflowCount])

  return {
    picked,
    omitted,
    ns,
    cssNames,
    cssAttrs,
    numberItems,
  }
}
