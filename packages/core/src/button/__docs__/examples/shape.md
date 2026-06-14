## zh-CN

Button 有多种形状, `default` - 长方形**(默认)**, `circle` - 圆形, `round` - 圆角

## en-US

Button 有多种形状, `default` - 长方形**(默认)**, `circle` - 圆形, `round` - 圆角

```tsx
import { Button, Space } from '@mink-ui/core'

export default function App() {
  return (
    <Space>
      <Button theme="primary" variant="solid">Button</Button>
      <Button shape="circle" theme="primary" variant="solid">Btn</Button>
      <Button shape="round" theme="primary" variant="solid">Button</Button>
    </Space>
  )
}
```
