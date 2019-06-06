<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
/deep/.ivu-input[disabled], /deep/.ivu-select-disabled .ivu-select-selection{
  background:none;
  color: #000;
  border: 0;
  cursor: auto;
}
</style>