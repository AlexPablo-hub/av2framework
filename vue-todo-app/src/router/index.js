import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import TasksView from '@/views/TasksView.vue';

const routes = [
  { path: '/', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/tasks', name: 'tasks', component: TasksView, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFound.vue') }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (to.meta.requiresAuth && !user) {
    next('/login');
  } else if (to.path === '/login' && user) {
    next('/');
  } else {
    next();
  }
});

export default router;
