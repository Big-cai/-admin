import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入ui库
import ElementUI from 'element-ui'
// 引入ui-css文件
import 'element-ui/lib/theme-chalk/index.css'


// 引入axios
import axios from 'axios';
// 挂载到原型上
Vue.prototype.$axios = axios;
// 注册UI组件库
Vue.use(ElementUI)


// 设置基准路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'

// 路由拦截守卫、
router.beforeEach((to,from,next)=>{
  if(to.path !=='/login'&& !localStorage.getItem('token')){
    router.push('/login')
  }else{
    next()
  } 
})

Vue.config.productionTip = false
new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
