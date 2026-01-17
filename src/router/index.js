import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizView from '../views/QuizView.vue'
import ResultsView from '../views/ResultsView.vue'
import AdminView from '../views/AdminView.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import AdminDashboardQestion from '@/views/AdminQuestionsView.vue'
import Exo from '@/views/exo.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Quiz Mania - Accueil' }
  },
    {
    path: '/exo',
    name: 'exo',
    component: Exo,
    meta: { title: 'Quiz Mania - Accueil' }
  },
  {
    path: '/quiz/:themeId',
    name: 'quiz',
    component: QuizView,
    props: true,
    meta: { title: 'Quiz en cours' }
  },
  {
    path: '/resultat/:themeId',
    name: 'resultat',
    component: ResultsView,
    meta: { title: 'Résultats' }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { title: 'Administration' }
  },
   {
    path: '/admin/dashboard',
    name: 'adminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true }

  },
  {
    path: '/admin/dashboard/question',
    name: 'AdminDashboardQestion',
    component: AdminDashboardQestion,
    meta: { requiresAuth: true }

  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

 router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token")
  if (to.meta.requiresAuth && !isAuthenticated) {

    next("/admin")
  }
  else {
    next()
  }
})
 