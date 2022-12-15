import React from 'react'
import { Text } from 'react-native-svg'

export interface LabelsProps {
  labels: string[]
  labelOffset: number
}

const Labels: React.FC<LabelsProps> = ({ labels, labelOffset }) => {
  return (
    <>
      {labels.map((label, index) => {
        const angle = (index / labels.length) * 360
        const x = 50 + (50 + labelOffset) * Math.cos(angle * Math.PI / 180)
        const y = 50 + (50 + labelOffset) * Math.sin(angle * Math.PI / 180)
        return (
          <Text
            key={index}
            x={x}
            y={y}
            fill='white'
            fontSize='4'
            textAnchor='middle'
            alignmentBaseline='middle'
            fontWeight='bold'
          >
            {label}
          </Text>
        )
      })}
    </>
  )
}

export default Labels
