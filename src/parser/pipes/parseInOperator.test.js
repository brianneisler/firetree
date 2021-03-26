import { List } from 'immutable'

import { Keywords, NodeTypes } from '../../constants'
import { setupContext } from '../../context'
import tokenize from '../tokenize'

import parseInOperator from './parseInOperator'

describe('parseInOperator', () => {
  test('returns expected values', async () => {
    const children = []
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: 'in' })
    const result = await parseInOperator({ children, context, tokenList })

    const operator = {
      id: expect.any(String),
      name: Keywords.IN,
      tokenList,
      type: NodeTypes.OPERATOR
    }

    expect(result).toEqual({
      children: [operator],
      context,
      operator,
      tokenList: List()
    })
  })
})
