import type { TypographyTextProps } from './props'

import { betterDisplayName } from '../../_shared/utils'

function TypographyText(props: TypographyTextProps) {
  const { children } = props

  return <div>{children}</div>
}

betterDisplayName(TypographyText, 'Typography.Text')

export default TypographyText
