import React from 'react'
import { View } from 'react-native'
import Svg from 'react-native-svg'
import Chart from './Chart'
import Grid from './Grid'
import randomColor from 'randomcolor'

export interface ChartData {
  fields: number[]
  active: boolean
}

export interface RadarChartProps {
  labels: string[]
  colors?: string[]
  gridColor?: string
  children?: React.ReactNode
}

export const generateColors = (numberOfColors: number): string[] => {
  const colors: string[] = []
  for (let i = 0; i < numberOfColors; i++) {
    colors.push(randomColor({
      luminosity: 'light',
      hue: 'random'
    }))
  }
  return colors
}

const RadarChart: React.FC<RadarChartProps> = ({ children, labels, colors = generateColors(labels.length), gridColor }) => {
  const ChildrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      if (child.type === Chart) {
        // @ts-expect-error
        return React.cloneElement(child, { color: colors[index] })
      } else {
        console.warn('RadarChart children must be of type Chart')
      }
    }
    return child
  })

  return (
    <View style={{
      width: '100%',
      aspectRatio: 1
    }}
    >
      <View style={{ padding: 30 }}>
        <Svg height='100%' width='100%' viewBox='0 0 100 100'>
          {ChildrenWithProps}
          <Grid numberOfAxes={labels.length} gridColor={gridColor} />
        </Svg>
      </View>
    </View>
  )
}

export default RadarChart
export {
  Chart
}
