import { usePrefixCls } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName } from '@mink-ui/core/_shared/utils'

import type { BreadcrumbProps } from './props'

import useFormatClassNames from './hooks/use-format-class-names'

function Breadcrumb(props: BreadcrumbProps) {
  const prefixCls = usePrefixCls('breadcrumb')

  const classNames = useFormatClassNames(prefixCls, props)

  return <div className={classNames.root}>breadcrumb</div>
}

betterDisplayName(Breadcrumb)

export default Breadcrumb
