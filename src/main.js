// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import bulma from '../node_modules/bulma/css/bulma.css'
import Vuex from 'vuex' // อย่าลืมลง yarn add vuex or npm i vuex --save
import store from './vuex/store' // เรียกไฟล์ store ที่เราสร้างไว้นะครับ
Vue.use(Vuex) // เรียกใช้ vuex
Vue.use(bulma)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
