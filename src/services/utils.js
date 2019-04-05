'use strict'
export function randomInt (from = 1, to = 10) {
  return Math.floor(Math.random() * to) + from
}
export function dateFormat (date) {
  // const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return (
    // '0' + date.getDate()).slice(-2) + ' ' +
    // monthNames[(date.getMonth())] + ' - ' +
    // date.getFullYear() + '/' +
    ('0' + date.getHours()).slice(-2) + ':' +
    ('0' + date.getMinutes()).slice(-2) + ':' +
    ('0' + date.getSeconds()).slice(-2))
}
