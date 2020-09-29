import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '../pages/register'
import Forget from '../pages/forget'
import Login from '../pages/login'
import Index from '../pages/index'
Vue.use(Router)
const  router = new Router({
  mode:'history',
  routes: [
    {
      //测试
      path: '/',
      name: 'Index',
      meta:{
        isLogin:true,//需要登录
      },
      component: Index
    },
    {
      //注册
      path: '/register',
      name: 'Register',
      meta:{
        isLogin:false,
      },
      component: Register
    },
    {
      //忘记密码
      path:'/forget',
      name:'Forget',
      meta:{
        isLogin:false,
      },
      component:Forget
    },
    {
      //登录
      path:'/login',
      name:'Login',
      meta:{
        isLogin:false,
      },
      component:Login
    }
  ]
})
// export default new Router({
//   mode:'history',
//   routes: [
//     {
//       path: '/',
//       name: 'Index',
//       meta:{
//         requireAuth:true,//需要登录
//       },
//       component: Index
//     },
//     {
//       path: '/register',
//       name: 'Register',
//       component: Register
//     },
//     {
//       path:'/forget',
//       name:'Forget',
//       component:Forget
//     },
//     {
//       path:'/login',
//       name:'Login',
//       component:Login
//     }
//   ]
// });
export default router;
