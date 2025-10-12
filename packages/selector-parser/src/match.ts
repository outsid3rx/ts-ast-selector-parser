import ts from 'typescript'

import { SelectorPlan } from './types'
import { getChildren, matchesStep } from './utils'

export const querySelectorAll = (plan: SelectorPlan, root: ts.Node) => {
  const results: ts.Node[] = []

  function matchFrom(node: ts.Node, stepIndex: number): boolean {
    if (stepIndex >= plan.steps.length) return false

    if (!matchesStep(plan.steps[stepIndex], node)) {
      return false
    }

    if (stepIndex === plan.steps.length - 1) {
      results.push(node)
      return true
    }

    const nextCombinator = plan.combinators[stepIndex]
    const directChildren = getChildren(node)

    if (nextCombinator === 'child') {
      for (const child of directChildren) {
        matchFrom(child, stepIndex + 1)
      }
    } else if (nextCombinator === 'descendant') {
      // Обходим всё поддерево
      walkDescendant(node, stepIndex)
    }

    return true
  }

  const walkDescendant = (n: ts.Node, stepIndex: number) => {
    const kids = getChildren(n)
    for (const k of kids) {
      matchFrom(k, stepIndex + 1)
      walkDescendant(k, stepIndex)
    }
  }

  const walk = (n: ts.Node) => {
    matchFrom(n, 0)
    const children = getChildren(n)
    for (const child of children) {
      walk(child)
    }
  }

  walk(root)
  return results
}
