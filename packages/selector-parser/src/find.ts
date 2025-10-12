import ts from 'typescript'

import { querySelectorAll } from './match'
import { parseSelectorToPlan } from './parser'

export const parseAndFind = (selector: string, source: string) => {
  const sourceFile = ts.createSourceFile(
    'temp.ts',
    source,
    ts.ScriptTarget.Latest,
    true,
  )

  const plan = parseSelectorToPlan(selector)
  return querySelectorAll(plan, sourceFile)
}
