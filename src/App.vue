<template>
  <div id="app">
    <button @click="changeSkin('red')">红色</button>
    <button @click="changeSkin('black')">黑色</button>
    <button @click="changeSkin('white')">白色</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    changeSkin (type) {
      if (type === 'red') {
        console.log('red')
      } else if (type === 'black') {
        console.log('black')
      } else if (type === 'white') {
        console.log('white')
      }
    },
    loadStyle () {
      // const link = document.createElement('link')
      // link.rel = 'stylesheet';
      // link.href = '';
    }
  }
}
</script>

<style>
#app {
  margin-top: 200px;
  text-align: center;
}
</style>
