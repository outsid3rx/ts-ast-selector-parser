import { Button, Input, Label, Textarea } from '@/components/ui'

import { DEFAULT_CODE, DEFAULT_SELECTOR } from './constants'
import { useApp } from './use-app'

export const App = () => {
  const { node, find, codeRef, selectorRef } = useApp()

  return (
    <main className="w-full m-auto p-8 flex flex-col gap-8 items-center">
      <h1 className="text-center text-3xl font-extrabold tracking-tight text-balance">
        Find AST Nodes from TypeScript Compiler API with CSS Selectors
      </h1>
      <div className="flex w-full gap-8 justify-between flex-col md:flex-row">
        <div className="flex w-full flex-col gap-4">
          <section className="w-full">
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="selector">Selector</Label>
              <Input
                id="selector"
                defaultValue={DEFAULT_SELECTOR}
                ref={selectorRef}
              />
            </div>
          </section>
          <section className="w-full">
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="code">TypeScript code</Label>
              <Textarea id="code" defaultValue={DEFAULT_CODE} ref={codeRef} />
            </div>
          </section>
          <Button variant="outline" onClick={find}>
            Find
          </Button>
        </div>
        <div className="w-full">
          <pre>{JSON.stringify(node, null, 2)}</pre>
        </div>
      </div>
    </main>
  )
}
