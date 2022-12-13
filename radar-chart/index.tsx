import React from 'react'
import { View } from 'react-native'
import Svg from 'react-native-svg'
import Chart from './Chart'
import Grid from './Grid'
import randomColor from 'randomcolor'

export interface RadarChartProps {
  fields: number[][]
  colors?: string[]
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

const RadarChart: React.FC<RadarChartProps> = ({ fields, colors = generateColors(fields.length) }) => {
  const ChartContent = fields.map((field, index) => {
    return (
      <Chart key={index} fields={field} color={colors[index]} />
    )
  })

  return (
    <View style={{
      width: '100%',
      aspectRatio: 1
    }}
    >
      <View style={{ padding: 30 }}>
        <Svg height='100%' width='100%' viewBox='0 0 100 100'>
          {ChartContent}
          <Grid fields={fields[0]} />
        </Svg>
      </View>
    </View>
  )
}

export default RadarChart
