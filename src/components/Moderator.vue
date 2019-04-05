<template>
    <div class="hello mb-3">
        <h1>Moderator</h1>
        <b-row>
            <b-col>
                <b-form-group label="From">
                    <b-form-input id="range-from" v-model="range.from" trim></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="To">
                    <b-form-input id="range-to" v-model="range.to" trim></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group label="Update" description="Frequency to display new content">
                    <b-input-group append="ms">
                        <b-form-input id="update" v-model="update" trim></b-form-input>
                    </b-input-group>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Show" description="How long to show value for">
                    <b-input-group append="ms">
                        <b-form-input id="hide" v-model="hide" trim></b-form-input>
                    </b-input-group>
                </b-form-group>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <b-button class="mr-2" variant="success" @click="start()" v-if="!running">Start</b-button>
                <b-button variant="danger" @click="stop()" v-if="running">Stop</b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import firebase from '@/services/firebase'
import randomInt from '@/services/utils'

export default {
  name: 'Moderator',
  data () {
    return {
      running: false,
      range: {
        from: 1,
        to: 5,
      },
      shots: 10,
      update: 2000,
      hide: 100,
    }
  },
  methods: {
    start () {
      this.running = setInterval(() => {
        if (Math.floor(Math.random() * 2)) {
          firebase.addRow('LEFT', randomInt(this.range.from, this.range.to), { hide: this.hide, })
        } else {
          firebase.addRow('RIGHT', randomInt(this.range.from, this.range.to), { hide: this.hide, })
        }
      }, this.update)
    },
    stop () {
      clearInterval(this.running)
      this.running = false
    },
  },
}

</script>

<style scoped lang="scss">

</style>
