export type TaskTag = 'bug' | 'improvement' | 'ad hoc' | 'new feature'

export interface ReleaseDateEntry {
  date: string
  capacityHours: number
}

export interface TaskEntry {
  id: string
  title: string
  hours: number
  tag: TaskTag
}

export interface PlannedReleaseEntry {
  date: string
  taskIds: string[]
}

export interface TimelineEntry {
  date: string
  capacityHours: number
  totalTaskHours: number
  tasks: TaskEntry[]
}
