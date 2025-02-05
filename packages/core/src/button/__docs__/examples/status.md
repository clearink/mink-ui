## zh-CN

按钮分为：`danger`、`info`、`primary`、`success`、`warning` 五种状态。

## en-US

按钮分为：`danger`、`info`、`primary`、`success`、`warning` 五种状态。

```tsx
import { Button, Space } from '@mink-ui/core'

export default function App() {
  return (
    <>
      {['filled', 'dashed', 'link', 'outlined', 'text'].map(variant => (
        <div key={variant} style={{ marginBottom: 16 }}>
          <Space wrap>
            {['danger', 'info', 'primary', 'success', 'warning'].map(theme => (
              <Button key={theme} variant={variant} theme={theme}>
                {theme}
              </Button>
            ))}
          </Space>
        </div>
      ))}
    </>
  )
}
```
