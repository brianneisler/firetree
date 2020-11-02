import parseFile from './parseFile'
import parseString from './parseString'

/**
 * parses the rules file at the given `filePath` or parse the given `string`.
 *
 * @function
 * @since v0.1.0
 * @category parser
 * @param {Context} context
 * @param {{
 *   filePath: String,
 *   string: String
 * }}} options
 * @returns {AST}
 * @example
 * import { parse, setupContext } from 'firetree'
 *
 * const context = setupContext()
 *
 * // parse file into an AST
 * const ast = await parse(context, {
 *   filePath: './path/to/firestore.rules'
 * })
 *
 * // parse string into an AST
 * const ast = await parse(context, {
 *   string: someRulesString
 * })
 */
const parse = async (context, { filePath, string }) => {
  if (filePath) {
    return parseFile(context, filePath)
  }
  return parseString(context, string)
}

export default parse
