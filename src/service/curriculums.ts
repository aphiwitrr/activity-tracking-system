import http from './http';
import type { Curriculum } from '@/types/Curriculums';
import type { PageParams } from '@/types/PageParams';

function addCurriculum(curriculum: Curriculum) {
  return http.post('/curriculums', curriculum);
}
function updateCurriculum(curriculum: Curriculum) {
  return http.patch(`/curriculums/${curriculum.id}`, curriculum);
}

function delCurriculum(id: string) {
  return http.delete(`/curriculums/${id}`);
}

function getCurriculums() {
  return http.get<Curriculum[]>('/curriculums');
}

function getCurriculum(id: string) {
  return http.get<Curriculum>(`/curriculums/${id}`);
}

function addCoordinator(curriculumId: string, user: { id: string }[]) {
  console.log(user, 'from service'); // For debugging
  return http.patch(`/curriculums/${curriculumId}/coordinators`, user);
}

function addSubject(curriculumId: string, subjects: { id: string }[]) {
  console.log(subjects, 'from service'); // For debugging
  return http.patch(`/curriculums/${curriculumId}/subjects`, subjects);
}


function getCurriculumsByPage(params: PageParams) {
  return http.get<{ data: Curriculum[]; total: number }>(`/curriculums/pages`, { params })
}


export default {
  addCurriculum,
  updateCurriculum,
  delCurriculum,
  getCurriculums,
  getCurriculum,
  addCoordinator,
  getCurriculumsByPage,
  addSubject
};
