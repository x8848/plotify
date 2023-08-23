import { Phase } from './types'

export const mockPhases: Phase[] = [
  {
    title: 'Foundation',
    completed: false,
    tasks: [
      { name: 'Setup virtual office', done: false },
      { name: 'Set mission & vision', done: false },
      { name: 'Select business name', done: false },
      { name: 'Buy domains', done: false },
    ],
  },
  {
    title: 'Discovery',
    completed: false,
    tasks: [
      { name: 'Create roadmap', done: false },
      { name: 'Competitor analysis', done: false },
    ],
  },
  {
    title: 'Delivery',
    completed: false,
    tasks: [
      { name: 'Release marketing website', done: false },
      { name: 'Release MVP', done: false },
    ],
  },
]
