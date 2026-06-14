import type { NotificationListProps } from './notification-list.props'

import { GroupTransition } from '../../_shared/components/transition/src'
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
    itemCssVars,
    stackEnable,
    outerCssNames,
    outerCssAttrs,
    handleMouseEnter,
    handleMouseLeave,
    handleGroupExited,
  } = useNotificationListProps(props)

  const { items, onDismiss } = omitted

  return (
    <div
      ref={ctrl.$root}
      className={cssNames.root}
      style={cssAttrs.root}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <GroupTransition
        classNames={`${ns}-motion`}
        appear
        items={items as Required<typeof items[number]>[]}
        onGroupExited={handleGroupExited}
      >
        {($motion, getters, item) => (
          <NotificationItem
            ref={$motion}
            getters={getters}
            item={item}
            listHovering={stackEnable && isHovering}
            outerCssAttrs={outerCssAttrs}
            outerCssNames={outerCssNames}
            outerCssVars={itemCssVars.get(item.key)}
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
