## zh-CN

Button 有多种形状, `default` - 长方形**(默认)**, `circle` - 圆形, `round` - 圆角

## en-US

Button 有多种形状, `default` - 长方形**(默认)**, `circle` - 圆形, `round` - 圆角

```tsx
import { Button, Space } from '@mink-ui/core'

export default function App() {
  return (
    <Space>
      <Button variant="filled">Button</Button>
      <Button shape="circle" variant="filled">Btn</Button>
      <Button shape="round" variant="filled">Button</Button>
    </Space>
  )
}
```
