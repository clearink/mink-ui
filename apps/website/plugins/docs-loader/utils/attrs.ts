/**
 * @description 格式化 jsx-like 属性
 */
export default function parseAttrs(input: string) {
  const re = /(\w+)(?:=(['"])(.*?)\2)?/g

  const result: Record<string, string> = {}

  while (true) {
    const match = re.exec(input)

    if (!match) break

    const [, name, , value] = match
    result[name] = value || 'true'
  }

  return result
}
