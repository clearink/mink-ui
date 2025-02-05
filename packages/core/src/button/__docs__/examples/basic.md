## zh-CN

按钮分为 主要按钮、次要按钮、虚线按钮、线形按钮和文本按钮五种。

## en-US

按钮分为 主要按钮、次要按钮、虚线按钮、线形按钮和文本按钮五种。 en-US

```tsx
import { Button, Space } from '@mink-ui/core'

export default function App() {
  return (
    <Space wrap>
      <Button variant="filled">Primary Button</Button>
      <Button>Default Button</Button>
      <Button variant="dashed">Dashed Button</Button>
      <Button variant="text">Text Button</Button>
    </Space>
  )
}
```
