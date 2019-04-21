<template>
    <div>
        <b-form @submit="updateSettings" novalidate>
            <b-modal id="settings" title="Settings" v-model="showSettings" size="lg" no-close-on-backdrop hide-header-close no-close-on-esc>
                <b-tabs no-fade>
                    <b-tab title="Display">
                        <b-container class="mt-3">
                            <h5>Random Range</h5>
                            <b-row>
                                <b-col>
                                    <b-form-group label="From:">
                                        <b-form-input type="number" name="range-from" id="range-from"
                                                      v-model="game.range.from"
                                                      v-validate="'required|numeric|min_value:1'"
                                                      trim></b-form-input>
                                        <b-form-invalid-feedback :state="!errors.first('range-from') ">
                                            {{ errors.first('range-from') }}
                                        </b-form-invalid-feedback>
                                    </b-form-group>
                                </b-col>
                                <b-col>
                                    <b-form-group label="To:">
                                        <b-form-input type="number" name="range-to" id="range-to"
                                                      v-model="game.range.to"
                                                      v-validate="`required|numeric|min_value:${parseInt(game.range.from)+1}|max_value:100`"
                                                      trim></b-form-input>
                                        <b-form-invalid-feedback :state="!errors.first('range-to')"  style="cursor:pointer;" @click="game.range.to = (parseInt(game.range.from)+1)">
                                            {{ errors.first('range-to') }}
                                        </b-form-invalid-feedback>
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
                                            <b-form-input name="update" type="number" id="update" v-model="game.update"
                                                          v-validate="'required|numeric|min_value:200|max_value:60000'"
                                                          trim></b-form-input>
                                        </b-input-group>
                                    </b-form-group>
                                    <b-form-invalid-feedback :state="!errors.first('update') ">
                                        {{ errors.first('update') }}
                                    </b-form-invalid-feedback>
                                </b-col>
                                <b-col>
                                    <b-form-group label="Hide:" description="Hide content after this time.">
                                        <b-input-group append="ms">
                                            <b-form-input name="hide" type="number" id="hide" v-model="game.hide"
                                                          v-validate="`required|numeric|min_value:100|max_value:${game.update-100}`"
                                                          trim></b-form-input>

                                        </b-input-group>
                                    </b-form-group>
                                    <b-form-invalid-feedback :state="!errors.first('hide')" style="cursor:pointer;" @click="game.hide = (game.update-200)">
                                        {{ errors.first('hide') }}
                                    </b-form-invalid-feedback>
                                </b-col>
                            </b-row>
                            <hr>
                            <b-row>
                                <b-col cols="6">
                                    <b-form-group label="Shot Limit:" description="Number of shots in string.">
                                        <b-form-input name="shot-limit" type="number" id="shotLimit" max="50"
                                                      v-validate="'required|numeric|min_value:1|max_value:50'"
                                                      v-model="game.shotLimit"
                                                      trim></b-form-input>
                                    </b-form-group>
                                    <b-form-invalid-feedback :state="!errors.first('shot-limit') ">
                                        {{ errors.first('shot-limit') }}
                                    </b-form-invalid-feedback>
                                </b-col>
                            </b-row>
                        </b-container>
                    </b-tab>

                    <b-tab title="Style">
                        <b-container class="mt-3">
                            <b-row>
                                <b-col>
                                    <b-form-group label="Style:" description="JSON string for styles of client.">
                                        <b-form-textarea name="style" id="style" v-model="game.meta.style" v-validate="'is_json'" trim></b-form-textarea>
                                    </b-form-group>
                                    <b-form-invalid-feedback :state="!errors.first('style') ">
                                        {{ errors.first('style') }}
                                    </b-form-invalid-feedback>
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
                                    type="submit"
                                    variant="primary"
                                    :disabled="errors.all().length !== 0"
                                    class="float-right b-table-stacked ml-2">OK
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
        </b-form>
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
      cancelSettings (evt) {
        this.game = JSON.parse(JSON.stringify(cachedSettings))
        this.showSettings = false
      },
      deleteShots () {
        firebase.deleteShots(this.gameId)
      },
      updateSettings (evt) {
        evt.preventDefault()
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
