import postcssSelectorParser from 'postcss-selector-parser'

import { Combinator, SelectorPlan, Step } from './types'

export function parseSelectorToPlan(selectorStr: string): SelectorPlan {
  const root = postcssSelectorParser().astSync(selectorStr)

  const [selector] = root.nodes
  if (!selector || selector.type !== 'selector') {
    throw new Error('Invalid or empty selector')
  }

  const steps: Step[] = []
  const combinators: Combinator[] = []

  let currentStep: Step = { node: null, attributes: [] }

  for (const node of selector.nodes) {
    if (node.type === 'combinator') {
      if (!currentStep.node) {
        throw new Error('Combinator must follow a tag')
      }
      steps.push(currentStep)

      const value = node.value.trim()
      if (value === '>') {
        combinators.push('child')
      } else if (value === '') {
        combinators.push('descendant')
      } else {
        throw new Error(`Unsupported combinator: "${value}"`)
      }

      currentStep = { node: null, attributes: [] }
    } else if (node.type === 'tag') {
      currentStep.node = { type: 'tag', name: node.value }
    } else if (node.type === 'attribute') {
      if (node.operator !== '=') {
        throw new Error(
          `Only "=" attribute operator is supported, got: ${node.operator}`,
        )
      }
      if (typeof node.value !== 'string') {
        throw new TypeError('Only string attribute values are supported')
      }
      currentStep.attributes.push({
        type: 'attribute',
        attribute: node.attribute,
        operator: node.operator,
        value: node.value,
      })
    }
  }

  if (currentStep.node) {
    steps.push(currentStep)
  } else {
    throw new Error('Selector ends with combinator or is malformed')
  }

  return { steps, combinators }
}
