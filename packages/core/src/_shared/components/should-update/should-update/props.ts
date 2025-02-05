import type { HasChildren } from '@mink-ui/core/_shared/types'

export interface ShouldUpdateProps extends HasChildren {
  when: (() => boolean) | boolean
}
