import type { Curriculum } from './Curriculums'

type Plos = {
  id: string
  num_plo: string
  description: string
  resultTypes: string | null
  curriculum: Curriculum
}
export type { Plos }
