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

export const lightTheme = {
  base00: '#ffffff',
  base01: '#f5f5f5',
  base02: '#d0d0d0',
  base03: '#a0a0a0',
  base04: '#808080',
  base05: '#212121',
  base06: '#2e2e2e',
  base07: '#1a1a1a',
  base08: '#d32f2f',
  base09: '#e65100',
  base0A: '#0288d1',
  base0B: '#689f38',
  base0C: '#00796b',
  base0D: '#3b78e7',
  base0E: '#9c27b0',
  base0F: '#ad1457',
}
