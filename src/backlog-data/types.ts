export interface BacklogEntry {
  id: string
  title: string
  hours: number
  tag: 'bug' | 'improvement' | 'ad hoc' | 'new feature'
}

export interface BacklogSection {
  key: string
  label: string
  dotClass: string
  titleClass: string
  items: BacklogEntry[]
}