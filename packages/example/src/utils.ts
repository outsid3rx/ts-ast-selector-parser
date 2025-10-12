import * as ts from 'typescript'

import { DEFAULT_CODE } from './constants'

export const init = async () => {
  const ts = await import('typescript')
  const vfs = await import('@typescript/vfs')

  const compilerOptions = { target: ts.ScriptTarget.ES2020, strict: true }
  const libMap = await vfs.createDefaultMapFromCDN(
    compilerOptions,
    ts.version,
    true,
    ts,
  )
  libMap.set('/temp.ts', DEFAULT_CODE)

  const system = vfs.createSystem(libMap)
  window.tsEnv = vfs.createVirtualTypeScriptEnvironment(
    system,
    ['/temp.ts'],
    ts,
    compilerOptions,
  )
}

export const serializeNode = (node: ts.Node) => {
  const result: SerializedNode = {
    kind: ts.SyntaxKind[node.kind],
    pos: node.pos,
    end: node.end,
  }

  if (
    'name' in node &&
    node.name &&
    ts.isIdentifier(node.name as ts.Identifier)
  ) {
    result.name = (node.name as ts.StringLiteral).text
  }

  if (ts.isStringLiteral(node) || ts.isNumericLiteral(node)) {
    result.value = node.text
  }

  if ('async' in node) result.isAsync = Boolean(node.async)
  if ('export' in node) result.isExport = Boolean(node.export)

  const children: SerializedNode[] = []
  ts.forEachChild(node, (child) => {
    children.push(serializeNode(child))
  })
  if (children.length > 0) {
    result.children = children
  }

  return result
}
