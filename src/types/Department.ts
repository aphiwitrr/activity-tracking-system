import type { Branch } from './Branch';
import type { Faculty } from './Faculty';

export type Department = {
  id: string;
  name: string;
  branches: Branch[];
  faculty: Faculty[];
};