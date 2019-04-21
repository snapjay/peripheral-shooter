'use strict'
import {randomInt} from '@/services/utils'

const SCREEN_LEFT = 'LEFT'
const SCREEN_RIGHT = 'RIGHT'

const Target = class {
  constructor (to, from) {
    this.to = to
    this.from = from
  }

  fire () {
    let screen = SCREEN_LEFT
    if (Math.floor(Math.random() * 2)) screen = SCREEN_RIGHT
    const display = randomInt(this.from, this.to)
    return {
      screen,
      display,
    }
  }
}

export default Target
