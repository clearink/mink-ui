import type { ComponentType } from 'react'
import type { SkeletonProps } from '@/_shared/components/skeleton'

import loadable from '@loadable/component'

import Skeleton from '@/_shared/components/skeleton'

function lazyLoad<Props>(
  loader: (props: Props) => Promise<{ default: ComponentType<Props> }>,
  loadingProps?: Partial<SkeletonProps>,
) {
  return loadable(
    loader as any,
    {
      fallback: <Skeleton {...loadingProps} />,
    },
  ) as unknown as ComponentType<Props>
}

export default lazyLoad
