import type { Subject } from './Subjects'

type Skill = {
  id: string
  name: string
  description: string
  level: number
  // subjects: Subject[]
  children: Skill[]
  techSkills: Skill[]
}

export type { Skill }
