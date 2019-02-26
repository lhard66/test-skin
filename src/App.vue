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
  data () {
    return {
      currentLink: ''
    }
  },
  methods: {
    changeSkin (type) {
      console.log(type)
      this.loadStyle(type)
    },
    loadStyle (name) {
      if (this.currentLink && this.currentLink.dataset.theme === name) return

      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = `./static/css/theme.${name}.css`
      link.dataset.theme = name
      document.head.appendChild(link)

      link.onload = () => {
        // console.log(link)
        this.removeLink(this.currentLink)
        this.currentLink = link
      }
    },
    removeLink (el) {
      if (el) el.parentNode.removeChild(el)
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
