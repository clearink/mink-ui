## zh-CN

基本用法展示分段控制器。

## en-US

Basic usage of segmented control.

```tsx
import { Segmented } from '@mink-ui/core'

export default function App() {
  return (
    <Segmented
      defaultValue="daily"
      options={[
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'Yearly', value: 'yearly' },
        { label: 'All', value: 'all' },
        { label: 'Custom', value: 'custom' }
      ]}
      onChange={(value) => { console.log(value) }}
    />
  )
}
```
