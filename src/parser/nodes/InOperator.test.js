import { List } from 'immutable'

import { setupContext } from '../../context'

import InOperator from './InOperator'

describe('InOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => InOperator.parse(context, tokenList)).toThrow()
  })
})
