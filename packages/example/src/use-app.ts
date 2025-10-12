import { parseSelectorToPlan, querySelectorAll } from '@cast/selector-parser'
import { useCallback, useRef, useState } from 'react'

import { serializeNode } from './utils'

export const useApp = () => {
  const [node, setNode] = useState<SerializedNode[]>([])
  const selectorRef = useRef<HTMLInputElement>(null)
  const codeRef = useRef<HTMLTextAreaElement>(null)

  const find = useCallback(() => {
    if (!selectorRef.current || !codeRef.current) {
      return
    }

    const selector = selectorRef.current.value
    const code = codeRef.current.value

    window.tsEnv.updateFile('/temp.ts', code)

    setNode(
      querySelectorAll(
        parseSelectorToPlan(selector),
        window.tsEnv.getSourceFile('/temp.ts')!,
      ).map(serializeNode),
    )
  }, [])

  return {
    find,
    node,
    selectorRef,
    codeRef,
  }
}
