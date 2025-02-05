import { GroupTransition } from '@mink-ui/core/_shared/components'
import { useDebounceFrame, usePrefixCls, useWatchValue, useZIndex } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName, cls } from '@mink-ui/core/_shared/utils'
import { useEffect } from 'react'
import isEqual from 'react-fast-compare'

import type { NotificationListProps } from './props'

import NotificationNotice from '../notification-notice'
import useNotificationList from './hooks/use-notification-list'
import useNotificationStack from './hooks/use-notification-stack'

function NotificationList(props: NotificationListProps) {
  const { notices, placement, top, bottom, stack, onClose, onFinished } = props

  const prefixCls = usePrefixCls('notification')

  const { stackEnable, stackConfig } = useNotificationStack(props)

  const { gap, threshold } = stackConfig

  const {
    refs,
    transforms,
    handleUpdate,
    handleEnter,
    handleEntering,
    handleExit,
    handleExiting,
    handleMouseEnter,
    handleMouseLeave,
  } = useNotificationList(props, stackEnable, stackConfig)

  const listener = useDebounceFrame(handleUpdate)

  const returnEarly1 = useWatchValue([stack, refs.hovers.size], { compare: isEqual, listener })

  const [returnEarly2, zIndex] = useZIndex(true)

  // fix react strict mode
  useEffect(() => () => { refs.reset() }, [refs])

  if (returnEarly1 || returnEarly2) return null

  const isExpanded = stackEnable && (notices.length <= threshold || refs.hovers.size > 0)

  return (
    <div
      className={cls(prefixCls, {
        [`${prefixCls}--${placement}`]: placement,
        [`${prefixCls}--stack`]: stackEnable,
        [`${prefixCls}--expanded`]: isExpanded,
      })}
      style={{ ...placement.startsWith('bottom') ? { bottom } : { top }, zIndex }}
    >
      <GroupTransition
        ref={(el) => { refs.components = el?.components }}
        appear
        classNames={`${prefixCls}-motion`}
        onEnter={handleEnter}
        onEntering={handleEntering}
        onExit={handleExit}
        onExiting={handleExiting}
        onFinished={onFinished}
      >
        {notices.map((notice) => {
          return (
            <div
              key={notice.key}
              className={`${prefixCls}-notice-wrapper`}
              onMouseEnter={() => { handleMouseEnter(notice.key) }}
              onMouseLeave={() => { handleMouseLeave(notice.key) }}
              style={transforms.get(notice.key)}
            >
              <NotificationNotice
                {...notice}
                key={notice.key}
                ref={(el) => {
                  if (el) refs.panels.set(notice.key, el)
                  else refs.panels.delete(notice.key)
                }}
                onClose={() => { notice.onClose?.(); onClose(notice.key) }}
              />
              {isExpanded && <div className={`${prefixCls}-pointer-holder`} style={{ height: gap }} />}
            </div>
          )
        })}
      </GroupTransition>
    </div>
  )
}

betterDisplayName(NotificationList, 'Notification.List')

export default NotificationList
