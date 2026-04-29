import type { SemanticsStyled } from '../../../../_shared/types'

export interface TooltipArrowProps extends Pick<SemanticsStyled<''>, 'className' | 'style'> {
  /**
   * @description 是否展示
   */
  show: boolean
}
