// The Vue build version to load with the `import` command
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// storage 封装
import storage from "@/utils/storage";
//axios封装
import http from '@/utils/httpconfig.js'
//引入cookie插件
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.prototype.$storage = storage
Vue.prototype.$http = http
Vue.prototype.$cookies = VueCookies

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
