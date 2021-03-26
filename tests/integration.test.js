import { exec } from 'child_process'
import { resolve as pathResolve } from 'path'

import { readFile } from 'fs-extra'

import { generate, parse, setupContext } from '../src'

describe('integration', () => {
  test('should install globally', async () => {
    const result = await new Promise((resolve, reject) => {
      exec('npm i -g', { cwd: pathResolve(__dirname, '..') }, (error) => {
        if (error) {
          return reject(error)
        }
        return resolve(true)
      })
    })
    expect(result).toEqual(true)
  }, 30000)

  test('require index.module imports without error', () => {
    expect(() => {
      require('../index.module')
    }).not.toThrow()
  })

  test('parse and regenerate file contents', async () => {
    const context = setupContext({
      logger: console
    })
    const string = await readFile(pathResolve(__dirname, 'files', 'firestore.rules'), 'utf-8')

    const ast = await parse(context, {
      filePath: pathResolve(__dirname, 'files', 'firestore.rules')
    })
    const result = await generate(context, { ast })
    expect(result).toEqual(string)
  })
})
