<template>
  <div id="app">
    <transition name="slide">

    <router-view/>
    </transition>
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
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter, .slide-leave-to
/* .slide-down-leave-active for below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}

/deep/.ivu-input[disabled], /deep/.ivu-select-disabled .ivu-select-selection{
  background:none;
  color: #000;
  border: 0;
  cursor: auto;
}
// iview 弹出确认框
.ivu-modal-mask, .ivu-modal-wrap{
  z-index: 10002 !important;
}
</style>