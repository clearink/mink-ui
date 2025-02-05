import { GroupTransition } from '@mink-ui/core/_shared/components'
import { usePrefixCls, useSemanticStyles } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName, withDefaults } from '@mink-ui/core/_shared/utils'
import { isArray } from '@mink-ui/shared'

import type { BadgeProps } from './props'

import ScrollNumber from '../scroll-number'
import useFormatClassNames from './hooks/use-format-class-names'
import useScrollGroups from './hooks/use-scroll-groups'
import { defaultBadgeProps } from './props'
import handlers from './utils/transition-handlers'

function Badge(_props: BadgeProps) {
  const props = withDefaults(_props, defaultBadgeProps)

  const { children } = props

  const prefixCls = usePrefixCls('badge')

  const classNames = useFormatClassNames(prefixCls, props)

  const styles = useSemanticStyles(props)

  const groups = useScrollGroups(props)

  return (
    <span className={classNames.root} style={styles.root}>
      {children}
      {isArray(groups) && !!groups.length && (
        <sup className={classNames.indicator} style={styles.indicator}>
          <GroupTransition classNames={`${prefixCls}-scroll-group-motion`} {...handlers}>
            {groups.map(group => (
              <span key={group.key} className={`${prefixCls}-scroll-group`}>
                {group.scroll ? <ScrollNumber char={group.char} /> : group.char}
              </span>
            ))}
          </GroupTransition>
        </sup>
      )}
    </span>
  )
}

betterDisplayName(Badge)

export default Badge
