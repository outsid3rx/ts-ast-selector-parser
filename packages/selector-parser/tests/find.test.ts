import { expect, test } from 'vitest'

import { parseAndFind } from '../src'
import { MOCK_CODE, MOCK_SELECTOR } from './mocks'

test('Parser should create plan', () => {
  expect(parseAndFind(MOCK_SELECTOR, MOCK_CODE)).toMatchSnapshot()
})
