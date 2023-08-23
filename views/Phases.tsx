import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Progress from '../components/Progress'
import { PHASES_STORE_KEY, getJsonFromStore, saveJsonToStore } from '../utils'
import { mockPhases } from '../utils/mock'
import { Phase } from '../utils/types'

const Phases = () => {
  const [phases, setPhases] = useState<Phase[]>([])

  useEffect(() => {
    const getSavedPhases = async () => {
      const savedPhases = await getJsonFromStore<Phase[]>(PHASES_STORE_KEY)
      setPhases(savedPhases || mockPhases)
    }
    getSavedPhases()
  }, [])

  const toggle = async (phraseIndex: number, taskIndex: number) => {
    const tasks = phases[phraseIndex].tasks.map((task, index) =>
      index === taskIndex ? { ...task, done: !task.done } : task
    )
    const updated = phases.map((phrase, index) =>
      index === phraseIndex ? { ...phrase, tasks, completed: tasks.every(task => task.done) } : phrase
    )
    setPhases(updated)
    await saveJsonToStore<Phase[]>(PHASES_STORE_KEY, updated)
  }

  return (
    <View>
      <Text style={styles.header}>My startup progress</Text>
      {phases.map((phase, index) => (
        <Progress
          {...{ index, phase, toggle, disabled: index === 0 ? false : !phases[index - 1].completed }}
          key={index}
        />
      ))}
    </View>
  )
}

export default Phases

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: '700',
  },
})
