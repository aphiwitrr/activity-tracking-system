import type { PageParams } from '@/types/PageParams';
import http from './http';
import type { Subject } from '@/types/Subjects';

function addSubject(subject: Subject) {
    console.log(subject)
    return http.post('/subjects', subject);
}
function updateSubject(subject: Subject) {
    return http.patch(`/subjects/${subject.id}`, subject);
}

function delSubject(id: string) {
    return http.delete(`/subjects/${id}`);
}
function getSubjects() {
    return http.get('/subjects');
}
// function getSubjects() {
//     return axios.get(`https://localhost:3000/subjects`)
// }
function getSubject(id: string) {
    return http.get<Subject>(`/subjects/${id}`);
}

function addCoordinator(subjectId: string, userId: string) {
    return http.patch(`/subjects/${subjectId}/coordinators`, { id: userId });
}

function getSubjectsByPage(params: PageParams) {
    return http.get<{ data: Subject[]; total: number }>(`/subjects/pages`, { params })
}

export default {
    addSubject,
    updateSubject,
    delSubject,
    getSubjects,
    getSubject,
    addCoordinator,
    getSubjectsByPage,
};