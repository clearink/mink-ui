import type { NotificationListProps } from './notification-list.props'

import { GroupTransition } from '../../_shared/components/transition/src'
import { defineName } from '../../_shared/utils/define-name'
import { useNotificationListProps } from './hooks/use-notification-list-props'
import NotificationItem from './notification-item'

function NotificationList(props: NotificationListProps) {
  const {
    picked,
    omitted,
    ns,
    cssNames,
    cssAttrs,
    ctrl,
    listHovering,
    isExpanded,
    stackEnable,
    stackConfig,
    stackLayouts,
    rootCssAttrs,
    rootCssNames,
    extraCssAttrs,
    returnEmpty,
    handleOnEnter,
    handleOnEntering,
    handleOnExit,
    handleOnExiting,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleSyncHovering,
  } = useNotificationListProps(props)

  const { placement } = picked
  const { items, onDismiss, onFinished } = omitted
  const { gap } = stackConfig

  if (returnEmpty) return null

  return (
    <div
      ref={ctrl.$container}
      className={cssNames.root}
      style={{ ...cssAttrs.root, ...extraCssAttrs }}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <GroupTransition
        ref={ctrl.$group}
        classNames={`${ns}-motion`}
        appear
        onEnter={handleOnEnter}
        onEntering={handleOnEntering}
        onExit={handleOnExit}
        onExited={handleSyncHovering}
        onExiting={handleOnExiting}
        onFinished={() => { onFinished(placement) }}
      >
        {items.map(item => (
          <div
            key={item.key}
            className={`${ns}-item-cell`}
            style={stackLayouts.get(item.key!)}
          >
            <NotificationItem
              ref={(el) => {
                if (el) ctrl.$items.set(item.key!, el)
                else ctrl.$items.delete(item.key!)
              }}
              config={item}
              isExpanded={isExpanded}
              rootCssAttrs={rootCssAttrs}
              rootCssNames={rootCssNames}
              rootHovering={stackEnable && listHovering}
              rootNamespace={ns}
              onDismiss={onDismiss}
            />

            {isExpanded && <div className={`${ns}-item-bridge`} style={{ height: gap }} />}
          </div>
        ))}
      </GroupTransition>
    </div>
  )
}

defineName(NotificationList, 'Notification.List')

export default NotificationList
