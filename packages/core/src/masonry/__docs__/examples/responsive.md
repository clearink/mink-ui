## zh-CN

使用响应式参数来适配不同屏幕宽度。columns 可以设置在不同断点下的列数，gutter 可以设置不同断点下的间距大小。

## en-US

使用响应式参数来适配不同屏幕宽度。columns 可以设置在不同断点下的列数，gutter 可以设置不同断点下的间距大小。

```tsx
import { Masonry } from '@mink-ui/core'

const heights = [
  120,
  55,
  85,
  160,
  95,
  140,
  75,
  110,
  65,
  130,
  90,
  145,
  55,
  100,
  80
].map((height, index) => ({
  key: `item-${index}`,
  data: { height, index },
}))

export default function App() {
  return (
    <Masonry
      columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      gutter={{ xs: 8, sm: 12, md: 16 }}
      items={heights}
      slots={{
        item: (_, { data }) => {
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
