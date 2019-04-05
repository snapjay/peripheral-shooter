<template>
  <div class="hello mb-3">
    <Viewer :view="id"></Viewer>
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
    id: String,
  },
}

</script>

<style scoped lang="scss">

</style>
