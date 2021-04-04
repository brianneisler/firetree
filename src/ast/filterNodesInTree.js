import { isArray, isObject } from 'lodash'
import { concat, curry, keys, reduce } from 'ramda'

import { measure, walk } from '../utils'

const filterWalkee = (node, path, predicate, recur) => {
  let matches = []
  const bool = predicate(node, path)
  if (bool) {
    // NOTE BRN: If we receive the break symbol, it means that the node's children
    // should not be explored
    if (bool === Symbol.for('break')) {
      return undefined
    }
    matches = [node]
  }
  const { children } = node
  if (!isObject(children)) {
    return matches
  }
  return reduce(
    (acc, childKdx) => {
      const child = children[childKdx]
      const newPath = concat(path, [childKdx])
      const result = recur(child, newPath, predicate)
      if (result) {
        return concat(acc, result)
      }
      return acc
    },
    matches,
    isArray(children) ? children.keys() : keys(children)
  )
}

const filterNodesInTree = curry(
  measure('filterNodesInTree', (predicate, tree) => walk(filterWalkee, tree, [], predicate))
)

export default filterNodesInTree
