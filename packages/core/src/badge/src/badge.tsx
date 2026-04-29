import type { BadgeProps } from './badge.props'

import { isArray } from '@mink-ui/shared/is/is-array'

import { GroupTransition } from '../../_shared/components/transition/src'
import { defineName } from '../../_shared/utils/define-name'
import { useBadgeProps } from './hooks/use-badge-props'
import ScrollNumber from './scroll-number'

function Badge(props: BadgeProps) {
  const {
    omitted,
    ns,
    cssNames,
    cssAttrs,
    numberItems,
  } = useBadgeProps(props)

  const { children } = omitted

  const renderSuperscript = () => {
    if (!isArray(numberItems) || !numberItems.length) return null

    return (
      <sup className={cssNames.indicator} style={cssAttrs.indicator}>
        <GroupTransition
          classNames={`${ns}-motion`}
          onEnter={() => ({ width: 0 })}
          onEntering={el => ({ width: el.scrollWidth })}
          onExit={el => ({ width: el.getBoundingClientRect().width })}
          onExiting={() => ({ width: 0 })}
        >
          {numberItems.map(item => (
            <span key={item.key} className={`${ns}__number-items`}>
              {item.scroll ? <ScrollNumber char={item.char} rootNamespace={ns} /> : item.char}
            </span>
          ))}
        </GroupTransition>
      </sup>
    )
  }

  return (
    <span className={cssNames.root} style={cssAttrs.root}>
      {children}
      {renderSuperscript()}
    </span>
  )
}

defineName(Badge)

export default Badge
