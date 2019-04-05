'use strict'
export default function randomInt (from = 1, to = 10) {
  return Math.floor(Math.random() * to) + from
}
