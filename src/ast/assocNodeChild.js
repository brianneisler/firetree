import { assocPath, pipe } from 'ramda'

import identifyNode from './identifyNode'

/**
 * Assoc a node child within an AST. After the new `child` is inserted into the
 * children, all Nodes in `node` will be re-identified.
 *
 * @function
 * @category ast
 * @since v0.1.0
 * @param {Context} context The current parser Context
 * @param {Integer} index The child index to assoc
 * @param {Node} child The new child to place at the given `index`
 * @param {Node} node The target Node whose child is being assoc'd
 * @returns {Node} A new copy of the Node with the child assoc'd
 * @example
 *
 *
 */
const assocNodeChild = (context, index, child, node) => {
  const propPath = ['children', index]
  return pipe(assocPath(propPath, child), identifyNode(context))(node)
}

export default assocNodeChild
