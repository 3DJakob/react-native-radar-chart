import React from 'react'
import { Polygon } from 'react-native-svg'

export interface ChartProps {
  fields: number[]
}

const Chart: React.FC<ChartProps> = ({ fields }) => {
  const radiusStep = 2 * Math.PI / fields.length
  const coordinates = fields.map((field, index) => {
    const radius = radiusStep * index
    const x = Math.cos(radius) * field
    const y = Math.sin(radius) * field
    return { x, y }
  })

  return (
    <>
      <Polygon
        points={
              coordinates.map((coordinate, index) => {
                return `${coordinate.x * 50 + 50},${coordinate.y * 50 + 50}`
              }
              ).join(' ')
            }
        stroke='rgba(0, 0, 255, 1)'
        fill='rgba(0, 0, 255, 0.2)'
        strokeWidth={0.6}
        strokeMiterlimit={10}
        strokeLinejoin='round'
      />
    </>
  )
}

export default Chart
