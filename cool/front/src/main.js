// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import router from './router'
import './service/http.js'
import './assets/element-variables.scss'
import './assets/common.scss'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import App from './App'
//Vue.config.productionTip = false
Vue.use(ElementUI, {size: 'small', zIndex: 3000});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
