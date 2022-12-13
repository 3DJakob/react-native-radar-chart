import { StyleSheet, View } from 'react-native'
import RadarChart from './radar-chart'

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <RadarChart fields={
        [
          [0.2, 0.5, 0.3, 1.0, 0.3],
          [0.6, 1.0, 0.7, 0.1, 0.2]
        ]
      }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App
