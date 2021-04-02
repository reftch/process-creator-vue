
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: `/`, redirect: '/dashboard/workspaces',
  },
  {
    path: `/dashboard`,
    component: () => import('../layouts/dashboard/dashboard.vue'),
    children: [
      {
        path: `workspaces`,
        component: () => import('../layouts/dashboard/workspaces.vue'),
      },
      {
        path: 'workspaces/add',
        component: () => import('../layouts/dashboard/add-workspace.vue')
      },
      {
        path: 'workspaces/add/:id',
        component: () => import('../layouts/dashboard/add-workspace.vue')
      },
      {
        path: `settings`,
        component: () => import('../layouts/dashboard/settings.vue'),
      },
      {
        path: `info`,
        component: () => import('../layouts/dashboard/system-info.vue'),
      },
      {
        path: `copyright`,
        component: () => import('../layouts/dashboard/copyright.vue'),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
