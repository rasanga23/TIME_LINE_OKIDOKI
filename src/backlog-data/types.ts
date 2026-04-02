export interface BacklogEntry {
  id: string
  title: string
  hours: number
}

export interface BacklogSection {
  key: string
  label: string
  dotClass: string
  titleClass: string
  items: BacklogEntry[]
}