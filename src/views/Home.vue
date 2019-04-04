<template>
  <div class="home">
    <Moderator></Moderator>
<!--    <HelloWorld msg="Weldcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Moderator from '@/components/Moderator.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld,
    Moderator,
  },
}
</script>
