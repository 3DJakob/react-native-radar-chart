import { useSpring, animated } from '@react-spring/native'
import { Polygon } from 'react-native-svg'
import { Field } from '.'

export interface ChartProps {
  fields: Field[]
  color: string
  active: boolean
}

const AnimatedPolygon = animated(Polygon)

const Chart: React.FC<ChartProps> = ({ fields, color, active }) => {
  const radiusStep = 2 * Math.PI / fields.length
  const coordinates = fields.map((field, index) => {
    const radius: number = radiusStep * index
    const x = Math.cos(radius) * field.value
    const y = Math.sin(radius) * field.value
    return { x, y }
  }).map(c => [c.x, c.y]).flat().map(c => c * 50 + 50)

  const coordinatesSpring = useSpring({
    coordinates,
    config: {
      mass: 0.1,
      tension: 100,
      friction: 3
    }
  })

  const opacitySpring = useSpring({
    strokeOpacity: active ? 1.0 : 0.2,
    fillOpacity: active ? 0.5 : 0.2,
    config: {
      mass: 0.1,
      tension: 100,
      friction: 10
    }
  })

  return (
    <>
      <AnimatedPolygon
        points={coordinatesSpring.coordinates}
        stroke={color}
        strokeOpacity={opacitySpring.strokeOpacity}
        fill={color}
        fillOpacity={opacitySpring.fillOpacity}
        strokeWidth={0.6}
        strokeMiterlimit={10}
        strokeLinejoin='round'
      />
    </>
  )
}

export default Chart
