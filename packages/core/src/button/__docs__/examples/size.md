## zh-CN

按钮分为：`small`、`middle`、`large` 三种尺寸。

## en-US

按钮分为：`small`、`middle`、`large` 三种尺寸。

```tsx
import { Button, Space } from '@mink-ui/core'

export default function App() {
  return (
    <Space>
      <Button size="small" variant="filled">small</Button>
      <Button variant="filled">middle</Button>
      <Button size="large" variant="filled">large</Button>
    </Space>
  )
}
```
