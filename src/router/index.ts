import { createRouter, createWebHashHistory } from 'vue-router'
import InicioView from '@/views/01-Inicio/InicioView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/inicio',
      name: 'inicio',
      component: InicioView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/01.1-Login/LoginView.vue'),
    },
    {
      path: '/proyectos',
      name: 'proyectos',
      component: () => import('@/views/02-Proyecto/ProyectoView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/crear-proyecto',
      name: 'crear-proyecto',
      component: () => import('@/views/02.1-CreacionProyecto/CreacionProyectoView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/prestaciones/:proyectoId?',
      name: 'prestaciones',
      component: () => import('@/views/03-Prestaciones/PrestacionesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/parametros/:proyectoId?',
      name: 'parametros',
      component: () => import('@/views/04-Parametros/ParametrosView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/resultados/:proyectoId?',
      name: 'resultados',
      component: () => import('@/views/05-Resultados/ResultadosView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/manual',
      name: 'manual',
      component: () => import('@/views/01.2-Manual/ManualView.vue'),
      meta: { requiresAuth: true },
    },
    {
      // Redirige cualquier ruta desconocida a /login
      path: '/:pathMatch(.*)*',
      redirect: '/login',
    },
  ],
})

// Guard de navegación: protege rutas que requieren autenticación
router.beforeEach((to) => {
  if (!to.meta.requiresAuth) return true

  try {
    const raw = localStorage.getItem('ephdem_sesion')
    if (raw) {
      const sesion = JSON.parse(raw)
      if (sesion?.id_usuario && sesion?.correo) return true
    }
  } catch {
    // sesión corrupta
  }

  return { name: 'login' }
})

export default router