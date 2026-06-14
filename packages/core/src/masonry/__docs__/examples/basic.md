## zh-CN

基本用法描述。

## en-US

Basic usage description.

```tsx
import { Masonry } from '@mink-ui/core'

const heights = [
  150,
  50,
  90,
  70,
  110,
  150,
  130,
  80,
  50,
  90,
  100,
  150,
  60,
  50,
  80,
].map((height, index) => ({
  key: `item-${index}`,
  data: { height, index },
}))

export default function App() {
  return (
    <Masonry
      columns={4}
      gutter={16}
      items={heights}
      slots={{
        item: (_, { data }) => {
          if (data.index === 4) {
            return (
              <div className="card no-padding">
                <img className="image" src="https://picsum.photos/450?auto=format" />
                <div className="text">
                  image description
                </div>
              </div>
            )
          }
          return (
            <div className="card" style={{ height: data.height }}>
              {data.index + 1}
            </div>
          )
        },
      }}
    />
  )
}
```

```scss
.card {
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 16px;
}

.no-padding {
  padding: 0;
}

.text {
  padding: 12px;
  text-align: center;
}

.image {
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
```
