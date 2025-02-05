import type { HasChildren } from '../../../../_shared/types'

export interface ShouldUpdateProps extends HasChildren {
  when: (() => boolean) | boolean
}
