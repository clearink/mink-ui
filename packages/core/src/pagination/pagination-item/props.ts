import type { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react'

export type ItemRenderHandler = (
  page: number,
  type: 'next' | 'page' | 'prev',
  element: ReactNode,
) => ReactNode

export type TotalRenderHandler = (total: number, range: [number, number]) => ReactNode

export interface PaginationItemProps {
  active: boolean
  className?: string
  disabled: boolean
  itemRender: ItemRenderHandler
  name: string
  onClick: MouseEventHandler
  onKeyPress: KeyboardEventHandler
  page: number
  prefix: string
  showHtmlTitle: boolean
}
