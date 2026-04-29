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
          style={{ marginBottom: 8 }}
          closable
          showIcon
          message={`${type} Text`}
          type={type}
        />
      ))}
    </div>
  )
}

export default App
```
