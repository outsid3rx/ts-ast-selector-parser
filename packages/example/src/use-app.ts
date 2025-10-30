import { useMutation } from '@tanstack/react-query'
import ky from 'ky'
import { type SubmitHandler } from 'react-hook-form'

import type { IForm, ParserType } from './types'

export const useApp = () => {
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
        .json(),
  })

  const onSubmit: SubmitHandler<IForm> = (data) => mutation.mutate(data)

  return {
    node: mutation.data,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    onSubmit,
  }
}
