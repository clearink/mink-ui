import { rawType } from '@mink-ui/shared/object/raw-type'

export function jsxId(key: any) {
  return `${key}[${rawType(key)}]`
}
