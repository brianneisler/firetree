import { List } from 'immutable'

import { NodeTypes } from '../../constants'
import { setupContext } from '../../context'
import tokenize from '../tokenize'

import AllowStatement from './AllowStatement'

describe('AllowStatement', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => AllowStatement.parse(context, tokenList)).toThrow()
  })

  test('returns an AllowStatement from parse', async () => {
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: 'allow create: if true' })
    const result = AllowStatement.parse(context, tokenList)
    expect(result).toEqual({
      children: expect.any(Array),
      condition: {
        children: expect.any(Array),
        id: expect.any(String),
        test: {
          id: expect.any(String),
          name: 'true',
          tokenList: expect.any(List),
          type: NodeTypes.IDENTIFIER
        },
        type: NodeTypes.IF_STATEMENT
      },
      id: expect.any(String),
      permissions: [
        {
          id: expect.any(String),
          name: 'create',
          tokenList: expect.any(List),
          type: NodeTypes.IDENTIFIER
        }
      ],
      type: NodeTypes.ALLOW_STATEMENT
    })
  })

  test('test returns false for empty TokenList', () => {
    const context = setupContext({ logger: console })
    const tokenList = List([])
    expect(AllowStatement.test(context, tokenList)).toBe(false)
  })

  test('test returns true for "allow"', async () => {
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: 'allow' })
    expect(AllowStatement.test(context, tokenList)).toBe(true)
  })

  test('is returns true for AllowStatement node', async () => {
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: 'allow create: if true' })
    const allowStatement = AllowStatement.parse(context, tokenList)
    expect(AllowStatement.is(allowStatement)).toBe(true)
  })
})
