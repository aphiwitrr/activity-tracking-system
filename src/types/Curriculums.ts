import type { Branch } from './Branch'
import type { Plos } from './Plos'
import type { Subject } from './Subjects'
// import type { Subject } from 'src/subjects/entities/subject.entity';
import type { User } from './User'

export type Curriculum = {
  id: string
  thaiName: string
  engName: string
  thaiDegreeName: string
  engDegreeName: string
  branch: Branch[]
  description: string
  period: string
  minimumGrade: number
  plos: Plos[]
  coordinators: User[]
  subjects: Subject[];
}
