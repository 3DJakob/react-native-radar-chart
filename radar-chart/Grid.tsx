import React from 'react'
import { Circle, Line } from 'react-native-svg'

export interface GridProps {
  fields: number[]
}

const Grid: React.FC<GridProps> = ({ fields }) => {
  const radiusStep = 2 * Math.PI / fields.length
  const numberOfRings = 5

  const Rings = []
  for (let i = 0; i < numberOfRings; i++) {
    Rings.push(<Circle
      cx='50'
      cy='50'
      r={i * 10 + 10}
      stroke='rgba(0, 0, 0, 0.1)'
      strokeDasharray='1, 2'
      strokeWidth={0.6}
               />)
  }

  const LineSlices = []
  for (let i = 0; i < fields.length; i++) {
    const angle = i * radiusStep
    const x = 50 + 50 * Math.cos(angle)
    const y = 50 + 50 * Math.sin(angle)
    LineSlices.push(<Line x1='50' y1='50' x2={x} y2={y} stroke='rgba(0, 0, 0, 0.1)' strokeDasharray='1, 2' strokeWidth={0.6} />)
  }

  return (
    <>
      {Rings}
      {LineSlices}
    </>
  )
}

export default Grid
