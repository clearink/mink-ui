import type { OverlayProps } from './overlay.props'

import { shallowMerge } from '@mink-ui/shared/object/shallow-merge'

import { cn } from '../../../libs/cn'
import { defineName } from '../../../utils/define-name'
import Portal from '../../portal/src'
import { CssTransition } from '../../transition/src'
import { useOverlayProps } from './hooks/use-overlay-props'

function Overlay(props: OverlayProps) {
  const {
    picked,
    omitted,
    $portal,
    cssNames,
    cssAttrs,
  } = useOverlayProps(props)

  const { mask, mountOnEnter, unmountOnExit } = picked
  const { children, isOpen, transitions, getContainer } = omitted

  return (
    <CssTransition
      classNames={transitions.content}
      appear
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      when={isOpen}
    >
      {($content, getters) => (
        <Portal ref={$portal} getContainer={getContainer}>
          <div
            className={cssNames.root}
            style={shallowMerge(cssAttrs.root || {}, { position: 'absolute' })}
          >
            {!!mask && (
              <CssTransition classNames={transitions.mask} appear when={isOpen}>
                {($mask, _mask) => (
                  <div ref={$mask} className={cn(cssNames.mask, _mask.names())} style={cssAttrs.mask} />
                )}
              </CssTransition>
            )}

            {children?.($content, getters)}
          </div>
        </Portal>
      )}
    </CssTransition>
  )
}

defineName(Overlay)

export default Overlay
