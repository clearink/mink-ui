import type { AlertProps } from './alert.props'

import { CssTransition } from '../../_shared/components/transition/src'
import { cn } from '../../_shared/libs/cn'
import { cloneElementWithOptions } from '../../_shared/utils/children'
import { defineName } from '../../_shared/utils/define-name'
import { combineRefs } from '../../_shared/utils/refs'
import { isRenderable } from '../../_shared/utils/renderable'
import { mapStatusIcon } from '../../_shared/utils/status'
import { useAlertProps } from './hooks/use-alert-props'

function Alert(props: AlertProps) {
  const {
    picked,
    omitted,
    $element,
    ns,
    cssNames,
    cssAttrs,
    visible,
    closeIconRender,
    restAttrs,
    handleClose,
    handleClosed,
  } = useAlertProps(props)

  const { showIcon, type } = picked
  const { description, action, message, icon } = omitted

  const renderStatusIcon = () => {
    if (!showIcon) return null

    const statusIcon = icon ?? mapStatusIcon(type)

    return cloneElementWithOptions(statusIcon, {
      fallback: <span className={cssNames.statusIcon} style={cssAttrs.statusIcon}>{statusIcon}</span>,
      transform: original => ({
        className: cn(original.className, cssNames.statusIcon),
        style: { ...original.style, ...cssAttrs.statusIcon },
      }),
    })
  }

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

  return (
    <CssTransition
      classNames={`${ns}-motion`}
      unmountOnExit
      timeouts={{ appear: 0, enter: 0 }}
      when={visible}
      onExit={el => ({ height: el.getBoundingClientRect().height })}
      onExited={handleClosed}
      onExiting={() => ({ height: 0 })}
    >
      {($motion, getters) => (
        <div
          {...restAttrs}
          ref={combineRefs($motion, $element)}
          className={cn(cssNames.root, getters.names())}
          style={{ ...cssAttrs.root, ...getters.attrs() }}
        >
          {renderStatusIcon()}

          <div className={cssNames.content} style={cssAttrs.content}>
            <div className={cssNames.message} style={cssAttrs.message}>{message}</div>

            {isRenderable(description) && (
              <div className={cssNames.description} style={cssAttrs.description}>
                {description}
              </div>
            )}
          </div>

          {isRenderable(action) && (
            <div className={cssNames.action} style={cssAttrs.action}>
              {action}
            </div>
          )}

          {renderCloseIcon()}
        </div>
      )}
    </CssTransition>
  )
}

defineName(Alert)

export default Alert
