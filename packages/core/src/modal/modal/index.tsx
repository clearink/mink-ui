import type { FocusTrapRef } from '@mink-ui/core/_shared/components'
import type { KeyboardEvent, SyntheticEvent } from 'react'

import { FocusTrap, Overlay } from '@mink-ui/core/_shared/components'
import { keyboard } from '@mink-ui/core/_shared/constants'
import { useClosableState, usePrefixCls, useSemanticStyles } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName, cls, withDefaults } from '@mink-ui/core/_shared/utils'
import Button from '@mink-ui/core/button'
import { ConfigContext } from '@mink-ui/core/config-provider/_shared.context'
import { fallback, isFunction, isNull, isNullish, pick } from '@mink-ui/shared'
import { useId, useRef } from 'react'

import type { ModalProps } from './props'

import useFormatClassNames from './hooks/use-format-class-names'
import useWrapperVisible from './hooks/use-wrapper-visible'
import { defaultModalProps } from './props'

const included = [
  'getContainer',
  'mask',
  'isOpen',
  'transitions',
  'keepMounted',
  'unmountOnExit',
  'zIndex',
] as const

function Modal(_props: ModalProps) {
  const props = withDefaults(_props, defaultModalProps)

  const { children, footer, modalRender, onCancel, onOk, isOpen, title, transitions = {} } = props

  const { modal: modalContext } = ConfigContext.useState()

  const [returnEarly, wrapperVisible, setWrapperVisible] = useWrapperVisible(isOpen)

  const $wrapper = useRef<HTMLDivElement | null>(null)

  const $trap = useRef<FocusTrapRef | null>(null)

  const ariaId = useId()

  const rootPrefixCls = usePrefixCls()

  const prefixCls = `${rootPrefixCls}-modal`

  const classNames = useFormatClassNames(prefixCls, props, modalContext)

  const styles = useSemanticStyles(props, modalContext)

  const [_, mergedCloseIcon] = useClosableState(props, modalContext, {
    closeIconRender: icon => (
      <button
        className={classNames.closeBtn}
        style={styles.closeBtn}
        aria-label="close"
        type="button"
        onClick={onCancel}
      >
        {icon}
      </button>
    ),
  })

  const onEscapeDown = !props.closeOnEscape
    ? undefined
    : (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key !== keyboard.esc) return

        e.stopPropagation()

        onCancel?.()
      }

  const onMaskClick
    = !props.maskClosable || !props.mask
      ? undefined
      : (e: SyntheticEvent) => {
          if (e.target && e.target === $wrapper.current) onCancel?.()
        }

  const onTrapExit = !props.returnFocus
    ? undefined
    : (node: Element | null) => {
        const el = node as HTMLElement | null

        if (el && isFunction(el.focus)) el.focus()
      }

  if (returnEarly) return null

  const contentNode = (
    <div className={classNames.main} style={styles.main}>
      {mergedCloseIcon}
      <div className={classNames.header} style={styles.header}>
        {!isNullish(title) && (
          <span className={`${prefixCls}__title`} id={ariaId}>
            {title}
          </span>
        )}
      </div>
      <div className={classNames.body} style={styles.body}>
        {children}
      </div>
      {!isNull(footer) && (
        <div className={classNames.footer} style={styles.footer}>
          <Button onClick={onCancel}>取消</Button>
          <Button variant="filled" onClick={onOk}>
            确定
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <Overlay
      {...pick(props, included)}
      classNames={{ mask: `${prefixCls}-mask` }}
      transitions={{
        content: fallback(transitions.content, `${rootPrefixCls}-zoom-in`),
        mask: fallback(transitions.mask, `${rootPrefixCls}-fade-in`),
      }}
      onEnter={() => {
        console.log(wrapperVisible)
        setWrapperVisible(true)
        $trap.current?.focus()
        // el.$set('transform-origin', `${300}px ${450}px`)
      }}
      onEntered={() => {
        // el.$remove('transform-origin')
      }}
      onExit={() => {
        // el.$set('transform-origin', `${300}px ${450}px`)
      }}
      onExited={() => {
        setWrapperVisible(false)
        // el.$remove('transform-origin')
      }}
    >
      {(motion, transitionClass) => (
        <div
          ref={$wrapper}
          tabIndex={-1}
          className={`${prefixCls}-wrapper`}
          style={{ display: wrapperVisible ? undefined : 'none' }}
          onClick={onMaskClick}
          onKeyDown={onEscapeDown}
        >
          <div
            ref={motion}
            className={cls(classNames.root, transitionClass)}
            style={styles.root}
            aria-labelledby={title ? ariaId : undefined}
            aria-modal="true"
            role="dialog"
          >
            <FocusTrap ref={$trap} active={isOpen} onExit={onTrapExit}>
              {isFunction(modalRender) ? modalRender(contentNode) : contentNode}
            </FocusTrap>
          </div>
        </div>
      )}
    </Overlay>
  )
}

betterDisplayName(Modal)

export default Modal
