<template>
  <div v-show="value" class="mask fc" @click.self="cancel">
    <div class="dialog">
      <Icon class="cancel cp" @click="cancel" type="md-close" />
      <b class="title">
        <slot name="title" />
      </b>
      <slot />
    </div>
  </div>
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
  max-height: 600px;
  overflow: auto;
}
.cancel {
  position: absolute;
  right: 15px;
  top: 10px;
}
.title {
  display: inline-block;
  margin: 0 0 10px -10px;
}
</style>
