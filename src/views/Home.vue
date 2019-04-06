<template>
    <b-container class="mt-3">
        <b-row>
            <b-col>
                <b-btn class="my-2 float-right" @click="newGame">New Game</b-btn>
                <h2>Choose a Game</h2>
                <b-table :items="games" :fields="fields">
                    <template slot="created" slot-scope="data">
                        {{ data.item.created | renderTime }}
                    </template>
                    <template slot="action" slot-scope="data">
                        <b-dropdown text="Moderator" variant="outline-primary" split
                                    :split-to='{name: "Moderator", params:{gameId:  data.item.id}}'>
                            <b-dropdown-item :to='{name: "Client", params:{gameId:  data.item.id, view: "LEFT"}}'>
                                Left
                            </b-dropdown-item>
                            <b-dropdown-item :to='{name: "Client", params:{gameId:  data.item.id, view: "RIGHT"}}'>
                                Right
                            </b-dropdown-item>
                        </b-dropdown>
                    </template>
                </b-table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  import firebase from '@/services/firebase'

  export default {
    name: 'home',
    data () {
      return {
        games: [],
        fields: [ 'code', { key: 'created', label: 'Time', }, 'action', ],
      }
    },
    mounted () {
      firebase.listenGames((games) => {
        this.games = games
      })
    },
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
