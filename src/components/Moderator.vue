<template>
    <div class="hello">
        <h1>Moderator</h1>
        <b-button @click="addRow()">Add Row</b-button>
        <ul>
            <li v-for="row in rows" :key='row.id'>{{row.name}} (#{{ row.number}}) {{row[450]}} is {{new Date(row.created_on)}}</li>
        </ul>
    </div>
</template>

<script>
import firebase from '../services/firebase'

export default {
  name: 'Moderator',
  data () {
    return {
      rows: [],
    }
  },
  mounted () {
    firebase.listenUsers((querySnapshot) => {
      this.rows = []
      querySnapshot.forEach((doc) => {
        this.rows.push(doc.data())
      })
    })
  },
  methods: {
    addRow () {
      firebase.addRow()
    },
  },
}

</script>

<style scoped lang="scss">

</style>
