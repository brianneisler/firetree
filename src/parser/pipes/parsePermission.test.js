import { List } from 'immutable'

import { NodeTypes } from '../../constants'
import { setupContext } from '../../context'
import tokenize from '../tokenize'

import parsePermission from './parsePermission'

describe('parsePermission', () => {
  test('parses "create" and returns expected values', async () => {
    const children = []
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: 'create' })
    const result = parsePermission({
      children,
      context,
      tokenList
    })

    const permission = {
      id: expect.any(String),
      name: 'create',
      tokenList,
      type: NodeTypes.IDENTIFIER
    }

    expect(result).toEqual({
      children: [permission],
      context,
      permission,
      tokenList: List()
    })
  })

  test('parses "delete" and returns expected values', async () => {
    const children = []
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: 'delete' })
    const result = parsePermission({
      children,
      context,
      tokenList
    })

    const permission = {
      id: expect.any(String),
      name: 'delete',
      tokenList,
      type: NodeTypes.IDENTIFIER
    }

    expect(result).toEqual({
      children: [permission],
      context,
      permission,
      tokenList: List()
    })
  })

  test('parses "get" and returns expected values', async () => {
    const children = []
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: 'get' })
    const result = parsePermission({
      children,
      context,
      tokenList
    })

    const permission = {
      id: expect.any(String),
      name: 'get',
      tokenList,
      type: NodeTypes.IDENTIFIER
    }

    expect(result).toEqual({
      children: [permission],
      context,
      permission,
      tokenList: List()
    })
  })

  test('parses "list" and returns expected values', async () => {
    const children = []
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: 'list' })
    const result = parsePermission({
      children,
      context,
      tokenList
    })

    const permission = {
      id: expect.any(String),
      name: 'list',
      tokenList,
      type: NodeTypes.IDENTIFIER
    }

    expect(result).toEqual({
      children: [permission],
      context,
      permission,
      tokenList: List()
    })
  })

  test('parses "read" and returns expected values', async () => {
    const children = []
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: 'read' })
    const result = parsePermission({
      children,
      context,
      tokenList
    })

    const permission = {
      id: expect.any(String),
      name: 'read',
      tokenList,
      type: NodeTypes.IDENTIFIER
    }

    expect(result).toEqual({
      children: [permission],
      context,
      permission,
      tokenList: List()
    })
  })

  test('parses "update" and returns expected values', async () => {
    const children = []
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: 'update' })
    const result = parsePermission({
      children,
      context,
      tokenList
    })

    const permission = {
      id: expect.any(String),
      name: 'update',
      tokenList,
      type: NodeTypes.IDENTIFIER
    }

    expect(result).toEqual({
      children: [permission],
      context,
      permission,
      tokenList: List()
    })
  })

  test('parses "write" and returns expected values', async () => {
    const children = []
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: 'write' })
    const result = parsePermission({
      children,
      context,
      tokenList
    })

    const permission = {
      id: expect.any(String),
      name: 'write',
      tokenList,
      type: NodeTypes.IDENTIFIER
    }

    expect(result).toEqual({
      children: [permission],
      context,
      permission,
      tokenList: List()
    })
  })

  test('parse throws execption when tokenList is empty', () => {
    const children = []
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() =>
      parsePermission({
        children,
        context,
        tokenList
      })
    ).toThrow()
  })

  test('parse throws execption when not a permission name', async () => {
    const children = []
    const context = setupContext({
      logger: console
    })
    const tokenList = await tokenize(context, { string: 'foo' })
    expect(() =>
      parsePermission({
        children,
        context,
        tokenList
      })
    ).toThrow()
  })
})
