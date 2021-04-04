import { List } from 'immutable'

import { NodeTypes } from '../constants'
import { setupContext } from '../context'
import { parseString } from '../parser'

import filterNodesInTree from './filterNodesInTree'

describe('filterNodesInTree', () => {
  test('should return filtered nodes', async () => {
    const code = 'a in b;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    const results = filterNodesInTree((node) => node.type === NodeTypes.IDENTIFIER, ast)

    expect(results).toEqual([
      {
        id: expect.any(String),
        name: 'a',
        tokenList: expect.any(List),
        type: NodeTypes.IDENTIFIER
      },
      {
        id: expect.any(String),
        name: 'b',
        tokenList: expect.any(List),
        type: NodeTypes.IDENTIFIER
      }
    ])
  })
})
