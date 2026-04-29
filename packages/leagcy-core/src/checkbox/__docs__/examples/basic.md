## zh-CN

基本用法

## en-US

基本用法

```tsx
import { Checkbox } from '@mink-ui/core'

export default function App() {
  return (
    <Checkbox
      onChange={(checked) => {
        console.log(`checked = ${checked}`)
      }}
    >
      Checkbox
    </Checkbox>
  )
}
```
