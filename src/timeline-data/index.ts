import { plannedReleasesData } from './planned-releases'
import { releaseDatesData } from './release-dates'
import { tasksData } from './tasks'
import type { TimelineEntry } from './types'

export { plannedReleasesData, releaseDatesData, tasksData }
export type { PlannedReleaseEntry, ReleaseDateEntry, TaskEntry, TaskTag, TimelineEntry } from './types'

export function buildTimelineData(): TimelineEntry[] {
  const releaseCapacityMap = new Map(releaseDatesData.map((item) => [item.date, item.capacityHours]))
  const taskMap = new Map(tasksData.map((task) => [task.id, task]))

  return plannedReleasesData.map((plan) => {
    const tasks = plan.taskIds
      .map((taskId) => taskMap.get(taskId))
      .filter((task): task is NonNullable<typeof task> => Boolean(task))

    const totalTaskHours = tasks.reduce((sum, task) => sum + task.hours, 0)

    return {
      date: plan.date,
      capacityHours: releaseCapacityMap.get(plan.date) ?? 0,
      totalTaskHours,
      tasks,
    }
  })
}
