<template>
    <div class="hello mb-3">
        <Viewer :gameId="gameId" :view="view"></Viewer>
    </div>
</template>

<script>
  import Viewer from '@/components/Viewer.vue'

  export default {
    name: 'Client',
    components: {
      Viewer,
    },
    props: {
      gameId: String,
      view: String,
    },
  }

</script>
