## zh-CN

展示瀑布流动态更新的效果，配合 item.column 固化位置。

## en-US

展示瀑布流动态更新的效果，配合 item.column 固化位置。

```tsx
import { useState } from 'react'
import { Button, Masonry, } from '@mink-ui/core'
import CloseOutlined from '@mink-ui/icons/CloseOutlined'

const heights = [150, 50, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 70, 50, 80]

export default function App() {
  const [items, setItems] = useState<ItemType[]>(() =>
    heights.map((height, index) => ({
      key: index,
      column: index % 4,
      data: height,
    })),
  )

  const removeItem = (removeKey: React.Key) => {
    setItems(prevItems => prevItems.filter(({ key }) => key !== removeKey))
  }

  const addItem = () => {
    setItems(prevItems => [
      ...prevItems,
      {
        key: prevItems.length ? prevItems[prevItems.length - 1].key + 1 : 0,
        data: Math.floor(Math.random() * 100) + 50,
      },
    ])
  }

  return (
    <div>
      <Masonry
        columns={4}
        gutter={16}
        items={items}
        slots={{
          item: (_, { data, key }) => {
            return (
              <div className="card" style={{ height: data }}>
                {Number(key) + 1}
                <Button
                  className="close-btn"
                  icon={<CloseOutlined />}
                  size="small"
                  theme="info"
                  onClick={() => removeItem(key)}
                />
              </div>
            )
          }
        }}
        onLayoutChange={(sortedItems) => {
          setItems(prevItems =>
            prevItems.map((item) => {
              const matchItem = sortedItems.find(sortedItem => sortedItem.key === item.key)
              return matchItem
                ? {
                    ...item,
                    column: matchItem.column,
                  }
                : item
            }),
          )
        }}
      />
      <Button style={{ marginTop: 16 }} block onClick={addItem}>
        Add Item
      </Button>
    </div>
  )
}
```

```scss
.card {
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 16px;
}
.close-btn {
  position: absolute;
  right: 8px;
  top: 8px;
}
```
