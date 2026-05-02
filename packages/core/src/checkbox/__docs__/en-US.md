---
category: component-en
path: checkbox
title: Checkbox
subtitle: Checkbox
desc: Checkbox component.
group:
  title: Data Entry
  order: 0
---

## When to use

- Used for selecting multiple values from several options.
- Used as a standalone toggle, similar to switch. The difference is that switch triggers a state change directly, while Checkbox is generally used for state marking and works with a submit action.

## Examples

<code-example src="./examples/basic.md" title="Basic Usage" />

## API

### Checkbox Props

<props-table src="./props/checkbox.json" />

## Semantic DOM

| Element | Description                      |
| ------- | -------------------------------- |
| `root`  | Root element, a `<label>`        |
| `input` | Native `<input type="checkbox">` |
| `inner` | Custom checkbox container        |

## FAQ

### How to implement select all?

Use the `indeterminate` property to indicate a partial selection state, combined with the `checked` property to control the select-all logic.
