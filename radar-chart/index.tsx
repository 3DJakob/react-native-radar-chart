import React from 'react'
import { View } from 'react-native'
import Svg from 'react-native-svg'
import Chart from './Chart'
import Grid from './Grid'

export interface RadarChartProps {
  fields: number[][]
}

const RadarChart: React.FC<RadarChartProps> = ({ fields }) => {
  return (
    <View style={{ aspectRatio: 1, width: '100%' }}>
      <View style={{ padding: 30 }}>
        <Svg height='100%' width='100%' viewBox='0 0 100 100'>

          <Grid fields={fields[0]} />

          {
            fields.map((field, index) => {
              return (
                <Chart key={index} fields={field} />
              )
            })
          }
        </Svg>
      </View>
    </View>
  )
}

export default RadarChart
