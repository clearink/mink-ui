---
category: component
path: checkbox
title: Checkbox
subtitle: 多选框
desc: 多选框组件。
group:
  title: 数据录入
  order: 0
---

## 何时使用

- 在一组可选项中进行多项选择时。
- 单独使用可以表示两种状态之间的切换，和 switch 类似，区别在于切换 switch 会直接触发状态改变，而 Checkbox 一般用于状态标记，需要配合提交操作。

## 代码演示

<code-example src="./examples/basic.md" title="基本用法" />

## API

### Checkbox Props

<props-table src="./props/checkbox.json" />

## Semantic DOM

| 元素    | 描述                           |
| ------- | ------------------------------ |
| `root`  | 组件根元素，即 `<label>`       |
| `input` | 原生 `<input type="checkbox">` |
| `inner` | 自定义勾选框容器               |

## FAQ

### 如何实现全选？

使用 `indeterminate` 属性来表示部分选中状态，配合 `checked` 属性来控制全选逻辑。
