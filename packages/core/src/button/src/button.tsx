import type { RefCallback } from 'react'
import type { ButtonProps } from './button.props'

import LoadingOutlined from '@mink-ui/icons/LoadingOutlined'
import { fallback } from '@mink-ui/shared/function/fallback'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'

import ShouldUpdate from '../../_shared/components/should-update/src'
import { CssTransition } from '../../_shared/components/transition/src'
import { cn } from '../../_shared/libs/cn'
import { defineName } from '../../_shared/utils/define-name'
import { isRenderable } from '../../_shared/utils/renderable'
import TouchEffect from '../../touch-effect/src'
import { useButtonProps } from './hooks/use-button-props'
import { isBorderedVariant } from './utils/helpers'

function Button(props: ButtonProps) {
  const {
    picked,
    omitted,
    rns,
    ns,
    cssNames,
    cssAttrs,
    ctrl,
    isLoading,
    loadingOptions,
    restAttrs,
    handleClick,
  } = useButtonProps(props)

  const { variant, disabled } = picked
  const { ref, children, icon, href } = omitted

  const renderIcon = () => {
    const loadingIcon = fallback(loadingOptions.icon, <LoadingOutlined className={`${rns}-spin`} />)

    if (isRenderable(icon)) {
      return (
        <span className={cssNames.icon} style={cssAttrs.icon}>
          {isLoading ? loadingIcon : icon}
        </span>
      )
    }

    return (
      <CssTransition
        classNames={`${ns}-icon-motion`}
        skipBeginning
        unmountOnExit
        when={isLoading}
        onEnter={() => ({ width: 0 })}
        onEntering={ctrl.measure}
        onExit={el => ({ width: el.clientWidth })}
        onExited={ctrl.reset}
        onExiting={() => ({ width: 0 })}
      >
        {($motion, getters) => (
          <span
            ref={$motion}
            className={cn(getters.names(), `${ns}__loading`)}
            style={getters.attrs()}
          >
            <ShouldUpdate when={() => isLoading}>
              <span className={cssNames.icon} style={cssAttrs.icon}>
                {loadingIcon}
              </span>
            </ShouldUpdate>
          </span>
        )}
      </CssTransition>
    )
  }

  const renderElement = () => {
    const isAnchor = variant === 'link' && !isUndefined(href)

    const JsxTag = isAnchor ? 'a' : 'button'

    const extraAttrs = isAnchor
      ? { 'href': disabled ? undefined : href, 'aria-disabled': disabled, 'tabIndex': disabled ? -1 : 0 }
      : { disabled }

    return (
      <JsxTag
        {...restAttrs}
        {...extraAttrs}
        ref={ref as RefCallback<HTMLElement>}
        className={cssNames.root}
        style={cssAttrs.root}
        onClick={handleClick}
      >
        {renderIcon()}

        {isRenderable(children) && (
          <span className={cssNames.text} style={cssAttrs.text}>
            {children}
          </span>
        )}
      </JsxTag>
    )
  }

  if (!isBorderedVariant(variant)) return renderElement()

  return (
    <TouchEffect component="Button" disabled={isLoading}>
      {renderElement()}
    </TouchEffect>
  )
}

defineName(Button)

export default Button
