import { List } from 'immutable'

import { setupContext } from '../../context'
import tokenize from '../tokenize'

import SemicolonOperator from './SemicolonOperator'

describe('SemicolonOperator', () => {
  test('parse throws execption when tokenList is empty', () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => SemicolonOperator.parse(context, tokenList)).toThrow()
  })

  test('test returns false for empty TokenList', () => {
    const context = setupContext({ logger: console })
    const tokenList = List([])
    expect(SemicolonOperator.test(context, tokenList)).toBe(false)
  })

  test('test returns true for ";"', async () => {
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: ';' })
    expect(SemicolonOperator.test(context, tokenList)).toBe(true)
  })

  test('is returns true for SemicolonOperator node', async () => {
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: ';' })
    const semicolonOperator = SemicolonOperator.parse(context, tokenList)
    expect(SemicolonOperator.is(semicolonOperator)).toBe(true)
  })
})
