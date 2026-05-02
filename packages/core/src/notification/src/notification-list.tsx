import type { NotificationListProps } from './notification-list.props'

import { GroupTransition } from '../../_shared/components/transition/src'
import { cn } from '../../_shared/libs/cn'
import { defineName } from '../../_shared/utils/define-name'
import { useNotificationListProps } from './hooks/use-notification-list-props'
import NotificationItem from './notification-item'

function NotificationList(props: NotificationListProps) {
  const {
    omitted,
    ns,
    cssNames,
    cssAttrs,
    ctrl,
    isHovering,
    itemLayouts,
    stackEnable,
    extraCssAttrs,
    outerCssNames,
    outerCssAttrs,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleOnGroupExited,
  } = useNotificationListProps(props)

  const { items, onDismiss } = omitted

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
        items={items as any[]}
        onGroupExited={handleOnGroupExited}
      >
        {($motion, getters, item) => (
          <NotificationItem
            ref={$motion}
            config={item}
            getters={getters}
            listHovering={stackEnable && isHovering}
            outerCssAttrs={outerCssAttrs}
            outerCssNames={outerCssNames}
            outerCssVars={itemLayouts.get(item.key)}
            outerNamespace={ns}
            onCollect={ctrl.collect}
            onDismiss={onDismiss}
          />
        )}
      </GroupTransition>
    </div>
  )
}

defineName(NotificationList, 'Notification.List')

export default NotificationList
