<template>
  <div id="app">
    <button @click="changeSkin('red')">红色</button>
    <button @click="changeSkin('black')">黑色</button>
    <button @click="changeSkin('white')">白色</button>

    <info></info>
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
      // const link = document.createElement('link');
      // link.rel = 'stylesheet';
      // link.href = `./theme-${theme}.css`;
      // link.dataset.theme = theme;
      // document.head.appendChild(link);
      // link.onload = () => {
      //   this.removeTheme();
      //   this.setState({
      //     currentLink: link
      //   });
      // }
    },
    removeStyle () {
      //
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
