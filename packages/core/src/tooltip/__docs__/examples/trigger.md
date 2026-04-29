## zh-CN

通过 `trigger` 属性设置触发方式，支持 `hover`、`click`、`focus`、`contextMenu`，也可传入数组组合多种触发方式。

## en-US

Set the trigger mode with the `trigger` attribute. Supports `hover`, `click`, `focus`, `contextMenu`, or an array of them.

```tsx
import { Space, Tooltip } from '@mink-ui/core'

export default function App() {
  return (
    <Space>
      <Tooltip content="hover trigger" trigger="hover">
        <span>Hover me</span>
      </Tooltip>
      <Tooltip content="click trigger" trigger="click">
        <span>Click me</span>
      </Tooltip>
      <Tooltip content="focus trigger" trigger="focus">
        <input placeholder="Focus me" />
      </Tooltip>
      <Tooltip content="contextMenu trigger" trigger="contextMenu">
        <span>Right-click me</span>
      </Tooltip>
    </Space>
  )
}
```
