<template>
  <div id="app">
    <transition name="slide">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
.size {
  width: 100%;
  height: 100%;
}
html,
body {
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
// 全屏转换动画
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter, .slide-leave-to
/* .slide-down-leave-active for below version 2.1.8 */ {
  transform: translateY(-100px);
  opacity: 0;
}

// 内页转换动画
.slide-inside-enter-active {
  transition: all 0.3s ease;
}
.slide-inside-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-inside-enter, .slide-inside-leave-to
/* .slide-down-leave-active for below version 2.1.8 */ {
  position: absolute;
  transform: translateX(10px);
  opacity: 0;
}

/deep/.ivu-input[disabled],
/deep/.ivu-select-disabled .ivu-select-selection {
  background: none;
  color: #000;
  border: 0;
  cursor: auto;
}
// iview 弹出确认框
.ivu-modal-mask,
.ivu-modal-wrap {
  z-index: 10002 !important;
}
// 按钮间距
.ivu-btn, .ivu-select, .ivu-input-wrapper , .ivu-date-picker {
    margin-right: 10px;
  // &:first-of-type {
  //   margin-left: 10px;
  // }
  // &:first-child {
  //   margin-left: 0;
  // }
  &:last-child {
    margin-right: 0;
  }
}

#app {
  .ivu-table-wrapper{
    border: 0;
    .ivu-table {
      line-height: 20px;
      &:after {
        width: 0;
      }
      &::before {
        height: 0;
      }
      th{
        background:#fff;
        border-bottom: 0;
        font-weight: normal;
        color: #999;
        height: 44px;
        text-align: center;
      }
      td {
        border-bottom: 0;
        color:#333;
        height: 44px;
        text-align: center;
      }
    }
  }
}
</style>