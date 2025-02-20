// 路由主入口文件
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/Home.vue'
import { RoutesArray } from './routes.ts'
import { beforeEach, afterEach } from './guards.ts'
import {createApp } from 'vue'
import loginDialogPlugin from "@plugin/loginDialogPlugin/index.ts";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: RoutesArray,
})
router.app = createApp()
router.app.use(loginDialogPlugin)
router.beforeEach(beforeEach)
router.afterEach(afterEach)

export default router
