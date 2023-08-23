import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import Phases from './views/Phases'

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Phases />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
})
