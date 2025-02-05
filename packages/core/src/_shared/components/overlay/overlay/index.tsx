import { useSemanticStyles, useZIndex } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName, cls, withDefaults } from '@mink-ui/core/_shared/utils'
import { type ForwardedRef, forwardRef } from 'react'

import type { OverlayProps, OverlayRef } from './props'

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
          <CssTransition appear classNames={transitions.mask} when={isOpen}>
            <div className={classNames.mask} style={styles.mask} aria-hidden="true" />
          </CssTransition>
        )}
        <CssTransition
          ref={$content}
          appear
          classNames={transitions.content}
          when={isOpen}
          onEnter={(el, appearing) => {
            onEnter?.(el, appearing)
            setIsMounted(true)
          }}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={onExit}
          onExiting={onExiting}
          onExited={(el) => {
            onExited?.(el)
            setIsMounted(!(unmountOnExit && !keepMounted))
          }}
        >
          {children}
        </CssTransition>
      </div>
    </Portal>
  )
}

betterDisplayName(Overlay)

export default forwardRef(Overlay)
