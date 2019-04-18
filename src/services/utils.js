'use strict'
export function randomInt (min = 1, max = 10) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function genCode (length = 4) {
  let text = ''
  let possible = 'BCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
