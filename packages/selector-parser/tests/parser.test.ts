import { expect, test } from 'vitest'

import { parseSelectorToPlan } from '../src'
import { MOCK_SELECTOR } from './mocks'

test('Parser should create plan', () => {
  expect(parseSelectorToPlan(MOCK_SELECTOR)).toMatchSnapshot()
})
