<template>
    <div class="hello mb-3">
        <h1>Moderator</h1>
        <b-button class="mr-2" @click="start()">Start</b-button>
        <b-button @click="stop()">Stop</b-button>
    </div>
</template>

<script>
import firebase from '@/services/firebase'

let interval
export default {
  name: 'Moderator',
  data () {
    return {
      rows: [],
    }
  },
  methods: {
    start () {
      interval = setInterval(() => {
        if (Math.floor(Math.random() * 2)) {
          firebase.addRow('LEFT', Math.floor(Math.random() * 9) + 1, { })
        } else {
          firebase.addRow('RIGHT', Math.floor(Math.random() * 9) + 1, { })
        }
      }, 2000)
    },
    stop () {
      clearInterval(interval)
    },
  },
}

</script>

<style scoped lang="scss">

</style>
