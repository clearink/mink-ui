import type { ButtonProps } from './button.props'

import { defineName } from '../../_shared/utils/define-name'
import TouchEffect from '../../touch-effect/src'
import { useButtonProps } from './hooks/use-button-props'
import { isBorderedVariant } from './utils/helpers'

function Button(props: ButtonProps) {
  const {
    picked,
    omitted,
    cssNames,
    cssAttrs,
    restAttrs,
    handleOnClick,
  } = useButtonProps(props)

  const { variant, disabled } = picked
  const { ref, children, loading } = omitted

  const element = (
    <button
      {...restAttrs}
      ref={ref}
      className={cssNames.root}
      style={cssAttrs.root}
      disabled={disabled}
      onClick={handleOnClick}
    >
      <span className={cssNames.text} style={cssAttrs.text}>
        {children}
      </span>
    </button>
  )

  if (!isBorderedVariant(variant)) return element

  return (
    <TouchEffect component="Button" disabled={!!loading}>
      {element}
    </TouchEffect>
  )
}

defineName(Button)

export default Button
