
import { adminRoutes } from '@/modules/admin/layouts/routes'
import { authRoutes } from '@/modules/auth/routes'
import ShopLayout from '@/modules/shop/leyouts/ShopLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopLayout,
      children: [{
        path: '',
        name: 'home',
        component: () => import('@/modules/shop/components/views/HomeView.vue'),

      },
      ]

    },

    // Auth routes
    authRoutes,
    //Admin Routes
    adminRoutes,

  ]
})

export default router
