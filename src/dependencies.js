'use strict'
import Vue from 'vue'
import dateFormat from 'dateformat'
import VeeValidate, {Validator} from 'vee-validate'
import BootstrapVue from 'bootstrap-vue'
import VueAnalytics from 'vue-analytics'
import router from './router'

Vue.use(VeeValidate, {
  fieldsBagName: 'veeFields',
})
Vue.use(BootstrapVue)
Vue.use(VueAnalytics, {
  id: 'UA-138686134-1',
  router,
})

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

Validator.extend('is_json', {
  getMessage: field => 'The ' + field + ' value is not valid JSON.',
  validate: (jsonString) => {
    try {
      var o = JSON.parse(jsonString)
      if (o && typeof o === 'object') {
        return true
      }
    } catch (e) {
    }
    return false
  },
})
