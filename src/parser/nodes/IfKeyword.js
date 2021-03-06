import { slice } from 'ramda'

import { Keywords, NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import createIfKeyword from '../pipes/createIfKeyword'
import { getTokenListPosition } from '../util'

const IfKeyword = {
  identify: (context, node) => node,
  is: (value) => value && value.type === NodeTypes.KEYWORD && value.name === Keywords.IF,
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(`Expected keyword '${Keywords.IF}'. Instead reached the end of the file.`)
    }
    if (nextToken.type !== TokenTypes.KEYWORD_IF) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(context, tokenList)
      throw new Error(
        `Expected keyword '${Keywords.IF}'. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return createIfKeyword({
      tokenList: slice(0, 1, tokenList)
    })
  },
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_IF
  },
  type: ParserTypes.KEYWORD
}

export default IfKeyword
