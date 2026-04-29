## zh-CN

分隔线默认为 `solid`（实线）变体。您可以将其更改为 `dashed`（虚线）或 `dotted`（点线）。

## en-US

分隔线默认为 `solid`（实线）变体。您可以将其更改为 `dashed`（虚线）或 `dotted`（点线）。en-US

```tsx
import { Divider } from '@mink-ui/core'

export default function App() {
  return (
    <>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
        probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <Divider>Solid</Divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
        probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <Divider variant="dotted">
        Dotted
      </Divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
        probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <Divider variant="dashed">
        Dashed
      </Divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
        probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
    </>
  )
}
```

```scss
.mink-divider {
  &::before,
  &::after {
    border-top-color: #7cb305;
  }
}
```
