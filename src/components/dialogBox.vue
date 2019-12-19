<template>
  <transition name="fade">
    <div v-show="value" class="mask fc" @click.self="cancel">
      <div class="dialog">
        <Icon type="ios-close" class="cancel cp" @click="cancel" />
        <div class="title">
          <slot name="title" />
        </div>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    cancel() {
      this.$emit("input", false);
    }
  }
};
</script>
<style lang="less" scoped>
.mask {
  left: 0;
}
.dialog {
  position: relative;
  background: #fff;
  padding: 15px 45px;
  border-radius: 8px;
  min-width: 300px;
  overflow: auto;
}
.cancel {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 26px;
}
.title {
  margin: 0 0 15px -10px;
  font-size: 16px;
  font-weight: 600;
  // width: 520px;
}
</style>
