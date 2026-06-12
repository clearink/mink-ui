## zh-CN

按钮分为：`small`、`middle`、`large` 三种尺寸。

## en-US

按钮分为：`small`、`middle`、`large` 三种尺寸。

```tsx
import { Button, Space } from '@mink-ui/core'

export default function App() {
  return (
    <Space>
      <Button size="small" variant="solid">small</Button>
      <Button variant="solid">middle</Button>
      <Button size="large" variant="solid">large</Button>
    </Space>
  )
}
```
