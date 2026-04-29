import { isObject } from '@mink-ui/shared'

export function defaultGetValueFromEvent(valuePropName: string) {
  return (...events: any[]) => {
    const event = events[0]

    if (!event || !isObject(event.target)) return event

    if (!(valuePropName in event.target)) return event

    return (event.target as HTMLInputElement)[valuePropName]
  }
}

export function defaultGetValueProps(valuePropName: string) {
  return (value: any) => ({ [valuePropName]: value })
}
