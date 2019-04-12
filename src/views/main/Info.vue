<template>
  <div class="info">
    <span>点击按钮改变背景色</span>
    <span class="word">info test</span>
  </div>
</template>

<style lang="scss" scoped>
.info /deep/ {
  span {
    display: block;
    color: red;
  }
  .word {
    font-size: 12px;
  }
}
</style>
