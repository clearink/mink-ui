## zh-CN

按钮被禁用。

## en-US

按钮被禁用。

```tsx
import { Button, Space } from '@mink-ui/core'

function capitalize<T extends string>(str: T) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}` as Capitalize<T>
}

export default function App() {
  return (
    <>
      {['solid', 'outlined', 'dashed', 'filled', 'text', 'link'].map(variant => (
        <div key={variant} style={{ marginBottom: 16 }}>
          <Space styles={{ item: { minWidth: 120, textAlign: 'center' } }} wrap>
            {['primary', 'success', 'warning', 'danger', 'info'].map(theme => (
              <Button key={theme} disabled theme={theme} variant={variant}>
                {capitalize(variant)}
              </Button>
            ))}
          </Space>
        </div>
      ))}
    </>
  )
}
```
