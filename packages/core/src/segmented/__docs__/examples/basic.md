## zh-CN

基本用法展示分段控制器。

## en-US

Basic usage of segmented control.

```tsx
import { useRef, useState } from 'react'
import { Button, Segmented } from '@mink-ui/core'

export default function App() {
  const [value, setValue] = useState('daily')
  const t = useRef()
  return (
    <div>
      <Button onClick={() => {
        clearTimeout(t.current)
        setValue('weekly')

        t.current = setTimeout(() => {
          setValue('all')
        }, 300)
      }}
      >
        change
      </Button>
      <Segmented
        options={[
          { label: 'Daily', value: 'daily' },
          { label: 'Weekly', value: 'weekly' },
          { label: 'Monthly', value: 'monthly' },
          { label: 'Yearly', value: 'yearly' },
          { label: 'All', value: 'all' },
          { label: 'Custom', value: 'custom' }
        ]}
        value={value}
        onChange={(value) => { setValue(value) }}
      />
    </div>
  )
}
```
