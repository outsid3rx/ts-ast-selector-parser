import {
  Button,
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

import { useApp } from './use-app'

export const App = () => {
  const { node, isLoading, isError, form, onSubmit } = useApp()

  return (
    <main className="w-full m-auto p-8 flex flex-col gap-8 items-center">
      <h1 className="text-center text-3xl font-extrabold tracking-tight text-balance">
        Find AST Nodes from TypeScript Compiler API with CSS Selectors
      </h1>
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
                          <SelectTrigger>
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="custom">
                              TypeScript Compiler AST + Custom selector parser
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
            <Button variant="outline" type="submit" disabled={isLoading}>
              Find
            </Button>
          </div>
          <div className="w-full">
            <pre>{JSON.stringify(node, null, 2)}</pre>
          </div>
        </form>
      </Form>
    </main>
  )
}
