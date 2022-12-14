import React from 'react'
import { View } from 'react-native'
import Svg from 'react-native-svg'
import Chart from './Chart'
import Grid from './Grid'
import randomColor from 'randomcolor'

export interface Field {
  label: string
  value: number
}

export interface ChartData {
  fields: Field[]
  active: boolean
}

export interface RadarChartProps {
  charts: ChartData[]
  colors?: string[]
  gridColor?: string
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

const RadarChart: React.FC<RadarChartProps> = ({ charts, colors = generateColors(charts.length), gridColor }) => {
  const ChartContent = charts.map((chart, index) => {
    return (
      <Chart key={index} fields={chart.fields} color={colors[index]} active={charts[index].active} />
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
          <Grid numberOfAxes={charts[0].fields.length} gridColor={gridColor} />
        </Svg>
      </View>
    </View>
  )
}

export default RadarChart
