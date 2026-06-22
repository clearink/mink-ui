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
    $transition,
    cssNames,
    cssAttrs,
    transitionInherited,
  } = useOverlayProps(props)

  const { mask, mountOnEnter, unmountOnExit } = picked
  const { children, isOpen, transitions, getContainer } = omitted

  return (
    <Portal ref={$portal} getContainer={getContainer}>
      <CssTransition
        {...transitionInherited}
        ref={$transition}
        classNames={transitions?.content}
        appear
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        when={isOpen}
      >
        {($content, getters) => (
          <div
            className={cssNames.root}
            style={shallowMerge(cssAttrs.root || {}, { position: 'absolute' as const })}
          >
            {!!mask && (
              <CssTransition classNames={transitions?.mask} appear skipBeginning when={isOpen}>
                {($mask, _mask) => (
                  <div ref={$mask} className={cn(cssNames.mask, _mask.names())} style={cssAttrs.mask} />
                )}
              </CssTransition>
            )}

            {children?.($content, getters)}
          </div>
        )}
      </CssTransition>
    </Portal>
  )
}

defineName(Overlay)

export default Overlay
