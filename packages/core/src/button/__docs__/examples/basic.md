## zh-CN

按钮分为 主要按钮、次要按钮、虚线按钮、文本按钮和链接按钮五种。

## en-US

按钮分为 主要按钮、次要按钮、虚线按钮、文本按钮和链接按钮五种。en-US

```tsx
import { Button, Space } from '@mink-ui/core'

export default function App() {
  return (
    <Space>
      <Button variant="solid">Solid Button</Button>
      <Button>Outlined Button</Button>
      <Button variant="dashed">Dashed Button</Button>
      <Button variant="filled">Filled Button</Button>
      <Button variant="text">Text Button</Button>
      <Button variant="link">Link Button</Button>
    </Space>
  )
}
```
