<template>
  <ul class="menu-wrap">
    <li v-for="(item, index) in list" class="li cp" :key="index">
        <div class="item">
          <div class="fr more-menu-wrap" v-if="isMoreMenu">
            <i
              class="iconfont iconMore-circle"
              @click="$store.state.moreMenuId = $store.state.moreMenuId === item.id ? '' : item.id"
            ></i>
            <ul class="more-menu" v-show="item.id === $store.state.moreMenuId">
              <li @click="$emit('clickMoreMenu', ['edit', item]), $store.state.moreMenuId = ''">编辑</li>
              <li @click="$emit('clickMoreMenu', ['addChildMenu', item]), $store.state.moreMenuId = ''">添加子菜单</li>
              <li @click="$emit('clickMoreMenu', ['moveMenuUp', item, list]), $store.state.moreMenuId = ''">上移</li>
              <li @click="$emit('clickMoreMenu', ['moveMenuDown', item, list]), $store.state.moreMenuId = ''">下移</li>
            </ul>
          </div>
          <div @click="$emit('clickMenu', item)">{{ item.name }}</div>
        </div>
        <menu-item
          :list="item.children"
          :is-more-menu="isMoreMenu"
          @clickMenu="$emit('clickMenu', $event)"
          @clickMoreMenu="$emit('clickMoreMenu', $event)"
        ></menu-item>
    </li>
  </ul>
</template>

<script>
export default {
  name: "menuItem",
  components: {},
  props: {
    // 菜单数据列表
    list: {
      type: Array,
      default: () => []
    },
    // 是否显示后侧更多菜单按钮
    isMoreMenu: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
    };
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
        return false;
      }
      for (const iterator of data) {
        if (!iterator.meta.hideInMenu) {
          return true;
        }
      }
      return false;
    },
    showQuick() {
      console.log(1);
    }
  }
};
</script>
<style lang="less" scoped>
.menu-wrap {
  .item {
    line-height: 40px;
    .more-menu-wrap {
      height: 40px;
    }
  }
  ul {
    padding-left: 30px;
    .li {
      display: inline-block;
      width: 100%;
      .item {
        .iconMore-circle {
          visibility: hidden;
        }
        &:hover .iconMore-circle {
          visibility: visible;
        }

      }
    }
  }
  .more-menu {
    padding: 10px;
    border: 1px solid #eee;
    position: absolute;
    right: 100%;
    top: 25px;
    white-space: nowrap;
    line-height: 26px;
  }
}
</style>
