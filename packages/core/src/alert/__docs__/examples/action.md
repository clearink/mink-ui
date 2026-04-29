## zh-CN

通过 `action` 可以自定义右上角操作项。

## en-US

通过 `action` 可以自定义右上角操作项。

```tsx
import { Alert, Button, Space } from '@mink-ui/core'

function App() {
  return (
    <div>
      {['info', 'success', 'warning', 'error'].map(type => (
        <Alert
          key={type}
          style={{ marginBottom: 8 }}
          closable
          showIcon
          action={<Button size="small" variant="filled">action</Button>}
          message={`${type} Text`}
          type={type}
        />
      ))}
    </div>
  )
}

export default App
```
