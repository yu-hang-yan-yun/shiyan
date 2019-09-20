// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import store from '@/store.js'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.css'
import ace from 'ace-builds'
import componentsInstall from './components/install.js'
Vue.use(componentsInstall)
Vue.use(ace)

// import componentsInstall from './install.js'
// Vue.use(componentsInstall)
Vue.use(Element)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // req.url
  next()
  // 合理的请求必须有token
  var token = localStorage.getItem('jc_token')
  if (token || to.path === '/Login') {
    next()
  } else {
    console.log(1)
    next({ path: '/Login' })
  }
})
export default router
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
