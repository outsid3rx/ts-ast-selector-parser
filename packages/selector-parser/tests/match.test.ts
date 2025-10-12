import ts from 'typescript'
import { expect, test } from 'vitest'

import { parseSelectorToPlan, querySelectorAll } from '../src'
import { MOCK_CODE, MOCK_SELECTOR } from './mocks'

test('Parser should create plan', () => {
  expect(
    querySelectorAll(
      parseSelectorToPlan(MOCK_SELECTOR),
      ts.createSourceFile('temp.ts', MOCK_CODE, ts.ScriptTarget.Latest, true),
    ),
  ).toMatchSnapshot()
})
