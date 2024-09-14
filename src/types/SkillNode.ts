export interface SkillNode {
  id: string
  name: string
  description?: string
  icon?: string
  level?: string
  pass?: boolean
  score?: number
  children?: SkillNode[]
}
