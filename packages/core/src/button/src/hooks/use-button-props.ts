import type { MouseEvent } from 'react'
import type { ButtonProps, OmittedButtonProps, PickedButtonProps } from '../button.props'

import { fallback } from '@mink-ui/shared/function/fallback'
import { omit } from '@mink-ui/shared/object/omit'

import { useConstant } from '../../../_shared/hooks/use-constant'
import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { DisabledContext, SizeContext } from '../../../config-provider/src/_shared.context'
import { ButtonGroupContext } from '../_shared.context'
import { defaultButtonProps as defaultProps, excludedButtonProps } from '../button.props'
import { useButtonClassNames } from '../hooks/use-class-names'
import { ButtonControl } from '../utils/button-control'
import { useButtonLoading } from './use-button-loading'

export function useButtonProps(props: ButtonProps) {
  const globalConfig = useConfiguration('button')
  const buttonGroupContext = ButtonGroupContext.use()
  const disabledContext = DisabledContext.use()
  const sizeContext = SizeContext.use()

  const {
    onClick,
    iconPlacement = defaultProps.iconPlacement,
    shape = fallback(globalConfig.shape, defaultProps.shape),
    theme = fallback(globalConfig.theme, defaultProps.theme),
    variant = fallback(globalConfig.variant, defaultProps.variant),
    size = fallback(sizeContext, defaultProps.size),
    disabled = fallback(props.disabled || buttonGroupContext.disabled, disabledContext),
  } = props

  const omitted = props as OmittedButtonProps
  const picked: PickedButtonProps = {
    shape,
    size,
    theme,
    variant,
    disabled,
    iconPlacement,
  }

  const ctrl = useConstant(() => new ButtonControl())

  const { isLoading, loadingOptions } = useButtonLoading(omitted)

  const { rns, ns, classNames } = useButtonClassNames(picked, omitted, { isLoading })

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      globalConfig.classNames,
      { root: globalConfig.className },
      classNames,
      omitted.classNames,
      { root: omitted.className },
    ],
    [
      globalConfig.styles,
      { root: globalConfig.style },
      omitted.styles,
      { root: omitted.style },
    ],
    { meta: { ...omitted, ...picked } },
  )

  const restAttrs = omit(props, excludedButtonProps)

  const handleClick = (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled || isLoading) event.preventDefault()
    else if (onClick) onClick(event as any)
  }

  return {
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
  }
}
