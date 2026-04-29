import type { CSSProperties } from 'react'
import type { AnyObj, MayBe } from '@mink-ui/shared/interface'

type SemanticsItem<T, U> = MayBe<T> | ((params: U) => MayBe<T>)

export type CssNamesItem<T extends string, U = AnyObj> = Partial<Record<T, SemanticsItem<string, U>>>

export type CssAttrsItem<T extends string, U = AnyObj> = Partial<Record<T, SemanticsItem<CSSProperties, U>>>

export interface SemanticsStyled<T extends string, U extends AnyObj = AnyObj> {
  /**
   * @description 样式前缀
   */
  prefixCls?: string

  /**
   * @description 类名
   */
  className?: string

  /**
   * @description 语义化 类名
   */
  classNames?: CssNamesItem<T, U>

  /**
   * @description 样式
   */
  style?: CSSProperties

  /**
   * @description 语义化 样式
   */
  styles?: CssAttrsItem<T, U>
}

export interface ComponentStyled<P> {
  /**
   * @description 类名
   */
  className?: P extends { className?: infer CssName } ? CssName : string

  /**
   * @description 语义化 类名
   */
  classNames?: P extends { classNames?: infer SemanticsCssName } ? SemanticsCssName : CssNamesItem<string>

  /**
   * @description 样式
   */
  style?: P extends { style?: infer CssAttrs } ? CssAttrs : CSSProperties

  /**
   * @description 语义化 样式
   */
  styles?: P extends { styles?: infer SemanticsCssAttrs } ? SemanticsCssAttrs : CssAttrsItem<string>
}

export type GetSemanticsValues<P, V> = P extends SemanticsStyled<infer T>
  ? Partial<Record<T, V>>
  : never
