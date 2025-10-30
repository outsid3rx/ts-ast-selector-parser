export type ParserType = 'custom' | 'tsquery' | 'esquery'

export interface IForm {
  source: string
  selector: string
  type: ParserType
}

export interface IExample {
  name: string
  description: string
  form: IForm
}
