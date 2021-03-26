import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import InOperator from '../nodes/InOperator'

const parseInOperator = ({ children, context, tokenList, ...rest }) => {
  const operator = InOperator.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: operator })
  return {
    ...rest,
    children: append(operator, children),
    context,
    operator,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseInOperator
