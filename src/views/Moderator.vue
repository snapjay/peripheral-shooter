<template>
    <b-container>
        <div class="mt-3"  v-if="gameDocument">
            <b-alert v-if="!gameDocument.exists" :show="true">This game does not exist</b-alert>
            <div v-if="gameDocument.exists">
                <h3>Moderator
                    <small class="pl-3 text-primary">{{ game.code }}</small>
                </h3>
                <b-row>
                    <b-col>
                        <Settings class="mr-2 float-right" :game="game" :gameId="gameId" :shots="shots.length"
                                  v-if="!GameEngine.running"></Settings>
                        <b-button class="mr-2" variant="success" @click="start()" v-if="!GameEngine.running">Start
                            <b-badge variant="light" class="ml-2">{{ this.game.shotLimit }} shots</b-badge>
                        </b-button>
                        <b-button variant="danger" @click="stop()" v-if="GameEngine.running">Stop</b-button>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-table class="mt-3" :items="shots" :fields="tbFields" v-if="shots.length">
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
    </b-container>
</template>

<script>
  import firebase from '@/services/firebase'
  import GameEngine from '@/services/games/game'
  import Target from '@/services/games/target'
  import Settings from '@/components/Settings'

  export default {
    name: 'Moderator',
    components: {
      Settings,
    },
    data () {
      return {
        gameDocument: null,
        GameEngine: false,
        game: false,
        tbFields: [ 'shot', { key: 'created', label: 'Time', }, 'content', 'screen', ],
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
        this.game = gameDocument.data()
        this.GameEngine = new GameEngine(this.gameId, {
          shotLimit: this.game.shotLimit,
          update: this.game.update,
        }, new Target(this.game.range.to, this.game.range.from)
        )
      })
      firebase.listenShots(this.gameId, (shots) => {
        this.shots = shots
      })
    },
    methods: {
      start () {
        this.GameEngine.start()
      },
      stop () {
        this.GameEngine.stop()
      },
    },
  }

</script>
