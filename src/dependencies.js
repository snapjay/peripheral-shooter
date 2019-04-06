'use strict'
import Vue from 'vue'
import dateFormat from 'dateformat'

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
