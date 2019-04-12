<template>
  <div id="app">
    <button @click="changeSkin('red')">红色</button>
    <button @click="changeSkin('black')">黑色</button>
    <button @click="changeSkin('white')">白色</button>

    <info></info>
    <br/>
    <router-link to="/home">home</router-link>
    <router-link to="/page1">page1</router-link>
    <router-link to="/page2">page2</router-link>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Info from './Info.vue'

export default {
  name: 'App',
  components: { Info },
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

<style scoped>
#app {
  margin-top: 200px;
  text-align: center;
}
.content {
  height: 100px;
  line-height: 100px;
  width: 300px;
  margin: 40px auto;
  border: 1px dotted;
}
</style>
