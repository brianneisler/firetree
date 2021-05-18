import { List } from 'immutable'

import { NodeTypes } from '../../constants'
import { setupContext } from '../../context'
import tokenize from '../tokenize'

import parsePermissions from './parsePermissions'

describe('parsePermissions', () => {
  test('parses multiple permissions and returns expected values', async () => {
    const children = []
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: 'create,read,update,delete' })
    const result = parsePermissions({
      children,
      context,
      tokenList
    })

    const permissions = [
      {
        id: expect.any(String),
        name: 'create',
        tokenList: expect.any(List),
        type: NodeTypes.IDENTIFIER
      },
      {
        id: expect.any(String),
        name: 'read',
        tokenList: expect.any(List),
        type: NodeTypes.IDENTIFIER
      },
      {
        id: expect.any(String),
        name: 'update',
        tokenList: expect.any(List),
        type: NodeTypes.IDENTIFIER
      },
      {
        id: expect.any(String),
        name: 'delete',
        tokenList: expect.any(List),
        type: NodeTypes.IDENTIFIER
      }
    ]

    expect(result).toEqual({
      children: expect.any(Array),
      context,
      permissions,
      tokenList: List()
    })
  })
})
