import type { Branch } from './Branch';
import type { Department } from './Department';
export type Faculty = {
  id: string;
  name: string;
  branches: Branch[];
  departments: Department[];
};