import { useMutation } from '@tanstack/react-query'
import ky from 'ky'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { DEFAULT_CODE, DEFAULT_SELECTOR } from './constants'

type ParserType = 'custom' | 'tsquery' | 'esquery'

interface IForm {
  source: string
  selector: string
  type: ParserType
}

export const useApp = () => {
  const form = useForm<IForm>({
    defaultValues: {
      source: DEFAULT_CODE,
      selector: DEFAULT_SELECTOR,
      type: 'custom',
    },
  })
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
    form,
    onSubmit,
  }
}
