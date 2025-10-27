import { parseSelectorToPlan, querySelectorAll } from '@cast/selector-parser'
import { Injectable } from '@nestjs/common'
import { ast, query } from '@phenomnomnominal/tsquery'
import { createFSBackedSystem } from '@typescript/vfs'
import { parse } from '@typescript-eslint/typescript-estree'
import { query as esQuery } from 'esquery'
import type { Node } from 'estree'
import { join } from 'node:path'
import ts from 'typescript'

type SerializedNode = Record<
  string,
  number | string | boolean | SerializedNode[]
>

@Injectable()
export class MatcherService {
  public matchCustom = async (source: string, selector: string) => {
    const ts = await import('typescript')
    const vfs = await import('@typescript/vfs')

    const compilerOptions = { target: ts.ScriptTarget.ES2020, strict: true }
    const fsMap = new Map<string, string>()
    fsMap.set('/temp.ts', source)

    const projectRoot = join(__dirname, '..')
    const system = createFSBackedSystem(fsMap, projectRoot, ts)
    const env = vfs.createVirtualTypeScriptEnvironment(
      system,
      ['/temp.ts'],
      ts,
      compilerOptions,
    )

    return querySelectorAll(
      parseSelectorToPlan(selector),
      env.getSourceFile('/temp.ts')!,
    ).map(this.serializeNode)
  }

  public matchTsQuery = async (source: string, selector: string) => {
    const tree = ast(source)
    return query(tree, selector).map(this.serializeNode)
  }

  public matchEsQuery = async (source: string, selector: string) => {
    const ast = parse(source, {
      sourceType: 'module',
      loc: true,
      range: true,
    })

    return esQuery(ast as Node, selector)
  }

  private serializeNode = (node: ts.Node) => {
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
      children.push(this.serializeNode(child))
    })
    if (children.length > 0) {
      result.children = children
    }

    return result
  }
}
