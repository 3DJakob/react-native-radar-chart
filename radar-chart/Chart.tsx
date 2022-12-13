import React from 'react'
import { Polygon } from 'react-native-svg'

export interface ChartProps {
  fields: number[]
  color: string
}

const Chart: React.FC<ChartProps> = ({ fields, color }) => {
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
        stroke={color}
        strokeOpacity={1}
        fill={color}
        fillOpacity={0.5}
        strokeWidth={0.6}
        strokeMiterlimit={10}
        strokeLinejoin='round'
      />
    </>
  )
}

export default Chart
