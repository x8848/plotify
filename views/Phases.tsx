import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Progress from '../components/Progress'
import { PHASES_STORE_KEY, RANDOM_FACT_URL, getJsonFromStore, saveJsonToStore } from '../utils'
import { mockPhases } from '../utils/mock'
import { Phase } from '../utils/types'

const Phases = () => {
  const [randomFact, setRandomFact] = useState('')
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

    if (updated.every(phase => phase.tasks.every(task => task.done))) {
      const response = await fetch(RANDOM_FACT_URL)
      if (response.ok) {
        const data = await response.json()
        setRandomFact(data.text)
      }
    } else {
      setRandomFact('')
    }
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
      {randomFact && <Text style={styles.fact}>{randomFact}</Text>}
    </View>
  )
}

export default Phases

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: '700',
  },
  fact: {
    marginTop: 20,
  },
})
