import { join, map, values } from 'ramda'

import { getTokenListPosition } from '../util'

import parseIdentifier from './parseIdentifier'

// https://firebase.google.com/docs/reference/rules/rules#firestore
const PERMISSION_NAMES = {
  create: 'create',
  delete: 'delete',
  get: 'get',
  list: 'list',
  read: 'read',
  update: 'update',
  write: 'write'
}

const isPermissionName = (name) => !!PERMISSION_NAMES[name]

const parsePermission = (props) => {
  const { identifier, ...rest } = parseIdentifier(props)
  if (!isPermissionName(identifier.name)) {
    const { context, tokenList } = props
    const { lastLineCharacterCount, lineCount } = getTokenListPosition(context, tokenList)
    throw new Error(
      `Expected permission name (one of ${join(
        ',',
        map((permissionName) => `'${permissionName}'`, values(PERMISSION_NAMES))
      )}). Instead was given '${tokenList.get(0).value}' at ${lineCount}:${lastLineCharacterCount}`
    )
  }

  return {
    ...rest,
    permission: identifier
  }
}

export default parsePermission
