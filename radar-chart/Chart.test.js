import React from 'react'

import { render, screen } from '@testing-library/react-native'
import { test, expect } from '@jest/globals'
import Chart from './Chart'

test('Verify polygon with n points', async () => {
  const fields = [0.5, 0.5, 0.5, 0.5]
  render(<Chart fields={fields} />)
  const json = screen.toJSON()
  const d = json.props.d.split(' ')
  expect(d.length === fields.length * 2)
})
