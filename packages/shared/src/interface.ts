// types
export type AnyFn<R = any> = (...args: any[]) => R
export type VoidFn = () => void
export type AnyObj = Record<string, any>
export type MayBe<T> = null | T | undefined
export type Nothing = Omit<object, keyof any>
export type LiteralUnion<T, U> = (Nothing & U) | T
export type NonUndefined<T> = T extends undefined ? never : T
export type Writable<T> = { -readonly [P in keyof T]: T[P] }
export type Full<T> = T extends Nothing ? { [K in keyof T]: T[K] } : T
