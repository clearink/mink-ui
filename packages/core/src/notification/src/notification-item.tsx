import type { NotificationItemProps } from './notification-item.props'

import { cn } from '../../_shared/libs/cn'
import { cloneElementWithOptions } from '../../_shared/utils/children'
import { defineName } from '../../_shared/utils/define-name'
import { isRenderable } from '../../_shared/utils/renderable'
import { mapStatusIcon } from '../../_shared/utils/status'
import { useNotificationItemProps } from './hooks/use-notification-item-props'

function NotificationItem(props: NotificationItemProps) {
  const {
    omitted,
    cssNames,
    cssAttrs,
    refCombined,
    closeIconRender,
    handleClose,
    handleMouseEnter,
    handleMouseLeave,
  } = useNotificationItemProps(props)

  const { config } = omitted

  const { type, title, description } = config

  const renderCloseIcon = () => {
    return closeIconRender((icon, disabled) => (
      <button
        className={cssNames.closeBtn}
        style={cssAttrs.closeBtn}
        disabled={disabled}
        tabIndex={0}
        type="button"
        onClick={handleClose}
      >
        {icon}
      </button>
    ))
  }

  const renderStatusIcon = () => {
    const statusIcon = mapStatusIcon(type)

    return cloneElementWithOptions(statusIcon, {
      fallback: <span className={cssNames.statusIcon} style={cssAttrs.statusIcon}>{statusIcon}</span>,
      transform: original => ({
        className: cn(original.className, cssNames.statusIcon),
        style: { ...original.style, ...cssAttrs.statusIcon },
      }),
    })
  }

  return (
    <div
      ref={refCombined}
      className={cssNames.root}
      style={cssAttrs.root}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderCloseIcon()}

      {renderStatusIcon()}

      <div className={cssNames.content} style={cssAttrs.content}>
        <div className={cssNames.title} style={cssAttrs.title}>{title}</div>

        {isRenderable(description) && (
          <div className={cssNames.description} style={cssAttrs.description}>
            {description}
          </div>
        )}
      </div>

    </div>
  )
}

defineName(NotificationItem, 'Notification.Item')

export default NotificationItem
