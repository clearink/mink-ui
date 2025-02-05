---
category: component-en
title: Button
desc: 按钮是一种命令组件，可发起一个即时操作。
group:
  title: Basic
  order: 0
---

## 何时使用

随你

## 代码演示

<example src="./examples/basic.md" title="基本用法" />

<example src="./examples/icon.md" title="图标按钮" />

<example src="./examples/shape.md" title="按钮形状" />

<example src="./examples/size.md" title="按钮尺寸" />

<example src="./examples/status.md" title="按钮状态" />

<example src="./examples/disabled.md" title="禁用按钮" disabled />

<example src="./examples/block.md" title="长按钮" />

## API

### Button Props

| 属性     | 描述     | 类型                                    | 默认值    | 版本 |
| -------- | -------- | --------------------------------------- | --------- | ---- |
| block    | 块级格式 | boolean                                 |           |      |
| disabled | 禁用     | boolean                                 |           |      |
| ghost    | 幽灵按钮 | boolean                                 |           |      |
| icon     | 图标     | ReactNode                               |           |      |
| loading  | 加载中   | boolean\|`{delay:number}`               |           |      |
| shape    | 形状     | `circle`\|`default`\|`round`            | `default` |      |
| size     | 尺寸     | `large`\|`middle`\|`small`\|`undefined` | `middle`  |      |
| theme    | 主题     |                                         |           |      |
| variant  | 变体     |                                         |           |      |

### ButtonGroup Props

| 属性     | 描述            | 类型 | 默认值 | 版本 |
| -------- | --------------- | ---- | ------ | ---- |
| children | React.ReactNode |      |        |      |

## Semantic DOM

<semantic src="./examples/semantic.md" />

TODO

## FAQ

### Q1

xxx

### Q2

xxx
