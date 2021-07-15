import { pipe } from 'ramda'

import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import createAllowStatement from '../pipes/createAllowStatement'
import expectAllowKeyword from '../pipes/expectAllowKeyword'
import expectColonOperator from '../pipes/expectColonOperator'
import identifyCondition from '../pipes/identifyCondition'
import identifyPermissions from '../pipes/identifyPermissions'
import parseAllowKeyword from '../pipes/parseAllowKeyword'
import parseColonOperator from '../pipes/parseColonOperator'
import parseCondition from '../pipes/parseCondition'
import parsePermissions from '../pipes/parsePermissions'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import skipWhitespaceAndComments from '../pipes/skipWhitespaceAndComments'

const parseAllowStatementTokens = pipe(
  parseAllowKeyword,
  parseWhitespaceAndComments,
  parsePermissions,
  parseWhitespaceAndComments,
  parseColonOperator,
  parseWhitespaceAndComments,
  parseCondition,
  createAllowStatement
)

const identifyAllowStatementChildren = pipe(
  expectAllowKeyword,
  skipWhitespaceAndComments,
  identifyPermissions,
  skipWhitespaceAndComments,
  expectColonOperator,
  skipWhitespaceAndComments,
  identifyCondition
)

const AllowStatement = {
  identify: (context, node) =>
    createAllowStatement({
      ...identifyAllowStatementChildren({ ...node, context }),
      children: node.children
    }),
  is: (value) => value && value.type === NodeTypes.ALLOW_STATEMENT,
  parse: (context, tokenList) => parseAllowStatementTokens({ children: [], context, tokenList }),
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return !!(firstToken && firstToken.type === TokenTypes.KEYWORD_ALLOW)
  },
  type: ParserTypes.STATEMENT
}

export default AllowStatement
