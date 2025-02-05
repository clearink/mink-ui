## zh-CN

禁用

## en-US

禁用

```tsx
import { Checkbox } from '@mink-ui/core'

export default function App() {
  return (
    <Checkbox
      disabled
      onChange={(checked) => {
        console.log(`checked = ${checked}`)
      }}
    >
      Checkbox
    </Checkbox>
  )
}
```
