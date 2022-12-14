import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
const IconBox = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #392E04;
  justify-content: center;
  align-items: center;
`
const Value = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #fff;
  width: 40px;
  text-align: center;
  align-self: center;
`

export interface StatInputProps {
  value: number
  onValue: (number: number) => void
  min?: number
  max?: number
  color?: string
}

const StatInput: React.FC<StatInputProps> = ({ value, onValue, min = 0, max = 10, color = '#333' }) => {
  const decrement = (): void => {
    if (value > min) {
      onValue(value - 1)
    }
  }

  const increment = (): void => {
    if (value < max) {
      onValue(value + 1)
    }
  }

  return (
    <Row>
      <TouchableOpacity onPress={decrement}>
        <IconBox style={{ backgroundColor: color }}>
          <AntDesign name='minus' size={20} color='white' />
        </IconBox>
      </TouchableOpacity>
      <Value>{value}</Value>
      <TouchableOpacity onPress={increment}>
        <IconBox style={{ backgroundColor: color }}>
          <AntDesign name='plus' size={20} color='white' />
        </IconBox>
      </TouchableOpacity>
    </Row>
  )
}

export default StatInput
