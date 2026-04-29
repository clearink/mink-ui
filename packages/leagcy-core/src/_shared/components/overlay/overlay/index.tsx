import type { ForwardedRef } from 'react'
import type { OverlayProps, OverlayRef } from './props'

import { forwardRef } from 'react'

import { useSemanticStyles, useZIndex } from '../../../hooks'
import { betterDisplayName, cls, withDefaults } from '../../../utils'
import Portal from '../../portal'
import { CssTransition } from '../../transition'
import useOverlay from './hooks/use-overlay'
import { defaultOverlayProps } from './props'

function Overlay(_props: OverlayProps, ref: ForwardedRef<OverlayRef>) {
  const props = withDefaults(_props, defaultOverlayProps)

  const {
    isOpen,
    keepMounted,
    getContainer,
    unmountOnExit,
    className,
    children,
    mask,
    zIndex,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    classNames = {},
    transitions = {},
  } = props

  const styles = useSemanticStyles(props)

  const {
    returnEarly: returnEarly1,
    $content,
    isMounted,
    setIsMounted,
  } = useOverlay(props)

  const [returnEarly2, zLevel] = useZIndex(isMounted && !!isOpen, zIndex)

  // TODO: lock scroll

  if (returnEarly1 || returnEarly2 || !isMounted) return null

  return (
    <Portal ref={ref} getContainer={getContainer}>
      <div
        className={cls(className, classNames.root)}
        style={withDefaults(styles.root || {}, { position: 'absolute', zIndex: zLevel })}
      >
        {!!mask && (
          <CssTransition classNames={transitions.mask} appear when={isOpen}>
            <div className={classNames.mask} style={styles.mask} aria-hidden="true" />
          </CssTransition>
        )}
        <CssTransition
          ref={$content}
          classNames={transitions.content}
          appear
          when={isOpen}
          onEnter={(el, appearing) => {
            onEnter?.(el, appearing)
            setIsMounted(true)
          }}
          onEntered={onEntered}
          onEntering={onEntering}
          onExit={onExit}
          onExited={(el) => {
            onExited?.(el)
            setIsMounted(!(unmountOnExit && !keepMounted))
          }}
          onExiting={onExiting}
        >
          {children}
        </CssTransition>
      </div>
    </Portal>
  )
}

betterDisplayName(Overlay)

export default forwardRef(Overlay)
