import useRenderRoutes from '@hooks/use-render-routes'
import routes from '@routes'
import { HashRouter, Routes } from 'react-router-dom'

export default function App() {
  const elements = useRenderRoutes(routes)

  return (
    <HashRouter>
      <Routes>
        {elements}
      </Routes>
    </HashRouter>
  )
}

// import type { FormInstance } from '@mink-ui/core'

// import { Button, Form, Space } from '@mink-ui/core'
// import kv from '@mink-ui/emator'
// import { useState } from 'react'

// function SimpleInput(props: any) {
//   return (
//     <input
//       {...props}
//       value={props.value ?? ''}
//       style={{ width: '100%', height: 32 }}
//     />
//   )
// }

// export default function Index() {
//   const [visible, setVisible] = useState(true)
//   const form = Form.useForm()

//   return (
//     <div style={{ width: 600, margin: '40px auto' }}>
//       <Space style={{ marginBottom: 12 }}>
//         <Button onClick={() => setVisible(!visible)}>
//           {visible ? '隐藏' : '显示'}
//         </Button>
//         {' '}
//         <Button onClick={() => form.resetFields()}>
//           resetFields
//         </Button>
//         <Button
//           onClick={() => {
//             const s = performance.now()
//             const values = form.getFieldsValue()
//             const e = performance.now()
//             console.log('diff:ms', e - s, values)
//           }}
//         >
//           getValues
//         </Button>
//       </Space>
//       {visible && <FormDisplay form={form} />}
//     </div>
//   )
// }

// function FormDisplay(props: { form: FormInstance<any> }) {
//   const { form } = props

//   const nameRequired = kv.string().min(4).max(6).required('请输入姓名')

//   return (
//     <Form
//       form={form}
//       initialValues={{
//         list: [{ first: 'first name', last: 'last name' }],
//       }}
//     >
//       <Form.Item name="name" label="姓名" rule={nameRequired}>
//         <SimpleInput style={{ width: 400 }} />
//       </Form.Item>
//       <Form.List
//         name="list"
//         // initialValue={Array.from({ length: 1 }).map((_, index) => {
//         //   return { first: 'first name', last: 'last name' }
//         // })}
//       >
//         {(fields, helpers) => (
//           <>
//             {' '}
//             <Space style={{ marginBottom: 12 }}>
//               <Button
//                 onClick={() => {
//                   helpers.append()
//                 }}
//               >
//                 add
//               </Button>
//               <Button
//                 onClick={() => {
//                   helpers.remove(0)
//                 }}
//               >
//                 remove first
//               </Button>
//             </Space>
//             {fields.map((field, index) => (
//               <div key={field.key}>
//                 <Form.Item
//                   name={[field.name, 'first']}
//                   label={`姓名 ${index + 1}`}
//                   rule={nameRequired}
//                   initialValue="first name field"
//                 >
//                   <SimpleInput />
//                 </Form.Item>
//                 <Form.Item
//                   name={[field.name, 'last']}
//                   label={`姓名 ${index + 1}`}
//                   rule={nameRequired}
//                   initialValue="first name field"
//                 >
//                   <SimpleInput />
//                 </Form.Item>
//                 <Form.Item shouldUpdate>
//                   {({ getFieldValue }) => {
//                     return getFieldValue(['list', field.name, 'first'])
//                       === '123'
//                       ? (
//                           <Form.Item
//                             key="price"
//                             label={`price ${index + 1}`}
//                             name={[field.name, 'price']}
//                             preserve={false}
//                           >
//                             <SimpleInput placeholder="price" />
//                           </Form.Item>
//                         )
//                       : (
//                           <Form.Item
//                             key="other"
//                             label={`other ${index + 1}`}
//                             name={[field.name, 'other']}
//                             initialValue="other"
//                             preserve={false}
//                           >
//                             <SimpleInput placeholder="other" />
//                           </Form.Item>
//                         )
//                   }}
//                 </Form.Item>
//               </div>
//             ))}
//           </>
//         )}
//       </Form.List>
//     </Form>
//   )
// }
