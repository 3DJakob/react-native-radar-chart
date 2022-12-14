import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import styled from 'styled-components/native'

export interface DotIndicatorsProps {
  index: number
  length: number
  highlightColor: string
  style?: StyleProp<ViewStyle>
}

const Container = styled.View`
  flex-direction: row;
  padding: 5px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`

const Dot = styled.View`
  background-color: ${(props: { color: string }) => props.color};
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin: 0 5px;
`

const DotIndicators: React.FC<DotIndicatorsProps> = ({ index, length, highlightColor, style }) => {
  const Dots = Array.from({ length }, (_, i) => i).map(d => {
    return (
      <Dot
        key={d}
        color={d === index ? highlightColor : 'rgba(255, 255, 255, 0.5)'}
      />
    )
  })

  return (
    <Container style={style}>
      {Dots}
    </Container>
  )
}

export default DotIndicators
