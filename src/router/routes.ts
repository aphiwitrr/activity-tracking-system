import { useUserStore } from 'src/stores/user-store'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    children: [{ path: '', component: () => import('pages/login-page/LoginPage.vue') }],
    // meta: { roles: ["user", "admin"] }
  },
  {
    path: '/ActivitiesCalendar',
    name: 'ActivitiesCalendar',
    children: [
      { path: '', component: () => import('pages/admin-page/calendar/ActivitiesCalendarPage.vue') },
    ],
    meta: { roles: ['admin'] },
  },
  {
    path: '/ActivitiesManagement',
    name: 'ActivitiesManagement',
    children: [
      { path: '', component: () => import('pages/admin-page/activity/ActivitiesTablePage.vue') },
    ],
    meta: { roles: ['admin'] },
  },
  {
    path: '/ActivitiesManagement/CreateActivity',
    name: 'CreateActivity',
    children: [
      {
        path: '',
        component: () => import('pages/admin-page/activity/CreateActivity/CreateActivity.vue'),
      },
    ],
  },
  {
    path: '/ActivitiesManagement/ActivityDetail',
    name: 'ActivityDetail',
    children: [
      {
        path: '',
        component: () => import('pages/admin-page/activity/ActivityDetail/ActivityDetail.vue'),
      },
    ],
  },
  {
    path: '/StudentManagement',
    name: 'StudentManagement',
    children: [
      { path: '', component: () => import('pages/admin-page/student/StudentTablePage.vue') },
    ],
    meta: { roles: ['admin'] },
  },
  {
    path: '/StudentManagement/StudentDetail',
    name: 'StudentDetail',
    children: [
      {
        path: ':studentID',
        component: () => import('pages/admin-page/student/StudentDetail/StudentDetailPage.vue'),
      },
    ],
    meta: { roles: ['admin'] },
  },

  {
    path: '/Report',
    name: 'Report',
    children: [{ path: '', component: () => import('pages/admin-page/report/ReportPage.vue') }],
  },
  {
    path: '/CertificateManagement',
    name: 'CertificateManagement',
    children: [
      {
        path: '',
        component: () => import('pages/admin-page/certificate/CertificateTablePage.vue'),
      },
    ],
    meta: { roles: ['admin'] },
  },
  {
    path: '/ExComponent',
    name: 'ExComponent',
    children: [
      {
        path: '',
        component: () => import('pages/ExComponent.vue'),
      },
    ],
    meta: { roles: ['admin'] },
  },
  {
    path: '/ActivitiesCalendarPage',
    name: 'ActivitiesCalendarPage',
    children: [
      {
        path: '',
        component: () => import('pages/student-page/calendar/ActivitiesCalendarPage.vue'),
      },
    ],
    meta: { roles: ['user'] },
  },
  {
    path: '/ActivityTablePage',
    name: 'ActivityTablePage',
    children: [
      {
        path: '',
        component: () => import('pages/student-page/activity/ActivityTablePage.vue'),
      },
    ],
    meta: { roles: ['user'] },
  },
  {
    path: '/StudentActivityDetail/:id',
    name: 'StudentActivityDetail',
    children: [
      {
        path: '',
        component: () => import('pages/student-page/activity/Detail/ActivityDetailPage.vue'),
      },
    ],
    meta: { roles: ['user'] },
  },
  {
    path: '/MyActivitiesPage',
    name: 'MyActivitiesPage',
    children: [
      {
        path: '',
        component: () => import('pages/student-page/myactivity/MyActivitiesPage.vue'),
      },
    ],
    meta: { roles: ['user'] },
  },
  {
    path: '/RecordPage',
    name: 'RecordPage',
    children: [
      {
        path: '',
        component: () => import('pages/student-page/record/RecordPage.vue'),
      },
    ],
    meta: { roles: ['user'] },
  },
  {
    path: '/CertificateTablePage',
    name: 'CertificateTablePage',
    children: [
      {
        path: '',
        component: () => import('pages/student-page/certificate/CertificateTablePage.vue'),
      },
    ],
    meta: { roles: ['user'] },
  },

  // Always leave this as last one,
  // but you can also remove it
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

interface RouteMeta {
  roles?: string[]
}

router.beforeEach((to: { meta: RouteMeta }, from, next) => {
  const userStore = useUserStore()
  const userRole = userStore.role

  if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    next('/')
  } else {
    next()
  }
})

export default routes
