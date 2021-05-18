import { append, head, length, pipe } from 'ramda'

import CommaOperator from '../nodes/CommaOperator'
import Identifier from '../nodes/Identifier'

import expectCommaOperator from './expectCommaOperator'
import identifyPermission from './identifyPermission'
import skipWhitespaceAndComments from './skipWhitespaceAndComments'

const identifyPermissionAndWhitespace = pipe(
  skipWhitespaceAndComments,
  identifyPermission,
  skipWhitespaceAndComments
)

const identifyCommaPermissionAndWhitespace = pipe(
  expectCommaOperator,
  identifyPermissionAndWhitespace
)

const identifyPermissions = (props) => {
  let { children, context } = props
  let permissions = []
  let first = true
  let nextChild = head(children)
  while (
    length(children) > 0 &&
    ((first && Identifier.is(nextChild)) || (!first && CommaOperator.is(nextChild)))
  ) {
    let permission
    if (first) {
      first = false
      ;({ children, context, permission } = identifyPermissionAndWhitespace({
        children,
        context
      }))
    } else {
      ;({ children, context, permission } = identifyCommaPermissionAndWhitespace({
        children,
        context
      }))
    }
    permissions = append(permission, permissions)
    nextChild = head(children)
  }
  return { ...props, children, context, permissions }
}

export default identifyPermissions
