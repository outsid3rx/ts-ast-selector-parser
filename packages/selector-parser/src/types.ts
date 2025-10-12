export interface AttributeCondition {
  type: 'attribute'
  attribute: string
  operator: string
  value: string
}

export interface TagCondition {
  type: 'tag'
  name: string
}

export interface Step {
  node: TagCondition
  attributes: AttributeCondition[]
}

export type Combinator = 'descendant' | 'child'

export interface SelectorPlan {
  steps: Step[]
  combinators: Combinator[]
}
