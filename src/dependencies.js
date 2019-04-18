'use strict'
import Vue from 'vue'
import dateFormat from 'dateformat'
import VeeValidate, {Validator} from 'vee-validate'
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
