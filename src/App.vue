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
</style>


this.$Modal.confirm({
    title: '提示',
    content: '确定要删除么',
    onOk: () => {
        this.$Message.info('删除成功');
    },
})