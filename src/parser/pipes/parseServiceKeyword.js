import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import ServiceKeyword from '../nodes/ServiceKeyword'

const parseServiceKeyword = ({ children, context, tokenList, ...rest }) => {
  const keyword = ServiceKeyword.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: keyword })
  return {
    ...rest,
    children: append(keyword, children),
    context,
    keyword,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseServiceKeyword
