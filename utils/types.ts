export interface Phase {
  title: string
  completed: boolean
  tasks: Task[]
}

export interface Task {
  name: string
  done: boolean
}

export interface ProgressProps {
  index: number
  phase: Phase
  disabled: boolean
  toggle: (index: number, taskIndex: number) => void
}
