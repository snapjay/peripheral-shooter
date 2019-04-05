<template>
    <div>
        <h1>Moderator</h1>
        <Moderator :gameId="gameId"></Moderator>
    </div>
</template>

<script>
  // @ is an alias to /src
  import Moderator from '@/components/Moderator.vue'

  export default {
    name: 'home',
    props: {
      gameId: String,
    },
    components: {
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
