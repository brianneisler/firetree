import { slice } from 'ramda'

import { NodeTypes, TokenTypes } from '../../constants'
import createIdentifier from '../pipes/createIdentifier'
import { getTokenListPosition } from '../util'

const Identifier = {
  identify: (context, node) => node,
  is: (value) => value.type === NodeTypes.IDENTIFIER,
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(`Expected identifier. Instead reached the end of the file.`)
    }
    if (nextToken.type !== TokenTypes.IDENTIFIER) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(context, tokenList)
      throw new Error(
        `Expected Identifier. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }

    return createIdentifier({
      tokenList: slice(0, 1, tokenList)
    })
  },
  test: (context, tokenList) => tokenList.get(0).type === TokenTypes.IDENTIFIER
}

export default Identifier
