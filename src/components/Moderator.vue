<template>
    <div class="mt-3">
        <b-alert v-if="gameDocument && !gameDocument.exists" :show="true">This game does not exist</b-alert>
        <div v-if="gameDocument && gameDocument.exists">
            <h3>Moderator
                <small class="pl-3 text-primary">{{ game.code }}</small>
            </h3>
            <b-row>
                <b-col>
                    <Settings class="mr-2 float-right" :game="game" :gameId="gameId" :shots="shots.length" v-if="!running"></Settings>
                    <b-button class="mr-2" variant="success" @click="start()" v-if="!running">Start</b-button>
                    <b-button variant="danger" @click="stop()" v-if="running">Stop</b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-table class="mt-3" :items="shots" :fields="fields" v-if="shots.length">
                        <template slot="shot" slot-scope="data">
                            {{ shots.length - data.index }}
                        </template>
                        <template slot="created" slot-scope="data">
                            {{ data.item.created | renderTime }}
                        </template>
                    </b-table>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
  import firebase from '@/services/firebase'
  import {randomInt} from '@/services/utils'
  import Settings from '@/components/Settings'

  const SCREEN_LEFT = 'LEFT'
  const SCREEN_RIGHT = 'RIGHT'

  let shotlimit
  export default {
    name: 'Moderator',
    components: {
      Settings,
    },
    data () {
      return {
        gameDocument: null,
        game: false,
        fields: [ 'shot', { key: 'created', label: 'Time', }, 'content', 'screen', ],
        shots: [],
        running: false,
      }
    },
    props: {
      gameId: String,
    },
    mounted () {
      firebase.listenGame(this.gameId, (gameDocument) => {
        this.gameDocument = gameDocument
        const game = gameDocument.data()
        this.game = game
        this.game.meta.style = JSON.stringify(game.meta.style)
      })

      firebase.listenShots(this.gameId, (shots) => {
        this.shots = shots
      })
    },
    methods: {
      start () {
        shotlimit = 0
        this.running = setInterval(() => {
          shotlimit++
          if (shotlimit === this.game.shotLimit) {
            this.stop()
          }
          let screen = SCREEN_LEFT
          if (Math.floor(Math.random() * 2)) screen = SCREEN_RIGHT
          firebase.addShot(this.gameId, screen, randomInt(this.game.range.from, this.game.range.to), { hide: this.game.hide, })
        }, this.game.update)
      },
      stop () {
        clearInterval(this.running)
        this.running = false
      },
      deleteShots () {
        firebase.deleteShots(this.gameId)
      },
    },
  }

</script>
