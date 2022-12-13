import { StyleSheet, Text, View } from 'react-native'
import RadarChart from './radar-chart'

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>over</Text>
      <RadarChart
        fields={
          [
            [0.2, 0.5, 0.3, 1.0, 0.3],
            [0.6, 1.0, 0.7, 0.1, 0.2],
            [0.8, 0.2, 0.5, 0.3, 0.9],
            [0.1, 0.3, 0.2, 0.5, 0.7]
          ]
        }
        gridColor='white'
      />
      <Text>under</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App
