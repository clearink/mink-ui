import type { ReactElement } from 'react'
import type { InternalModalProps, ModalProps } from './modal.props'

import { fallback } from '@mink-ui/shared/function/fallback'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'

import FocusTrap from '../../_shared/components/focus-trap/src'
import Overlay from '../../_shared/components/overlay/src'
import ShouldUpdate from '../../_shared/components/should-update/src'
import { cn } from '../../_shared/libs/cn'
import { cloneElementWithOptions } from '../../_shared/utils/children'
import { defineName } from '../../_shared/utils/define-name'
import { isRenderable } from '../../_shared/utils/renderable'
import { mapStatusIcon } from '../../_shared/utils/status'
import { useInternalModalProps } from './hooks/use-modal-props'
import ModalFooter from './modal-footer'

function InternalModal(props: InternalModalProps) {
  const {
    omitted,
    rns,
    ns,
    cssNames,
    cssAttrs,
    ctrl,
    visible,
    renderSlots,
    focusableState,
    closeIconRender,
    returnEmpty,
    subscribe,
    handleOk,
    handleCancel,
    handleDismiss,
    handleEntered,
    handleExited,
    handleClick,
  } = useInternalModalProps(props)

  const {
    _isJsxModal,
    _showCancel,
    children,
    type,
    title,
    footer,
    mask,
    isOpen,
    fresh,
    zIndex,
    transitions,
    getContainer,
    mountOnEnter,
    unmountOnExit,
    confirmLoading,
    confirmText,
    confirmButtonProps,
    cancelText,
    cancelButtonProps,
  } = omitted

  const renderFocusTrap = (element: ReactElement) => {
    const { focusTrap, returnFocus } = focusableState || {}

    if (!focusTrap) return element

    return (
      <FocusTrap ref={ctrl.$trap} active={visible} returnFocus={returnFocus}>
        {element}
      </FocusTrap>
    )
  }

  const renderCloseIcon = () => {
    return closeIconRender((icon, disabled) => (
      <button
        className={cssNames.closeBtn}
        style={cssAttrs.closeBtn}
        disabled={disabled}
        tabIndex={0}
        type="button"
        onClick={handleDismiss}
      >
        {icon}
      </button>
    ))
  }

  const renderStatusIcon = () => {
    if (_isJsxModal) return null

    const statusIcon = mapStatusIcon(type, 'warning')

    return cloneElementWithOptions(statusIcon, {
      fallback: <span className={cssNames.statusIcon} style={cssAttrs.statusIcon}>{statusIcon}</span>,
      transform: original => ({
        className: cn(original.className, cssNames.statusIcon),
        style: { ...original.style, ...cssAttrs.statusIcon },
      }),
    })
  }

  if (returnEmpty) return null

  return (
    <Overlay
      classNames={{ mask: cssNames.mask }}
      styles={{ mask: cssAttrs.mask }}
      resumeOnCancel
      getContainer={getContainer}
      isOpen={isOpen}
      mask={mask}
      mountOnEnter={mountOnEnter}
      transitions={{
        mask: fallback(transitions?.mask, `${rns}-fade-in`),
        content: fallback(transitions?.content, `${rns}-zoom-in`),
      }}
      unmountOnExit={unmountOnExit}
      zIndex={zIndex}
      onEnter={el => ctrl.prepare(el)}
      onEntered={handleEntered}
      onEntering={() => ctrl.transform}
      onExit={() => ctrl.transform}
      onExited={handleExited}
      onExiting={() => ctrl.transform}
    >
      {($motion, getters) => {
        return (
          <div
            className={`${ns}-wrapper`}
            style={visible ? undefined : { display: 'none' }}
            tabIndex={-1}
            onClick={handleClick}
          >
            <div
              ref={$motion}
              className={cn(cssNames.root, getters.names())}
              style={{ ...cssAttrs.root, ...getters.attrs() }}
            >
              {renderSlots({
                name: 'main',
                children: renderFocusTrap(
                  <ShouldUpdate when={() => !!(isOpen || fresh)}>
                    <div className={cssNames.main} style={cssAttrs.main}>
                      {renderCloseIcon()}

                      {renderStatusIcon()}

                      {isRenderable(title) && (
                        <div className={cssNames.header} style={cssAttrs.header}>
                          <span className={cssNames.title} style={cssAttrs.title}>
                            {title}
                          </span>
                        </div>
                      )}

                      <div className={cssNames.body} style={cssAttrs.body}>
                        {children}
                      </div>

                      {isRenderable(footer, isUndefined) && (
                        <div className={cssNames.footer} style={cssAttrs.footer}>
                          <ModalFooter
                            _isJsxModal={_isJsxModal}
                            _showCancel={_showCancel}
                            cancelButtonProps={cancelButtonProps}
                            cancelText={cancelText}
                            confirmButtonProps={confirmButtonProps}
                            confirmLoading={confirmLoading}
                            confirmText={confirmText}
                            footer={footer}
                            subscribe={subscribe}
                            onCancel={handleCancel}
                            onOk={handleOk}
                          />
                        </div>
                      )}
                    </div>
                  </ShouldUpdate>,
                ),
              })}
            </div>
          </div>
        )
      }}
    </Overlay>
  )
}

function GeneratedApiModal(props: ModalProps) {
  return <InternalModal {...props} _isJsxModal={false} />
}

function GeneratedJsxModal(props: ModalProps) {
  return <InternalModal {...props} _isJsxModal={true} />
}

defineName(InternalModal)

export { GeneratedApiModal, GeneratedJsxModal }
