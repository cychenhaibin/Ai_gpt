// 路由主入口文件
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { RoutesArray } from './routes.ts'
import { beforeEach, afterEach } from './guards.ts'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: RoutesArray,
})
router.beforeEach(beforeEach)
router.afterEach(afterEach)

export default router
