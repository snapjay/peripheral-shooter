'use strict'
import Vue from 'vue'
import dateFormat from 'dateformat'
import VeeValidate from 'vee-validate'
import BootstrapVue from 'bootstrap-vue'

Vue.use(VeeValidate)
Vue.use(BootstrapVue)

Vue.filter('renderTime', (timestamp) => {
  if (timestamp) {
    return dateFormat(new Date(timestamp.toDate()), 'HH:MM:ss.l')
  }
})

Vue.filter('renderDate', (timestamp) => {
  if (timestamp) {
    return dateFormat(new Date(timestamp.toDate()), 'mediumDate')
  }
})
