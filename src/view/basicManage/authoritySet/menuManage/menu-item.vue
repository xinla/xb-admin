<template>
  <ul>
    <li
      v-for="(item, index) in list"
      :key="index"
    >
        <template v-if="!0">
          <span>{{ item.meta.title }}</span>
          <i class="iconfont-saas icon">+</i>
          <menu-item :list="item.children"></menu-item>
        </template>
    </li>
  </ul>
</template>

<script>
export default {
  name: "menuItem",
  components: {},
  props: {
    list: {
      type: Array,
      default: () => []
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
    goPage(name) {
      this.$router.push({ name });
    },
    isChildren(data) {
      if (!data) {
        return false
      }
      for (const iterator of data) {
        if (!iterator.meta.hideInMenu) {
          return true
        }
      }
      return false
    }
  }
};
</script>
<style lang="less" scoped>
.router-link-active, a:hover, .router-link-active i {
  color: #6582ff !important;
}
</style>
