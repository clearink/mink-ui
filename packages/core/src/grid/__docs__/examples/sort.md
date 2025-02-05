## zh-CN

列排序。

通过使用 `push` 和 `pull` 类就可以很容易的改变列（column）的顺序。

## en-US

列排序。

通过使用 `push` 和 `pull` 类就可以很容易的改变列（column）的顺序。

```tsx
import { Col, Row } from '@mink-ui/core'

export default function App() {
  return (
    <Row>
      <Col span={18} push={6}>
        col-18 col-push-6
      </Col>
      <Col span={6} pull={18}>
        col-6 col-pull-18
      </Col>
    </Row>
  )
}
```

```scss
.mink-col {
  padding: var(--mink-unit-4) 0;
  background: var(--mink-color-blue-6);
  color: #fff;
  text-align: center;
}

.mink-row {
  margin-bottom: 16px;

  .mink-col:nth-child(2n + 1) {
    background: var(--mink-color-blue-4);
  }
}
```
