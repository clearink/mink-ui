import { rawType } from '../object/raw-type'

export function isDate(obj: any): obj is Date {
  return rawType(obj) === 'Date'
}
