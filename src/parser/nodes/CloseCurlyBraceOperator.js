import { slice } from 'ramda'

import { NodeTypes, OperatorTypes, Operators, ParserTypes, TokenTypes } from '../../constants'
import createCloseCurlyBraceOperator from '../pipes/createCloseCurlyBraceOperator'
import { getTokenListPosition } from '../util'

const CloseCurlyBraceOperator = {
  identify: (context, node) => node,
  is: (value) =>
    value &&
    value.type === NodeTypes.OPERATOR &&
    value.operatorType === OperatorTypes.CLOSE_CURLY_BRACE,
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(
        `Expected operator '${Operators.CLOSE_CURLY_BRACE}'. Instead reached the end of the file.`
      )
    }
    if (nextToken.type !== TokenTypes.OPERATOR_CLOSE_CURLY_BRACE) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(context, tokenList)
      throw new Error(
        `Expected operator '${Operators.CLOSE_CURLY_BRACE}'. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return createCloseCurlyBraceOperator({
      tokenList: slice(0, 1, tokenList)
    })
  },
  test: (context, tokenList) => tokenList.get(0).type === TokenTypes.OPERATOR_CLOSE_CURLY_BRACE,
  type: ParserTypes.OPERATOR
}

export default CloseCurlyBraceOperator
