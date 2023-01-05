import React from 'react'

import { render, screen } from '@testing-library/react-native'
import Labels from './Labels'
import { test, expect } from '@jest/globals'

test('Verify label rendering', async () => {
  const labels = ['foo', 'bar', 'baz']
  render(<Labels labelOffset={5} labels={['foo', 'bar', 'baz']} />)
  const json = screen.toJSON()
  labels.forEach((label) => {
    expect(JSON.stringify(json, null, 2).includes(`"content": "${label}"`) === true)
  })
  expect(json.length === labels.length)
})
