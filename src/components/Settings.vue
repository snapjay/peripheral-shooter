<template>
    <div>
            <b-modal id="settings" title="Settings" v-model="showSettings" size="lg">
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
                <hr>
                <b-row>
                    <b-col cols="3">
                        <b-form-group label="Shot Limit:" description="Number of shots to fire">
                            <b-form-input type="number" id="shotLimit" max="50" v-model="game.shotLimit" trim></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <hr>
                <b-row>
                    <b-col>
                        <b-form-group label="Style" description="JSON string for styles of client">
                            <b-form-textarea id="style" v-model="game.meta.style" trim></b-form-textarea>
                        </b-form-group>
                    </b-col>
                </b-row>
                <div slot="modal-footer" class="w-100">

                    <b-row>
                        <b-col>
                            <b-button variant="danger" @click="deleteShots()" :disabled="shots === 0">Clear
                                History
                            </b-button>
                        </b-col>
                        <b-col>
                            <b-button
                                    variant="primary"
                                    class="float-right b-table-stacked ml-2"
                                    @click="updateSettings">OK
                            </b-button>
                            <b-button
                                    variant="outline-secondary"
                                    class="float-right"
                                    @click="showSettings=false">Cancel
                            </b-button>
                        </b-col>
                    </b-row>
                </div>
            </b-modal>
            <b-row>
                <b-col>
                    <b-button class="mr-2 float-right" variant="outline-primary" v-b-modal="'settings'">
                        Settings
                    </b-button>
                </b-col>
            </b-row>
    </div>
</template>

<script>
  import firebase from '@/services/firebase'

  export default {
    name: 'Settings',
    data () {
      return {
        showSettings: false,
      }
    },
    props: {
      game: Object,
      gameId: String,
      shots: Number,
    },
    methods: {
      updateSettings () {
        firebase.updateGame(this.gameId, {
          hide: parseInt(this.game.hide),
          shotLimit: parseInt(this.game.shotLimit),
          update: parseInt(this.game.update),
          range: {
            from: parseInt(this.game.range.from),
            to: parseInt(this.game.range.to),
          },
          meta: {
            style: JSON.parse(this.game.meta.style),
          },
        })
        this.showSettings = false
      },
    },
  }

</script>