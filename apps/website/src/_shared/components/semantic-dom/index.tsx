export default function SemanticDom(props: SemanticBlockProps) {
  const { element } = props

  return (
    <div>
      {element}
    </div>
  )
}

export interface SemanticBlockProps {
  element?: React.ReactNode
}
