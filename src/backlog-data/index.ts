import { adHocBacklogData } from './ad-hoc'
import { bugBacklogData } from './bug'
import { improvementBacklogData } from './improvement'
import { newChangesBacklogData } from './new-changes'
import type { BacklogSection } from './types'

export { adHocBacklogData, bugBacklogData, improvementBacklogData, newChangesBacklogData }
export type { BacklogEntry, BacklogSection } from './types'

export const backlogSections: BacklogSection[] = [
  {
    key: 'bug',
    label: 'Bug',
    dotClass: 'task-dot-bug',
    titleClass: 'backlog-title-bug',
    items: bugBacklogData,
  },
  {
    key: 'improvement',
    label: 'Improvement',
    dotClass: 'task-dot-improvement',
    titleClass: 'backlog-title-improvement',
    items: improvementBacklogData,
  },
  {
    key: 'new-changes',
    label: 'New Changes',
    dotClass: 'task-dot-new-feature',
    titleClass: 'backlog-title-new-changes',
    items: newChangesBacklogData,
  },
  {
    key: 'ad-hoc',
    label: 'Ad hoc',
    dotClass: 'task-dot-ad-hoc',
    titleClass: 'backlog-title-ad-hoc',
    items: adHocBacklogData,
  },
]