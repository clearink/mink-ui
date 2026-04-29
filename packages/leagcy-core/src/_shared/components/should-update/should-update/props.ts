import type { HasChildren } from '../../../types'

export interface ShouldUpdateProps extends HasChildren {
  when: (() => boolean) | boolean
}
