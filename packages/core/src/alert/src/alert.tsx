import type { AlertProps } from './alert.props'

import { isNullish } from '@mink-ui/shared/is/is-nullish'

import { CssTransition } from '../../_shared/components/transition/src'
import { cn } from '../../_shared/libs/cn'
import { cloneElementWithOptions } from '../../_shared/utils/children'
import { defineName } from '../../_shared/utils/define-name'
import { normalizeClosable } from '../../config-provider/src/utils/closable'
import { mapStatusIcon } from '../../config-provider/src/utils/status'
import { useAlertProps } from './hooks/use-alert-props'

function Alert(props: AlertProps) {
  const {
    picked,
    omitted,
    ns,
    cssNames,
    cssAttrs,
    globalConfig,
    visible,
    attrs,
    handleOnClose,
  } = useAlertProps(props)

  const { showIcon, type } = picked
  const { description, action, message, icon, closable, closeIcon, onClosed } = omitted

  const renderStatusIcon = () => {
    if (!showIcon) return null

    const statusIcon = icon ?? mapStatusIcon(type)

    return cloneElementWithOptions(statusIcon, {
      fallback: <span className={cssNames.icon} style={cssAttrs.icon}>{statusIcon}</span>,
      transform: original => ({
        className: cn(original.className, cssNames.icon),
        style: { ...original.style, ...cssAttrs.icon },
      }),
    })
  }

  const renderCloseIcon = () => {
    const { closeIcon: closeIconElement } = normalizeClosable({
      currentState: { closable, closeIcon },
      contextState: { closable: globalConfig.closable, closeIcon: globalConfig.closeIcon },
      defaultState: {
        closeIconRender: icon => (
          <button
            className={cssNames.closeBtn}
            style={cssAttrs.closeBtn}
            tabIndex={0}
            type="button"
            onClick={handleOnClose}
          >
            {icon}
          </button>
        ),
      },
    })

    return closeIconElement
  }

  return (
    <CssTransition
      classNames={`${ns}-motion`}
      unmountOnExit
      timeouts={{ appear: 0, enter: 0 }}
      when={visible}
      onExit={el => ({ height: el.getBoundingClientRect().height })}
      onExited={() => { onClosed?.() }}
      onExiting={() => ({ height: 0 })}
    >
      {($motion, getters) => (
        <div
          {...attrs}
          ref={$motion}
          className={cn(cssNames.root, getters.names())}
          style={{ ...cssAttrs.root, ...getters.attrs() }}
        >
          {renderStatusIcon()}

          <div className={cssNames.content} style={cssAttrs.content}>
            <div className={cssNames.message} style={cssAttrs.message}>{message}</div>
            {!isNullish(description) && (
              <div className={cssNames.description} style={cssAttrs.description}>
                {description}
              </div>
            )}
          </div>

          {!isNullish(action) && (
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
