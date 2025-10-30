import { DialogTitle } from '@radix-ui/react-dialog'
import { useFormContext } from 'react-hook-form'

import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from './components/ui'
import { EXAMPLES } from './constants'
import type { IForm } from './types'

export const ExampleSelector = () => {
  const { setValue } = useFormContext()
  const onSelectExample = (example: IForm) =>
    (
      Object.entries(example) as Array<[keyof IForm, IForm[keyof IForm]]>
    ).forEach(([name, value]) => setValue(name, value))

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Select example</DialogTitle>
        <DialogDescription>Select one of the examples below</DialogDescription>
      </DialogHeader>
      <div className="grid gap-2">
        {EXAMPLES.map(({ name, description, form }) => (
          <Item key={name} variant="outline">
            <ItemContent>
              <ItemTitle>{name}</ItemTitle>
              <ItemDescription>{description}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button
                variant="outline"
                onClick={() => onSelectExample(form)}
                size="sm"
              >
                Select
              </Button>
            </ItemActions>
          </Item>
        ))}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}
