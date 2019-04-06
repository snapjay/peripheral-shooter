<template>
    <div>
        <b-alert v-if="gameDocument && !gameDocument.exists" class="mt-3" :show="true">This game does not exist</b-alert>
        <div v-if="gameDocument && gameDocument.exists">
            <h1>Moderator - {{ game.code }}</h1>
            <b-modal id="settings" title="Settings" v-model="showSettings">
                <h6>Display Range</h6>
                <b-row>
                    <b-col>
                        <b-form-group label="From:">
                            <b-form-input type="number" id="range-from" v-model="game.range.from" trim></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group label="To:">
                            <b-form-input type="number" id="range-to" v-model="game.range.to" trim></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <hr>
                <b-row>
                    <b-col>
                        <b-form-group label="Update:" description="Frequency to display new content">
                            <b-input-group append="ms">
                                <b-form-input type="number" id="update" v-model="game.update" trim></b-form-input>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group label="Hide:" description="Hide content after this time">
                            <b-input-group append="ms">
                                <b-form-input type="number" id="hide" v-model="game.hide" trim></b-form-input>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-row>
                <div slot="modal-footer" class="w-100">

                    <b-row>
                        <b-col>
                            <b-button variant="danger" @click="deleteShots()" :disabled="shots.length === 0">Clear History</b-button>
                        </b-col>
                        <b-col>
                            <b-button
                                    variant="primary"
                                    class="float-right b-table-stacked ml-2"
                                    @click="updateSettings">OK </b-button>
                            <b-button
                                    variant="outline-secondary"
                                    class="float-right"
                                    @click="showSettings=false">Cancel</b-button>
                        </b-col>
                    </b-row>
                </div>
            </b-modal>
            <b-row>
                <b-col>
                    <b-button class="mr-2 float-right" variant="outline-primary" v-b-modal="'settings'" v-if="!running">
                        Settings
                    </b-button>
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
  import { randomInt } from '@/services/utils'

  const SCREEN_LEFT = 'LEFT'
  const SCREEN_RIGHT = 'RIGHT'

  export default {
    name: 'Moderator',
    data () {
      return {
        showSettings: false,
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
        console.log(gameDocument.exists)
        this.gameDocument = gameDocument
        this.game = gameDocument.data()
      })

      firebase.listenShots(this.gameId, (shots) => {
        this.shots = shots
      })
    },
    methods: {
      start () {
        this.running = setInterval(() => {
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
      updateSettings () {
        firebase.updateGame(this.gameId, {
          hide: this.game.hide,
          update: this.game.update,
          range: this.game.range,
        })
        this.showSettings = false
      },
    },
  }

</script>
