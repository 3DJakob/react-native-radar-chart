import React from 'react'
import { View } from 'react-native'
import Svg from 'react-native-svg'
import Chart from './Chart'
import Grid from './Grid'
import randomColor from 'randomcolor'
import Labels from './Labels'

export interface ChartData {
  fields: number[]
  active: boolean
}

export interface RadarChartProps {
  labels?: string[]
  gridColor?: string
  children?: React.ReactNode
  zoom?: number
  labelOffset?: number
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

const getAxisCount = (children: React.ReactNode): number => {
  let numberOfAxes = 0
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === Chart) {
        numberOfAxes = child.props.fields.length
      }
    }
  })
  return numberOfAxes
}

const appendColor = (children: React.ReactNode, colors: string[]): React.ReactNode => {
  return React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      if (child.type === Chart) {
        if (child.props.color != null) return child
        // @ts-expect-error
        return React.cloneElement(child, { color: colors[index] })
      } else {
        console.warn('RadarChart children must be of type Chart')
      }
    }
    return child
  })
}

const RadarChart: React.FC<RadarChartProps> = ({ children, labels, gridColor, zoom = 80, labelOffset = 5 }) => {
  const sampleColors = generateColors(getAxisCount(children))
  const ChildrenWithProps = appendColor(children, sampleColors)

  zoom = 100 - zoom
  const viewBox = [0 - zoom, 0 - zoom, 100 + zoom * 2, 100 + zoom * 2].join(' ')

  return (
    <View style={{
      width: '100%',
      aspectRatio: 1
    }}
    >
      <Svg height='100%' width='100%' viewBox={viewBox}>
        {labels != null && <Labels labelOffset={labelOffset} labels={labels} />}

        {ChildrenWithProps}
        <Grid numberOfAxes={getAxisCount(children)} gridColor={gridColor} />
      </Svg>
    </View>
  )
}

export default RadarChart
export {
  Chart
}
