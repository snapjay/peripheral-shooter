<template>
    <div>
        <b-btn @click="newGame">New Game</b-btn>
        <h2>Choose a Game</h2>
    </div>
</template>

<script>
  import firebase from '@/services/firebase'

  export default {
    name: 'home',
    methods: {
      newGame () {
        firebase.createGame().then((docRef) => {
          this.$router.push({
            name: 'Moderator',
            params: {
              gameId: docRef.id,
            },
          })
        })
      },
    },
  }
</script>
