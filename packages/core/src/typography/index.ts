import TypographyLink from './typography-link'
import TypographyParagraph from './typography-paragraph'
import TypographyText from './typography-text'
import TypographyTitle from './typography-title'

// CompoundTypography
const Typography = {
  Text: TypographyText,
  Link: TypographyLink,
  Paragraph: TypographyParagraph,
  Title: TypographyTitle,
}

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                    export definition                    |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export type { TypographyTextProps } from './typography-text/props'

export { Typography }
export default Typography
