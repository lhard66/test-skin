<template>
  <div id="app">
    <button @click="changeTheme('red')">红色</button>
    <button @click="changeTheme('black')">黑色</button>
    <button @click="changeTheme('white')">白色</button>

    <info></info>

    <div class="navigation">
      <router-link to="/home">home</router-link>
      <router-link to="/page">page</router-link>
    </div>

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
    loadStyle (name) {
      return new Promise((resolve, reject) => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = `/static/css/${name}.css`
        link.dataset.theme = name

        link.onload = () => {
          return resolve(link)
        }
        link.onerror = () => {
          return reject(link)
        }

        document.head.appendChild(link)
      })
    },
    disabledAll (links, exceptLink) {
      for (let i = 0; i < links.length; i++) {
        const link = links.item(i)
        if (exceptLink && exceptLink === link) {
          exceptLink.disabled = false
        } else {
          link.disabled = true
        }
      }
    },
    changeTheme (name) {
      // 1. 查找加载样式是否存在。，存在则存储此对象。
      // 2. 不存在，加载样式，当加载完成，将除此样式外的设置为不可用状态。
      // 3. 存在，将所有样式设置为不可用，此样式设置为可用。
      const links = document.getElementsByTagName('link')
      let themeLink = null
      for (let i = 0; i < links.length; i++) {
        const itemLink = links.item(i)
        if (itemLink.href.includes(`${name}.css`)) {
          themeLink = itemLink
        }
      }

      if (themeLink) {
        // 存在
        this.disabledAll(links, themeLink)
      } else {
        // 不存在
        this.loadStyle(name).then(loadLink => {
          this.disabledAll(links)
          loadLink.disabled = false
        })
      }
    }
  }
}
</script>

<style scoped>
#app {
  margin-top: 200px;
  text-align: center;
}

.navigation {
  margin-top: 40px;
}

.content {
  height: 100px;
  line-height: 100px;
  width: 300px;
  margin: 40px auto;
  border: 1px dotted;
}
</style>
