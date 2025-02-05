import { usePrefixCls } from '@mink-ui/core/_shared/hooks'
import { omit } from '@mink-ui/shared'

import type { CheckboxGroupProps } from './props'

import useFormatClassNames from './hooks/use-format-class-names'

const excluded = ['children'] as const

function CheckboxGroup(props: CheckboxGroupProps) {
  const { children } = props

  const prefixCls = usePrefixCls('checkbox-group')

  const classNames = useFormatClassNames(prefixCls, props)

  const attrs = omit(props, excluded)

  return (
    <div {...attrs} className={classNames.root}>
      <input type="checkbox" />
      <span>{children}</span>
    </div>
  )
}

export default CheckboxGroup
