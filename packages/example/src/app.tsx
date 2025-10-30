import { FormProvider, useForm } from 'react-hook-form'
import { JSONTree } from 'react-json-tree'

import {
  Button,
  Dialog,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/ui'

import { DEFAULT_CODE, DEFAULT_SELECTOR, lightTheme } from './constants'
import { ExampleSelector } from './example-selector'
import type { IForm } from './types'
import { useApp } from './use-app'

export const App = () => {
  const form = useForm<IForm>({
    defaultValues: {
      source: DEFAULT_CODE,
      selector: DEFAULT_SELECTOR,
      type: 'custom',
    },
    shouldUnregister: false,
  })
  const { node, isLoading, isError, onSubmit } = useApp()

  return (
    <main className="w-full m-auto p-8 flex flex-col gap-8 items-center">
      <FormProvider {...form}>
        <h1 className="text-center text-3xl font-extrabold tracking-tight text-balance">
          Find AST Nodes from TypeScript code with CSS-like selectors
        </h1>
        <Dialog>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full gap-8 justify-between flex-col md:flex-row"
            >
              <div className="flex w-full flex-col gap-4">
                <section className="w-full">
                  <div className="grid w-full items-center gap-3">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Matching type</FormLabel>
                          <FormControl>
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="custom">
                                  TypeScript Compiler AST + Custom selector
                                  parser
                                </SelectItem>
                                <SelectItem value="tsquery">
                                  TypeScript Compiler AST + TSQuery parser
                                </SelectItem>
                                <SelectItem value="esquery">
                                  ESTree AST + ESQuery parser
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>
                <section className="w-full">
                  <div className="grid w-full items-center gap-3">
                    <FormField
                      control={form.control}
                      name="selector"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Selector</FormLabel>
                          <FormControl>
                            <Input placeholder="Selector" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>
                <section className="w-full">
                  <div className="grid w-full items-center gap-3">
                    <FormField
                      control={form.control}
                      name="source"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>TypeScript code</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Source code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>
                {isError && (
                  <p className="text-red-500">
                    An error occurred while fetching the AST nodes.
                  </p>
                )}
                <Button variant="default" type="submit" disabled={isLoading}>
                  Find
                </Button>
                <DialogTrigger asChild>
                  <Button variant="secondary">Select from examples</Button>
                </DialogTrigger>
              </div>
              <div className="w-full">
                <JSONTree data={node} theme={lightTheme} hideRoot />
              </div>
            </form>
          </Form>
          <ExampleSelector />
        </Dialog>
      </FormProvider>
    </main>
  )
}
