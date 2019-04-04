<template>
    <div>
        <small class="text-light bg-secondary px-2 float-right">{{ view }}</small>
        <div class="client border border-primary" :style="style">
            {{content}}
        </div>
    </div>

</template>

<script>
import firebase from '../services/firebase'

export default {
  name: 'View',
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
    small {
        font-size: 10px;
    }

    .client {
        font-size: 200px;
        text-align: center;
    }
</style>
