import { createWriteStream, ensureFile } from 'fs-extra'

import tokenToString from '../token/tokenToString'

import generateTokenList from './generateTokenList'

const generateFile = async (context, { ast, outputFilePath, tokenList }) => {
  if (ast) {
    tokenList = generateTokenList(context, { ast })
  }
  await ensureFile(outputFilePath)
  const fileStream = createWriteStream(outputFilePath)
  tokenList.forEach((token) => {
    fileStream.write(tokenToString(token))
  })
  return new Promise((resolve, reject) => {
    fileStream.end(resolve)
    fileStream.on('error', reject)
  })
}

export default generateFile
