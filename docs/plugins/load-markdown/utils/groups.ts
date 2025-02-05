import type { TokensList } from 'marked'

export default function groupTokens<T extends TokensList[number]>(
  tokens: TokensList,
  predicate: (token: TokensList[number], index: number) => token is T,
) {
  const heading = { type: 'heading', depth: 2, raw: '## ', text: '' } as T

  return tokens.reduce((result, token, index) => {
    if (predicate(token, index)) result.push([token, [] as TokensList])
    else result[result.length - 1][1].push(token)

    return result
  }, [[heading, []]] as [T, TokensList][])
}
