import Ionicons from '@expo/vector-icons/Ionicons'
import Checkbox from 'expo-checkbox'
import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ProgressProps } from '../utils/types'

const Progress: FC<ProgressProps> = ({ index, phase, toggle, disabled }) => {
  const { title, tasks, completed } = phase
  return (
    <View style={styles.phase}>
      <View style={styles.title}>
        <View style={styles.circle}>
          <Text style={styles.number}>{index + 1}</Text>
        </View>
        <Text style={styles.text}>{title}</Text>
        {completed && <Ionicons name='checkmark-circle' style={styles.icon} size={28} />}
      </View>
      <View style={styles.tasks}>
        {tasks.map(({ name, done }, taskIndex) => (
          <View style={styles.task} key={taskIndex}>
            <Checkbox
              style={styles.checkbox}
              value={done}
              onValueChange={() => toggle(index, taskIndex)}
              disabled={disabled}
            />
            <Text>{name}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default Progress

const styles = StyleSheet.create({
  phase: {
    marginTop: 20,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  number: {
    fontSize: 18,
    color: 'white',
  },
  text: {
    fontSize: 20,
  },
  icon: {
    marginLeft: 'auto',
  },
  tasks: {
    marginTop: 10,
    paddingLeft: 5,
  },
  task: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
})
