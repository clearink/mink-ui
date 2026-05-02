import type { NotificationItemProps } from './notification-item.props'

import { isNullish } from '@mink-ui/shared'

import { cn } from '../../_shared/libs/cn'
import { cloneElementWithOptions } from '../../_shared/utils/children'
import { defineName } from '../../_shared/utils/define-name'
import { normalizeClosable } from '../../config-provider/src/utils/closable'
import { mapStatusIcon } from '../../config-provider/src/utils/status'
import { useNotificationItemProps } from './hooks/use-notification-item-props'

function NotificationItem(props: NotificationItemProps) {
  const {
    omitted,
    cssNames,
    cssAttrs,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleCloseOnClick,
  } = useNotificationItemProps(props)

  const { ref, config } = omitted

  const { type, closable, closeIcon, title, description } = config

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

  const renderCloseIcon = () => {
    const { closeIcon: closeIconElement } = normalizeClosable({
      currentState: { closable, closeIcon },
      defaultState: {
        closeIconRender: icon => (
          <button
            className={cssNames.closeBtn}
            style={cssAttrs.closeBtn}
            tabIndex={0}
            type="button"
            onClick={handleCloseOnClick}
          >
            {icon}
          </button>
        ),
      },
    })

    return closeIconElement
  }

  return (
    <div
      ref={ref}
      className={cssNames.root}
      style={cssAttrs.root}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      {renderStatusIcon()}

      <div className={cssNames.content} style={cssAttrs.content}>
        <div className={cssNames.title} style={cssAttrs.title}>{title}</div>
        {!isNullish(description) && (
          <div className={cssNames.description} style={cssAttrs.description}>
            {description}
          </div>
        )}
      </div>

      {renderCloseIcon()}
    </div>
  )
}

defineName(NotificationItem, 'Notification.Item')

export default NotificationItem
