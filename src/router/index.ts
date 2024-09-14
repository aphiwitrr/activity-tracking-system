import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import http from '@/service/http'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: 'CommonLayout',
        requireAuth: false
      }
    },
    {
      path: '/auth/google/success',
      name: 'GoogleSuccess',
      component: () => import('../views/login/pages/GoogleLoginSuccess.vue'),
      meta: {
        layout: 'FullLayout',
        requireAuth: false
      }
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/news/NewsView.vue'),
      meta: {
        layout: 'CommonLayout',
        requireAuth: false
      }
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('../views/contacts/ContactsView.vue'),
      meta: {
        layout: 'CommonLayout',
        requireAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/pages/LoginView.vue'),
      meta: {
        layout: 'FullLayout'
      }
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: () => import('../views/Forbidden/ForbiddenView.vue'),
      meta: {
        layout: 'FullLayout'
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/profile/ProfileView.vue'),
      meta: {
        layout: 'CommonLayout'
      }
    },
    {
      path: '/dataCenter',
      name: 'Data Center',
      component: () => import('../views/DataCenter/DataCenterView.vue'),
      meta: {
        layout: 'CommonLayout'
      }
    },
    {
      path: '/mainIFCurriculumView',
      name: 'mainIFCurriculumView',
      component: () => import('../views/IFCurriculum/MainIFCurriculumView.vue'),
      meta: {
        layout: 'MainLayout',
        requireAuth: true
      }
    },
    {
      path: '/AddIFAAIView',
      name: 'AddIFAAIView',
      component: () => import('../views/IFCurriculum/admin/AddIFAAI.vue'),
      meta: {
        layout: 'MainLayout',
        requireAuth: true
      }
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/users/UserView.vue'),

      meta: {
        layout: 'MainLayout',
        requireAuth: true
      }
    },
    {
      path: '/ClosView',
      name: 'ClosView',
      component: () => import('../views/Adminview/Clos/closView.vue'),
      meta: {
        layout: 'MainLayout',
        requireAuth: true
      }
    },
    {
      path: '/SkillView',
      name: 'SkillView',
      component: () => import('../views/Adminview/Skill/skillView.vue'),
      meta: {
        layout: 'MainLayout',
        requireAuth: true
      }
    },
    {
      path: '/SkillView/Detail/:id',
      name: 'SkillView/SkillDetail',
      component: () => import('../views/Adminview/Skill/Detail/skillDetail.vue'),
      meta: {
        layout: 'MainLayout',
        requireAuth: true
      }
    },
    // {
    //   path: '/SkillView/Details/:id',
    //   name: 'SkillView/SkillDetails',
    //   component: () => import('../views/Adminview/Skill/Detail/skillDetail.vue'),
    //   meta: {
    //     topic: 'MainLayout'
    //   }
    // },
    {
      path: '/MainIFAdmin',
      name: 'MainIFAdmin',
      component: () => import('../views/IFCurriculum/admin/MainAdmin.vue'),
      meta: {
        layout: 'MainLayout',
        requireAuth: true
      }
    },
    {
      path: '/manageSubject',
      name: 'manageSubject',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/subjects/SubjectView.vue'),
      meta: {
        layout: 'MainLayout',
        requireAuth: true
      }
    },
    {
      path: '/AddSubject',
      name: 'AddSubject',
      component: () => import('../views/subjects/AddSubjectView.vue'),
      meta: {
        layout: 'MainLayout',
        requireAuth: true
      }
    },
    {
      path: '/student/skills',
      name: 'StudentSkills',
      component: () => import('../views/student/Student_Skills.vue'),
      meta: {
        layout: 'MainLayout',
        requireAuth: true
      }
    },
    {
      path: '/student/help',
      name: 'StudentHelp',
      component: () => import('../views/student/Student_help.vue'),
      meta: {
        layout: 'MainLayout',
        requireAuth: true
      }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestComponent.vue'),
      meta: {
        layout: 'MainLayout'
      }
    }
  ]
})
// function isLogin() {
//   const user = localStorage.getItem('user')
//   // const member = localStorage.getItem('member')
//   if (user) {
//     return true
//   }
//   return false
// }

async function isAuthenticated() {
  try {
    await http.get('auth/profile')
    return true
  } catch (err) {
    return false
  }
}
router.beforeEach(async (to, from, next) => {
  if (to.path !== '/forbidden' && to.meta.requireAuth) {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return next('/forbidden')
    }
  }
  next()
})
export default router
