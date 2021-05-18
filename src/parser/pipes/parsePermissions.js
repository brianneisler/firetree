import { append, pipe } from 'ramda'

import { TokenTypes } from '../../constants'

import parseCommaOperator from './parseCommaOperator'
import parsePermission from './parsePermission'
import parseWhitespaceAndComments from './parseWhitespaceAndComments'

const parsePermissionAndWhitespace = pipe(
  parseWhitespaceAndComments,
  parsePermission,
  parseWhitespaceAndComments
)

const parseCommaPermissionAndWhitespace = pipe(parseCommaOperator, parsePermissionAndWhitespace)

const parsePermissions = (props) => {
  let { children, context, tokenList } = props
  let permissions = []
  let first = true
  let nextToken = tokenList.get(0)
  while (
    tokenList.size > 0 &&
    ((first && nextToken.type === TokenTypes.IDENTIFIER) ||
      (!first && nextToken.type === TokenTypes.OPERATOR_COMMA))
  ) {
    let permission
    if (first) {
      first = false
      ;({ children, context, permission, tokenList } = parsePermissionAndWhitespace({
        children,
        context,
        tokenList
      }))
    } else {
      ;({ children, context, permission, tokenList } = parseCommaPermissionAndWhitespace({
        children,
        context,
        tokenList
      }))
    }
    permissions = append(permission, permissions)
    nextToken = tokenList.get(0)
  }
  return { ...props, children, context, permissions, tokenList }
}

export default parsePermissions
