import type { Tokens, TokensList } from 'marked'

export function isHeadToken(token: TokensList[number]): token is Tokens.Heading {
  return token.type === 'heading' && token.depth <= 2
}

export function isCodeToken(token: TokensList[number]): token is Tokens.Code {
  return token.type === 'code'
}

export function isJsxToken(token: TokensList[number]): token is Tokens.Code {
  return isCodeToken(token) && ['jsx', 'tsx'].includes(token.lang)
}

export function isCssToken(token: TokensList[number]): token is Tokens.Code {
  return isCodeToken(token) && ['css', 'sass', 'scss'].includes(token.lang)
}
