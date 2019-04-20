'use strict'

import firebase from '@/services/firebase'

const GameEngine = class {
  constructor (gameId, settings, game) {
    this.game = game
    this.shotLimit = 0
    this.gameId = gameId
    this.running = false
    this.settings = settings
  }

  start () {
    this.running = window.setInterval(this.updateScreen.bind(this), this.settings.update)
  }

  stop () {
    this.shotLimit = 0
    window.clearInterval(this.running)
    this.running = false
  }

  updateScreen () {
    this.shotLimit++
    if (this.shotLimit === this.settings.shotLimit) {
      this.stop()
    }
    let { screen, display, } = this.game.fire()
    firebase.addShot(this.gameId, screen, display)
  }
}

export default GameEngine
