import { ref } from 'vue';
import { defineStore } from 'pinia';
import branchService from '@/service/branch';
import type { Branch } from '@/types/Branch';

export const useBranchStore = defineStore('branch', () => {
  const branches = ref<Branch[]>([]);
  const initialBranch: Branch = {
    id: '',
    name: '',
    faculty: { id: '', name: '', branches: [], departments: [] },
    department: [],
    curriculums: []
  };
  const editedBranch = ref<Branch>(JSON.parse(JSON.stringify(initialBranch)));

  async function getBranch(id: string) {
    const res = await branchService.getBranch(id);
    editedBranch.value = res.data;
  }

  async function getBranches() {
    const res = await branchService.getBranchs();
    branches.value = res.data;
  }

  async function saveBranch() {
    const branch = editedBranch.value;
    if (!branch.id) {
      // Add new
      console.log('Post ' + JSON.stringify(branch));
      await branchService.addBranch(branch);
    } else {
      // Update
      console.log('Patch ' + JSON.stringify(branch));
      await branchService.updateBranch(branch);
    }

    await getBranches();
  }

  async function deleteBranch() {
    const branch = editedBranch.value;
    await branchService.delBranch(branch);
    await getBranches();
  }

  function clearForm() {
    editedBranch.value = JSON.parse(JSON.stringify(initialBranch));
  }

  return {
    branches,
    getBranches,
    saveBranch,
    deleteBranch,
    editedBranch,
    getBranch,
    clearForm
  };
});