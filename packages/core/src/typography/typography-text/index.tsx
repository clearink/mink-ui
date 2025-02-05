import { betterDisplayName } from '@mink-ui/core/_shared/utils'

import type { TypographyTextProps } from './props'

function TypographyText(props: TypographyTextProps) {
  const { children } = props

  return <div>{children}</div>
}

betterDisplayName(TypographyText, 'Typography.Text')

export default TypographyText
