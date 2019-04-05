<template>
    <div>
        <small class="text-light bg-secondary px-2 float-right">{{ view }}</small>
        <div class="container" :style="style">
            {{ content }}
        </div>
    </div>
</template>

<script>
  import firebase from '../services/firebase'

  export default {
    name: 'Viewer',
    props: {
      view: String,
      gameId: String,
    },
    data () {
      return {
        content: '',
        style: {},
        game: false,
      }
    },
    mounted () {
      firebase.listenScreen(this.gameId, this.view, (content, meta, querySnapshot) => {
        this.content = content
        this.meta = meta.style
        setTimeout(() => {
          this.content = ''
        }, this.game.hide)
      })

      firebase.listenGame(this.gameId, (gameDocument) => {
        this.game = gameDocument.data()
      })
    },
  }

</script>

<style scoped lang="scss">
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

    small {
        font-size: 10px;
    }
</style>
