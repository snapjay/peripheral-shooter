<template>
    <div>
        <small class="text-light bg-secondary px-2 float-right">{{ view }}</small>
        <div class="container" :style="style">
            {{content}} 2
        </div>
    </div>

</template>

<script>
import firebase from '../services/firebase'

export default {
  name: 'Viewer',
  props: {
    view: String,
  },
  data () {
    return {
      content: '',
      style: {},
    }
  },
  mounted () {
    firebase.listenScreen(this.view, (content, style, querySnapshot) => {
      this.content = content
      this.style = style
      setTimeout(() => {
        this.content = ''
      }, 1000)
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
