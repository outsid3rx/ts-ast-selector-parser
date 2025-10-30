import type { IExample } from './types'

export const DEFAULT_CODE = `class MyClass {
  init() {}
  async destroy() {}
}`
export const DEFAULT_SELECTOR =
  'ClassDeclaration > MethodDeclaration[name="init"]'

export const EXAMPLES: IExample[] = [
  {
    name: 'Find async methods',
    description: 'Select all async methods in a class',
    form: {
      source: `class MyClass {
  init() {}
  async destroy() {}
}`,
      selector: 'MethodDefinition[value.async=true]',
      type: 'esquery',
    },
  },
  {
    name: 'Find all usages of style object',
    description: 'Select all usages of style object in React components',
    form: {
      source: `import styles from './component.module.css'

export const App = () => {
  return <div className={styles.root}>Hello world</div>
}`,
      selector:
        'JsxExpression > PropertyAccessExpression[expression.text="styles"]',
      type: 'tsquery',
    },
  },
  {
    name: 'Find namespaces with non-type members',
    description: 'Select all namespaces that contain any non-type members',
    form: {
      source: `namespace A {
  const a = "1"
  type A = "A"
} 

namespace B {
  type B = "B"
  interface C extends {}
}`,
      selector:
        'TSModuleDeclaration[kind="namespace"]:has(TSModuleBlock > :not(TSInterfaceDeclaration, TSTypeAliasDeclaration))',
      type: 'esquery',
    },
  },
]
