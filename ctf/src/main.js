// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from './store/index'
import Vuerouter from 'vue-router'
import VueResource from 'vue-resource'
import axios from 'axios'
// axios.defaults.baseURL ='/yii'
import baseConfig from '../config/dev.env'
// axios.interceptors.request.use(function (config) {
// //   if(config.url.indexOf("/translate")<0)
// //     config.url = baseConfig.apiBaseUrl +config.url
// //   return config
// // },function (error) {
// //   return Promise.reject(error)
// // });
// // axios.interceptors.response.use(function (response) {
// //   return response
// // },function (error) {
// //   return Promise.reject(error)
// // });
// 添加请求拦截器，在请求头加token
axios.interceptors.request.use(
  config=>{
    if(localStorage.getItem('Token'))
    {
      config.headers.Token = localStorage.getItem('Token')
    }
    return config;
  },
  error => {
    return Promise.reject(error)
  }
);
Vue.prototype.$http = axios
//
router.beforeEach((to,from,next)=>{
  let stoken = store.getters.getsToken
  console.log(stoken)
  if (stoken) {
    next()
    //已经登录的
    if(!to.meta.isLogin)
    {
      console.log("已经登录过了，先退出登录")
    }
    next('/')
  }
  else {
    if(to.meta.isLogin){
      next('/login')
      console.log("需要登录")
    }
    else{
      next()

    }
  }
})
Vue.use(VueResource)
Vue.use(Vuerouter)
// Vue.use(VueAxios,axios)//注册
Vue.use(ElementUI);
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
