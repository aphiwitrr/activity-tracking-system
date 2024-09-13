import type { Plos } from './Plos'
import type { Subject } from './Subjects'

type Clos = {
  id: string
  name: string
  description: string
  subject: Subject
  plo: Plos
}

export type { Clos }
