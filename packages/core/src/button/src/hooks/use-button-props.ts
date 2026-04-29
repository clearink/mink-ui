import type { MouseEvent } from 'react'
import type { ButtonProps, OmittedButtonProps, PickedButtonProps } from '../button.props'

import { fallback } from '@mink-ui/shared/function/fallback'
import { omit } from '@mink-ui/shared/object/omit'

import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { DisabledContext, SizeContext } from '../../../config-provider/src/_shared.context'
import { ButtonGroupContext } from '../_shared.context'
import { defaultButtonProps as defaultProps, excludedButtonProps } from '../button.props'
import { useButtonClassNames } from '../hooks/use-class-names'

export function useButtonProps(props: ButtonProps) {
  const globalConfig = useConfiguration('button')
  const btnGroupContext = ButtonGroupContext.use()
  const disabledContext = DisabledContext.use()
  const sizeContext = SizeContext.use()

  const {
    loading,
    onClick,
    shape = fallback(globalConfig.shape, defaultProps.shape),
    theme = fallback(globalConfig.theme, defaultProps.theme),
    variant = fallback(globalConfig.variant, defaultProps.variant),
    size = fallback(sizeContext, defaultProps.size),
    disabled = fallback(props.disabled || btnGroupContext.disabled, disabledContext),
  } = props

  const omitted = props as OmittedButtonProps
  const picked: PickedButtonProps = { shape, size, theme, variant, disabled }

  const classNames = useButtonClassNames(picked, omitted)

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
    { picked, omitted },
  )

  const restAttrs = omit(props, excludedButtonProps)

  const handleOnClick = (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled || loading) event.preventDefault()
    else if (onClick) onClick(event)
  }

  return {
    picked,
    omitted,
    cssNames,
    cssAttrs,
    restAttrs,
    handleOnClick,
  }
}
