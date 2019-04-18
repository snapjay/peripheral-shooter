<template>
    <div>
        <b-modal id="settings" title="Settings" v-model="showSettings" @hide="hide" size="lg">
            <b-tabs no-fade>
                <b-tab title="Display">
                    <b-container class="mt-3">
                        <h5>Random Range</h5>
                        <b-row>
                            <b-col>
                                <b-form-group label="From:">
                                    <b-form-input type="number" id="range-from" v-model="game.range.from"
                                                  trim></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label="To:">
                                    <b-form-input type="number" id="range-to" v-model="game.range.to"
                                                  trim></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-tab>
                <b-tab title="Course of Fire">
                    <b-container class="mt-3">
                        <b-row>
                            <b-col>
                                <b-form-group label="Update:" description="Frequency to display new content.">
                                    <b-input-group append="ms">
                                        <b-form-input type="number" id="update" v-model="game.update"
                                                      trim></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label="Hide:" description="Hide content after this time.">
                                    <b-input-group append="ms">
                                        <b-form-input type="number" id="hide" v-model="game.hide" trim></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <hr>
                        <b-row>
                            <b-col cols="6">
                                <b-form-group label="Shot Limit:" description="Number of shots in string.">
                                    <b-form-input type="number" id="shotLimit" max="50" v-model="game.shotLimit"
                                                  trim></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-tab>

                <b-tab title="Style">
                    <b-container class="mt-3">
                        <b-row>
                            <b-col>
                                <b-form-group label="Style:" description="JSON string for styles of client.">
                                    <b-form-textarea id="style" v-model="game.meta.style" trim></b-form-textarea>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-tab>

            </b-tabs>
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
                                @click="cancelSettings()">Cancel
                        </b-button>
                    </b-col>
                </b-row>
            </div>
        </b-modal>
        <b-row>
            <b-col>
                <b-button class="mr-2 float-right" variant="outline-primary" @click="openSettings()">
                    Settings
                </b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script>
  import firebase from '@/services/firebase'

  let cachedSettings
  export default {
    name: 'Settings',
    data () {
      return {
        showSettings: false,
      }
    },
    props: {
      game: Object,
      settings: Object,
      gameId: String,
      shots: Number,
    },
    methods: {
      openSettings () {
        this.showSettings = true
        cachedSettings = JSON.parse(JSON.stringify(this.game))
      },
      hide () {
        this.game = JSON.parse(JSON.stringify(cachedSettings))
      },
      cancelSettings () {
        this.showSettings = false
      },
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
        }).then(() => {
          this.showSettings = false
        })
      },
    },
  }

</script>
