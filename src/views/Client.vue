<template>
    <div class="hello h-100 mb-3 r-d position-relative" v-if="game" :style="styleBlock"
         v-on:touchstart="overlay=true" v-on:touchend="overlay=false" @mousedown="overlay=true"
         @mouseup="overlay=false">
        <div v-if='overlay' class="overlay position-absolute w-100 h-100 bg-secondary text-white text-center pt-5">
            <h1>{{ view }}</h1>
            <h3>{{ game.code }}</h3>
        </div>
        <div class="container">
            {{ content }}
        </div>
    </div>
</template>

<script>
  import firebase from '../services/firebase'

  export default {
    name: 'Client',
    computed: {
      styleBlock () {
        if (this.game && this.game.meta.hasOwnProperty('style')) {
          return this.game.meta.style
        } else {
          return ''
        }
      },
    },
    mounted () {
      firebase.listenGame(this.gameId, (gameDocument) => {
        this.game = gameDocument.data()
      })
      firebase.listenScreen(this.gameId, this.view, (content, meta, querySnapshot) => {
        this.content = content
        this.meta = meta
        setTimeout(() => {
          this.content = ''
        }, this.game.hide)
      })
    },
    data () {
      return {
        game: false,
        overlay: false,
        content: '',
        style: {},
      }
    },
    props: {
      gameId: String,
      view: String,
    },
  }

</script>
<style scoped lang="scss">
    .overlay {
        user-select: none;
    }

    .container {
        font-size: 200px;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        grid-column-gap: 0;
        grid-row-gap: 0;
        justify-items: center;
        align-items: center;
    }
</style>
