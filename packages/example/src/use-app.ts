import type { Extension } from '@codemirror/state'
import { useMutation } from '@tanstack/react-query'
import { classname } from '@uiw/codemirror-extensions-classname'
import getLineFromPos from 'get-line-from-pos'
import ky from 'ky'
import { useEffect, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { DEFAULT_CODE, DEFAULT_SELECTOR } from './constants'
import type { IForm, ParserType } from './types'

export const useApp = () => {
  const [highlightExtension, setHightlightExtension] = useState<Extension>()

  const form = useForm<IForm>({
    defaultValues: {
      source: DEFAULT_CODE,
      selector: DEFAULT_SELECTOR,
      type: 'custom',
    },
    shouldUnregister: false,
  })
  const source = form.watch('source')

  const mutation = useMutation({
    mutationFn: async ({
      source,
      selector,
      type,
    }: {
      type: ParserType
      source: string
      selector: string
    }) =>
      await ky
        .post(`/api/matcher/${type}`, { json: { source, selector } })
        .json<
          [
            | { pos: number; end: number }
            | { loc: { end: { line: number }; start: { line: number } } },
          ]
        >(),
    onSuccess: (data) => {
      const [entry] = data
      let lines = []
      if (!entry) {
        lines = [-1, -1]
      } else if ('loc' in entry) {
        lines = [entry.loc.start.line, entry.loc.end.line]
      } else {
        lines = [
          getLineFromPos(source, entry.pos),
          getLineFromPos(source, entry.end),
        ]
      }
      const [startLine, endLine] = lines

      setHightlightExtension(
        classname({
          add: (lineNumber) => {
            if (lineNumber >= startLine && lineNumber <= endLine) {
              return 'highlighted-line'
            }
          },
        }),
      )
    },
  })

  const onSubmit: SubmitHandler<IForm> = (data) => mutation.mutate(data)
  const onResetHighlight = () => setHightlightExtension(undefined)

  useEffect(() => {
    onResetHighlight()
  }, [source])

  return {
    node: mutation.data,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    onSubmit,
    form,
    highlightExtension,
    onResetHighlight,
  }
}
