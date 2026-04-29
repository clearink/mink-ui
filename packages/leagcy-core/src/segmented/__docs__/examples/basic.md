## zh-CN

基础用法

## en-US

基础用法

```tsx
import { Segmented } from '@mink-ui/core'

export default function App() {
  return (
    <Segmented
      options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
      onChange={(value) => {
        console.log(value)
      }}
    />
  )
}
```
