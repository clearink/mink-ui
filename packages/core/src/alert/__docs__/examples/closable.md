## zh-CN

可关闭

## en-US

xxx en

```tsx
import { Alert, Space } from '@mink-ui/core'

function App() {
  return (
    <div>
      {['info', 'success', 'warning', 'error'].map(type => (
        <Alert
          key={type}
          message={`${type} Text`}
          type={type}
          showIcon
          closable
          style={{ marginBottom: 8 }}
        />
      ))}
    </div>
  )
}

export default App
```
