## zh-CN

受控

## en-US

受控

```tsx
import { useState } from 'react'

import { Button, Checkbox } from '@mink-ui/core'

export default function App() {
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <Checkbox checked={checked}>
        Checkbox
      </Checkbox>
      <div style={{ marginTop: 24 }}>
        <Button variant="filled" onClick={() => { setChecked(!checked) }}>
          Check
        </Button>
      </div>
    </div>
  )
}
```
