<template>
  <div>
    <Moderator></Moderator>
    <div class="grid-container">
      <Viewer view="LEFT"></Viewer>
      <Viewer view="RIGHT"></Viewer>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Moderator from '@/components/Moderator.vue'
import Viewer from '@/components/Viewer.vue'

export default {
  name: 'home',
  components: {
    Viewer,
    Moderator,
  },
}
</script>

<style scoped lang="scss">
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    grid-template-areas: ". .";
  }
</style>
