import { resolve as pathResolve } from 'path'

import { readFile } from 'fs-extra'

import { generate, parse, setupContext } from '../src'

describe('litmus', () => {
  test('large rules file from moltres project', async () => {
    const context = setupContext({
      logger: console
    })
    const string = await readFile(
      pathResolve(__dirname, 'files', 'firestore.litmus.rules'),
      'utf-8'
    )

    const ast = await parse(context, {
      filePath: pathResolve(__dirname, 'files', 'firestore.litmus.rules')
    })
    const result = await generate(context, { ast })
    expect(result).toEqual(string)
  })
})
