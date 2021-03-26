import { v4 as uuidv4 } from 'uuid'

import { Keywords, NodeTypes } from '../../constants'

const createInOperator = ({ id, tokenList }) => ({
  id: id || uuidv4(),
  name: Keywords.IN,
  tokenList,
  type: NodeTypes.OPERATOR
})

export default createInOperator
