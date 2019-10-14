// 导入了 vue
import Vue from 'vue'
// 导入了第三方包 vue-router
import Router from 'vue-router'
// 导入 useElement
import UseElement from './views/useElement'
// 导入login & Home
import Login from '@/views/login'
import Home from '@/views/home'
// 导入 layout
import Layout from '@/views/layout'
// 导入 Publish
import Publish from '@/views/publish'

// 使用路由
Vue.use(Router)

// 创建并且导出一个 Router 对象
export default new Router({
  routes: [
    {
      // 根据目录的重定向
      path: '/',
      redirect: '/home'
    },
    // 登录路由
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // 布局路由
    {
      path: '/layout',
      name: 'layout',
      component: Layout,
      // 添加它的子路由:
      children: [
        { path: '/home', component: Home },
        // 添加一个publish 路由
        { path: '/publish', component: Publish }
      ]
    },
    {
      path: '/useElement',
      name: 'useElement',
      component: UseElement
    }
  ]
})
