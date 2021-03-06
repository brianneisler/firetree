import { slice } from 'ramda'

import { NodeTypes, OperatorTypes, Operators, ParserTypes, TokenTypes } from '../../constants'
import createEqualityOperator from '../pipes/createEqualityOperator'
import { getTokenListPosition } from '../util'

const EqualityOperator = {
  identify: (context, node) => node,
  is: (value) =>
    value && value.type === NodeTypes.OPERATOR && value.operatorType === OperatorTypes.EQUALITY,
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(
        `Expected operator '${Operators.EQUALITY}'. Instead reached the end of the file.`
      )
    }
    if (nextToken.type !== TokenTypes.OPERATOR_EQUALITY) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(context, tokenList)
      throw new Error(
        `Expected operator '${Operators.EQUALITY}'. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return createEqualityOperator({
      tokenList: slice(0, 1, tokenList)
    })
  },
  test: (context, tokenList) => tokenList.get(0).type === TokenTypes.OPERATOR_EQUALITY,
  type: ParserTypes.OPERATOR
}

export default EqualityOperator
