import ts from 'typescript'

import { Step } from './types'

export const getChildren = (node: ts.Node) => {
  const children: ts.Node[] = []
  ts.forEachChild(node, (child) => {
    children.push(child)
  })
  return children
}

export const stringToSyntaxKind = (kindName: string): ts.SyntaxKind => {
  const kind = ts.SyntaxKind[kindName]
  if (kind === undefined) {
    throw new Error(`Unknown SyntaxKind: ${kindName}`)
  }
  return kind
}

export const getNodeProperty = (node: ts.Node, prop: string): string => {
  // Не для всех свойств есть прямое соответствие
  if (prop === 'name') {
    if ('name' in node) {
      const nameNode = node.name as ts.Identifier
      if (ts.isIdentifier(nameNode)) {
        return nameNode.text
      }
    }
    return undefined
  }

  // По умолчанию — просто читаем свойство
  return node[prop]
}

export const matchesStep = (step: Step, node: ts.Node) => {
  const expectedKind = stringToSyntaxKind(step.node.name)
  if (node.kind !== expectedKind) return false

  for (const attr of step.attributes) {
    const actualValue = getNodeProperty(node, attr.attribute)
    if (actualValue !== attr.value) {
      return false
    }
  }

  return true
}
