<style lang="less" scoped>
.button-wrap {
  position: relative;
  background: #fff;
  z-index: 1;
  border-bottom: 1px solid #ddd;
  height: 58px;
  margin-bottom: 30px;
}
.button {
  display: inline-block;
  width: 12%;
  background: #fbfbfb;
  font-size: 16px;
  line-height: 55px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-top: 2px solid #fbfbfb;
  border-bottom: 1px solid #ddd;
  margin-left: -1px;
  transition: all 0.3s;
}
.current {
  border-top: 2px solid #6582FF;
  background: #fff;
  border-bottom-color: #fff;
}
</style>
<template>
  <div class="x-h100" style="padding: 0;">
    <!-- <xNav type="digitalResource" /> -->

    <!-- <router-view></router-view> -->
    <div class="button-wrap">
      <div :class="['button ac cp', {'current': current === 0}] " @click="current = 0">标题库</div>
      <div :class="['button ac cp', {'current': current === 1}] " @click="current = 1">封面库</div>
    </div>
    <proposalTitle v-show="current === 0" />
    <proposalThumb v-if="current === 1" />
  </div>
</template>

<script>
import proposalTitle from "./proposalTitle";
// import proposalThumb from './proposalThumb'

export default {
  components: {
    proposalTitle,
    proposalThumb: () => import("./proposalThumb")
  },
  props: {},
  data() {
    return {
      current: 0
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
