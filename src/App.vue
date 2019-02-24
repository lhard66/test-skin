<template>
  <div id="app">
    <button>红色</button>
    <button>黑色</button>
    <button>白色</button>

    <info></info>
  </div>
</template>

<script>
import Info from './Info.vue'

export default {
  name: 'App',
  components: { Info }
}
</script>

<style>
#app {
  margin-top: 200px;
  text-align: center;
}
</style>
