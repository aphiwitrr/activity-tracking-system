import type { Branch } from './Branch'
import type { Faculty } from './Faculty'
import type { Role } from './Role'
type User = {
  id: string | null
  email: string
  password: string
  firstName: string
  middleName: string | null
  lastName: string
  gender: string
  phone: string
  image: string
  googleId: string
  roles: Role[] | null
  facultyId: string
  branchId: string
}

export type { User }
  