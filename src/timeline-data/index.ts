import { plannedReleasesData } from './planned-releases'
import { releaseDatesData } from './release-dates'
import { backlogTasksData } from '../backlog-data'
import type { TimelineEntry } from './types'

export { plannedReleasesData, releaseDatesData }
export { backlogTasksData as tasksData } from '../backlog-data'
export type { PlannedReleaseEntry, ReleaseDateEntry, TaskEntry, TaskTag, TimelineEntry } from './types'

export function buildTimelineData(): TimelineEntry[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const plannedMap = new Map(plannedReleasesData.map((item) => [item.date, item.taskIds]))
  const globallyPlannedTaskIds = new Set(plannedReleasesData.flatMap((item) => item.taskIds))
  const taskMap = new Map(backlogTasksData.map((task) => [task.id, task]))
  const assignedTaskIds = new Set<string>()

  const futureReleaseDates = [...releaseDatesData]
    .filter((item) => {
      const parsedDate = new Date(`${item.date}T00:00:00`)
      return !Number.isNaN(parsedDate.getTime()) && parsedDate > today
    })
    .sort((a, b) => a.date.localeCompare(b.date))

  return futureReleaseDates.map((releaseDate) => {
    const selectedTasks = []
    let usedHours = 0
    const hasPlannedTasksForDate = plannedMap.has(releaseDate.date)
    const plannedTaskIds = plannedMap.get(releaseDate.date) ?? []

    for (const taskId of plannedTaskIds) {
      if (assignedTaskIds.has(taskId)) {
        continue
      }

      const task = taskMap.get(taskId)

      if (!task) {
        continue
      }

      selectedTasks.push(task)
      usedHours += task.hours
      assignedTaskIds.add(task.id)
    }

    if (!hasPlannedTasksForDate) {
      for (const task of backlogTasksData) {
        if (globallyPlannedTaskIds.has(task.id)) {
          continue
        }

        if (assignedTaskIds.has(task.id)) {
          continue
        }

        if (usedHours + task.hours > releaseDate.capacityHours) {
          continue
        }

        selectedTasks.push(task)
        usedHours += task.hours
        assignedTaskIds.add(task.id)
      }
    }

    return {
      date: releaseDate.date,
      capacityHours: releaseDate.capacityHours,
      totalTaskHours: usedHours,
      tasks: selectedTasks,
    }
  })
}

export function buildPastTimelineData(): TimelineEntry[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const plannedMap = new Map(plannedReleasesData.map((item) => [item.date, item.taskIds]))
  const taskMap = new Map(backlogTasksData.map((task) => [task.id, task]))
  const assignedTaskIds = new Set<string>()

  const pastReleaseDates = [...releaseDatesData]
    .filter((item) => {
      const parsedDate = new Date(`${item.date}T00:00:00`)
      return !Number.isNaN(parsedDate.getTime()) && parsedDate <= today
    })
    .sort((a, b) => b.date.localeCompare(a.date))

  return pastReleaseDates.map((releaseDate) => {
    const selectedTasks = []
    let usedHours = 0
    const plannedTaskIds = plannedMap.get(releaseDate.date) ?? []

    for (const taskId of plannedTaskIds) {
      if (assignedTaskIds.has(taskId)) {
        continue
      }

      const task = taskMap.get(taskId)

      if (!task) {
        continue
      }

      selectedTasks.push(task)
      usedHours += task.hours
      assignedTaskIds.add(task.id)
    }

    return {
      date: releaseDate.date,
      capacityHours: releaseDate.capacityHours,
      totalTaskHours: usedHours,
      tasks: selectedTasks,
    }
  })
}
