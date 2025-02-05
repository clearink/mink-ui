import { CssTransition } from '@mink-ui/core/_shared/components'
import { getPresetStatusIcon, semanticNames } from '@mink-ui/core/_shared/constants'
import { useClosableState, useExactState, usePrefixCls, useSemanticStyles } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName, cls, withDefaults, withFallbackCloneElement } from '@mink-ui/core/_shared/utils'
import { ConfigContext } from '@mink-ui/core/config-provider/_shared.context'
import { fallback, isNullish, omit } from '@mink-ui/shared'
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'

import type { AlertProps, AlertRef } from './props'

import useFormatClassNames from './hooks/use-format-class-names'

const excluded = [
  'action',
  'onClose',
  'onAfterClose',
  'banner',
  'closable',
  'closeIcon',
  'description',
  'icon',
  'message',
  'showIcon',
  'type',
  ...semanticNames,
] as const

function Alert(_props: AlertProps, ref: React.ForwardedRef<AlertRef>) {
  const props = withDefaults(_props, {
    showIcon: fallback(_props.showIcon, !!_props.banner),
    type: fallback(_props.type, _props.banner ? 'warning' : 'info'),
  })

  const { action, showIcon, icon, type, message, description, onClose, onAfterClose } = props

  const { alert: alertContext } = ConfigContext.useState()

  const instance = useRef<HTMLDivElement>(null)

  const prefixCls = usePrefixCls('alert')

  const classNames = useFormatClassNames(prefixCls, props, alertContext)

  const styles = useSemanticStyles(props, alertContext)

  const [visible, setVisible] = useExactState(true)

  useImperativeHandle(ref, () => ({
    get nativeElement() { return instance.current },
  }), [instance])

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    onClose && onClose(e)

    if (e.defaultPrevented) return

    setVisible(false)
  }

  const mergedStatusIcon = useMemo(() => {
    if (!showIcon) return null

    const statusIcon = fallback(icon, getPresetStatusIcon(type))

    return withFallbackCloneElement(statusIcon, {
      fallback: <span className={classNames.icon} style={styles.icon}>{statusIcon}</span>,
      props: _original => ({
        className: cls(_original.className, classNames.icon),
        style: { ..._original.style, ...styles.icon },
      }),
    })
  }, [classNames.icon, icon, showIcon, styles.icon, type])

  const [_, mergedCloseIcon] = useClosableState(props, alertContext, {
    closeIconRender: icon => (
      <button
        className={classNames.closeBtn}
        style={styles.closeBtn}
        tabIndex={0}
        type="button"
        onClick={handleClose}
      >
        {icon}
      </button>
    ),
  })

  const attrs = omit(props, excluded)

  return (
    <CssTransition
      unmountOnExit
      timeouts={{ appear: 0, enter: 0 }}
      classNames={`${prefixCls}-motion`}
      when={visible}
      onExit={(el) => {
        el.style.setProperty('height', `${el.offsetHeight}px`)
      }}
      onExiting={(el) => {
        el.style.setProperty('height', '0px')
      }}
      onExited={(el) => {
        el.style.removeProperty('height')
        onAfterClose?.()
      }}
    >
      <div ref={instance} className={classNames.root} style={styles.root} {...attrs}>
        {mergedStatusIcon}
        <div className={classNames.content} style={styles.content}>
          <div className={classNames.message} style={styles.message}>{message}</div>
          {!isNullish(description) && (
            <div className={classNames.description} style={styles.description}>
              {description}
            </div>
          )}
        </div>
        {!isNullish(action) && <div className={classNames.action} style={styles.action}>{action}</div>}
        {mergedCloseIcon}
      </div>
    </CssTransition>
  )
}

betterDisplayName(Alert)

export default forwardRef(Alert)
