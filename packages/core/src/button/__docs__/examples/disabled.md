## zh-CN

按钮被禁用。

## en-US

按钮被禁用。

```tsx
import { Button, Space } from '@mink-ui/core'

export default function App() {
  return (
    <>
      {['filled', 'dashed', 'link', 'outlined', 'text'].map(variant => (
        <div key={variant} style={{ marginBottom: 16 }}>
          <Space>
            {['danger', 'info', 'primary', 'success', 'warning'].map(theme => (
              <Button key={theme} variant={variant} theme={theme} disabled>
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
