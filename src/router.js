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
// import layout from '@/views/layout'

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
    // {
    // paht: '/layout',
    // name: 'layout',
    // component: Layout
    // },
    {
      path: '/Home',
      name: 'home',
      component: Home
    },
    {
      path: '/useElement',
      name: 'useElement',
      component: UseElement
    }
  ]
})
