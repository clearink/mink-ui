type Key = number | string | symbol
type Value = any
type Label = number | string | undefined
type ExtraAttrs = Record<string, any>

type ConstantItem =
  | readonly [Key, Value, Label, ExtraAttrs]
  | readonly [Key, Value, Label]
  | readonly [Key, Value]

type ConstantOption<T extends ConstantItem> = {
  key: T[0]
  label: T[2]
  value: T[1]
} & (T[3] extends undefined ? unknown : Partial<Record<Key, Exclude<T[3], T[3]>> & T[3]>)

type GenerateEnums<T extends readonly ConstantItem[]> = T extends readonly [infer I, ...infer U] ?
  U extends readonly ConstantItem[] ?
  GenerateEnums<U> & (I extends ConstantItem ? { [P in I[0]]: I[1] } & { [P in I[1]]: I[2] } : unknown)
    : unknown
  : unknown

export default class Constant<const T extends readonly ConstantItem[]> {
  options: ConstantOption<T[number]>[] = []

  // 用 key 去匹配 sequenceItem
  get: (key: T[number][0]) => ConstantOption<T[number]>;

  // 以后台返回的 value 去匹配 sequence
  // 也可以传递函数执行 options.find
  match(callback: (item: ConstantOption<T[number]>) => boolean): ConstantOption<T[number]> | undefined
  match(value: Value): ConstantOption<T[number]> | undefined
  match(value: Value, key: T[number][0]): ConstantOption<T[number]>
  match(): any {}

  // 以后台返回的 value 根据 key 检查是否匹配 用于判断
  when: (value: any, condition: T[number][0] | T[number][0][]) => boolean

  // 扩展某些属性
  extend: <R extends object>(fn: (instance: this) => R) => R & this

  // 将 key 映射成 value, value 映射成 label 方便前端使用
  enums = {} as GenerateEnums<T>

  constructor(public readonly sequences: T) {
    const k_map = new Map<T[number][0], ConstantOption<T[number]>>()

    const v_map = new Map<Value, ConstantOption<T[number]>>()

    sequences.forEach((sequence) => {
      const [key, value, label, extra] = sequence

      const item: any = { key, value, label, ...extra }

      this.options.push(item)

      // key => value
      Object.defineProperty(this.enums, key, { value })
      // value => label
      Object.defineProperty(this.enums, value, { value: label, enumerable: true })

      k_map.set(key, item)
      v_map.set(value, item)
    })

    this.get = (key): any => k_map.get(key) || {}

    this.extend = fn => Object.assign(this, fn(this))

    this.match = ((value: any, key: T[number][0]) => {
      if (typeof value === 'function') return this.options.find(value)

      const matched = v_map.get(value)

      return key === undefined ? matched : matched || this.get(key)
    }) as any

    this.when = (value, condition) => {
      const keys = Array.isArray(condition) ? condition : [condition]

      return keys.some(key => this.get(key).value === value)
    }
  }
}
