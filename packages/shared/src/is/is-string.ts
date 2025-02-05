import { rawType } from '../object/raw-type'

export function isString(obj: any): obj is string {
  return rawType(obj) === 'String'
}
