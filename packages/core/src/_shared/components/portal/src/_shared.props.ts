import type { RefObject } from 'react'
import type { MayBe } from '@mink-ui/shared/interface'

export type ContainerElement = DocumentFragment | Element | false

export type GetContainerElement<T extends ContainerElement = ContainerElement>
  = (() => MayBe<T>)
    | MayBe<T>
    | RefObject<MayBe<T>>
    | string
