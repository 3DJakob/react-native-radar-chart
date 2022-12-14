import { useSpring, animated } from '@react-spring/native'
import { Polygon } from 'react-native-svg'

export interface ChartProps {
  fields: number[]
  color: string
}

const AnimatedPolygon = animated(Polygon)

const Chart: React.FC<ChartProps> = ({ fields, color }) => {
  const radiusStep = 2 * Math.PI / fields.length
  const coordinates = fields.map((field, index) => {
    const radius: number = radiusStep * index
    const x = Math.cos(radius) * field
    const y = Math.sin(radius) * field
    return { x, y }
  }).map(c => [c.x, c.y]).flat().map(c => c * 50 + 50)

  const springState = useSpring({
    coordinates,
    config: {
      mass: 0.1,
      tension: 100,
      friction: 3
    }
  })

  return (
    <>
      <AnimatedPolygon
        points={springState.coordinates}
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
