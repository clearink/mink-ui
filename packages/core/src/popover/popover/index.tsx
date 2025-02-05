import { usePrefixCls, useSemanticStyles } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName } from '@mink-ui/core/_shared/utils'
import Tooltip from '@mink-ui/core/tooltip'

import type { PopoverProps } from './props'

import useFormatClassNames from './hooks/use-format-class-names'

function Popover(props: PopoverProps) {
  const prefix = usePrefixCls()

  const prefixCls = `${prefix}-tooltip`

  const classNames = useFormatClassNames(prefixCls, props)

  const styles = useSemanticStyles(props)

  return (
    <Tooltip
      {...props}
      classNames={classNames}
      styles={styles}
      content={(
        <>
          <div className={classNames.title}>title</div>
          <div className={classNames.content}>content</div>
        </>
      )}
    />
  )
}

betterDisplayName(Popover)

export default Popover
