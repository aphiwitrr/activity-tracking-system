import type { Curriculum } from './Curriculums';
import type { Department } from './Department';
import type { Faculty } from './Faculty';
export type Branch = {
  id: string;
  name: string;
  faculty: Faculty;
  department: Department[];
  curriculums: Curriculum[];
}