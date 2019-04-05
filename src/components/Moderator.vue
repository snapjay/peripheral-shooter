<template>
    <div class="hello mb-3">
        <div v-if="game">
            <b-modal id="settings" title="Settings" @ok="updateSettings">
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
                    <h3 class="mt-3">Results</h3>
                    <b-table :items="shots" :fields="fields">
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
        <b-alert v-if="!game" :show="true">Unknown game</b-alert>
    </div>
</template>

<script>
  import firebase from '@/services/firebase'
  import { randomInt, dateFormat } from '@/services/utils'

  const SCREEN_LEFT = 'LEFT'
  const SCREEN_RIGHT = 'RIGHT'

  export default {
    name: 'Moderator',
    data () {
      return {
        game: false,
        fields: ['shot', { key: 'created', label: 'Time', }, 'content', 'screen',],
        shots: [],
        running: false,
      }
    },
    props: {
      gameId: String,
    },
    mounted () {
      firebase.listenGame(this.gameId, (gameDocument) => {
        this.game = gameDocument.data()
      })

      firebase.listenShots(this.gameId, (shots) => {
        this.shots = shots
      })
    },
    filters: {
      renderTime (timestamp) {
        if (timestamp) {
          return dateFormat(new Date(timestamp.toDate()))
        }
      },
    },
    methods: {
      start () {
        this.running = setInterval(() => {
          let screen = SCREEN_LEFT
          if (Math.floor(Math.random() * 2)) screen = SCREEN_RIGHT
          firebase.addShot(this.gameId, screen, randomInt(this.game.range.from, this.game.range.to), {hide: this.game.hide,})
        }, this.game.update)
      },
      stop () {
        clearInterval(this.running)
        this.running = false
      },
      updateSettings () {
        firebase.updateGame(this.gameId, {
          hide: this.game.hide,
          update: this.game.update,
          range: this.game.range,
        })
      },
    },
  }

</script>
