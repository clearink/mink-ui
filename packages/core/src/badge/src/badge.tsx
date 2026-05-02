import type { BadgeProps } from './badge.props'

import { isArray } from '@mink-ui/shared/is/is-array'

import { GroupTransition } from '../../_shared/components/transition/src'
import { cn } from '../../_shared/libs/cn'
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

  const renderIndicator = () => {
    if (!isArray(numberItems) || !numberItems.length) return null

    return (
      <sup className={cssNames.indicator} style={cssAttrs.indicator}>
        <GroupTransition
          classNames={`${ns}-motion`}
          items={numberItems}
          onEnter={() => ({ width: 0 })}
          onEntering={el => ({ width: el.scrollWidth })}
          onExit={el => ({ width: el.getBoundingClientRect().width })}
          onExiting={() => ({ width: 0 })}
        >
          {($motion, getters, item) => {
            return (
              <span
                ref={$motion}
                className={cn(`${ns}__number-items`, getters.names())}
                style={getters.attrs()}
              >
                {item.scroll ? <ScrollNumber char={item.char} outerNamespace={ns} /> : item.char}
              </span>
            )
          }}

        </GroupTransition>
      </sup>
    )
  }

  return (
    <span className={cssNames.root} style={cssAttrs.root}>
      {children}
      {renderIndicator()}
    </span>
  )
}

defineName(Badge)

export default Badge
