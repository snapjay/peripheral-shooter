'use strict'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import './styles/styles.scss'
import { dateFormat } from '@/services/utils'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.filter('renderTime', (timestamp) => {
  if (timestamp) {
    return dateFormat(new Date(timestamp.toDate()))
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
