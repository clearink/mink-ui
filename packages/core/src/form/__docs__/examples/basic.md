## zh-CN

基础用法

## en-US

基础用法 en

```tsx
import { Form } from '@mink-ui/core'

function Input(props: Record<string, any>) {
  return <input {...props} style={{ height: 32 }} value={props.value || ''} />
}

export default function App() {
  return (
    <Form>
      <Form.Item
        required
        label="username"
        name="username"
        rule={{
          validate: async (value) => {
            if (!value || value == null) {
              return Promise.reject({
                issues: [
                  {
                    message: 'username is required',
                  },
                ]
              })
            }
            return Promise.resolve(value)
          }
        }}
      >
        <Input placeholder="username" />
      </Form.Item>
      <Form.Item
        required
        label="password"
        name="password"
        rule={{
          validate: async (value) => {
            if (!value || value == null) {
              return Promise.reject({
                issues: [
                  {
                    message: 'password is required',
                  },
                ]
              })
            }
            return Promise.resolve(value)
          }
        }}
      >
        <Input placeholder="password" type="password" />
      </Form.Item>
    </Form>
  )
}
```
