<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu
      ref="menu"
      v-show="!collapsed"
      :active-name="activeName"
      :open-names="openedNames"
      :accordion="accordion"
      :theme="theme"
      width="auto"
      @on-select="handleSelect"
    >
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length === 1">
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <menu-item
            v-else
            :name="getNameOrHref(item, true)"
            :key="`menu-${item.children[0].name}`"
          >
            <Icons :type="item.children[0].icon || ''" />
            <span>{{ showTitle(item.children[0]) }}</span>
          </menu-item>
        </template>
        <template v-else>
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <menu-item v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`">
            <Icons :type="item.icon || ''" />
            <span>{{ showTitle(item) }}</span>
          </menu-item>
        </template>
      </template>
    </Menu>
    <div class="menu-collapsed" v-show="collapsed" :list="menuList">
      <template v-for="item in menuList">
        <collapsed-menu
          v-if="item.children && item.children.length > 1"
          @on-click="handleSelect"
          hide-title
          :root-icon-size="rootIconSize"
          :icon-size="iconSize"
          :theme="theme"
          :parent-item="item"
          :key="`drop-menu-${item.path}`"
        ></collapsed-menu>
        <Tooltip
          transfer
          v-else
          :content="item.name || (item.children && item.children[0] && item.children[0].name)"
          placement="right"
          :key="`drop-menu-${item.path}`"
        >
          <a
            @click="handleSelect(getNameOrHref(item, true))"
            class="drop-menu-a"
            :style="{textAlign: 'center'}"
          >
            <Icons
              :size="rootIconSize"
              :color="textColor"
              :type="item.icon || (item.children && item.children[0].icon)"
            />
          </a>
        </Tooltip>
      </template>
    </div>
  </div>
</template>
<script>
import SideMenuItem from "./side-menu-item.vue";
import CollapsedMenu from "./collapsed-menu.vue";
import { getUnion } from "@/libs/tools";
import mixin from "./mixin";

export default {
  name: "SideMenu",
  mixins: [mixin],
  components: {
    SideMenuItem,
    CollapsedMenu
  },
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      }
    },
    collapsed: {
      type: Boolean
    },
    theme: {
      type: String,
      default: "dark"
    },
    rootIconSize: {
      type: Number,
      default: 16
    },
    iconSize: {
      type: Number,
      default: 16
    },
    accordion: Boolean,
    activeName: {
      type: String,
      default: ""
    },
    openNames: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      openedNames: []
    };
  },
  methods: {
    handleSelect(name) {
      this.$emit("on-select", name);
    },
    getOpenedNamesByActiveName(path) {
      return this.$route.matched
        .map(item => item.path)
        .filter(item => item !== path);
    },
    updateOpenName(path) {
      if (path === this.$config.homeName) this.openedNames = [];
      else this.openedNames = this.getOpenedNamesByActiveName(path);
    }
  },
  computed: {
    textColor() {
      return this.theme === "dark" ? "#afb5bc" : "#495060";
    }
  },
  watch: {
    activeName(path) {
      if (this.accordion)
        this.openedNames = this.getOpenedNamesByActiveName(path);
      else
        this.openedNames = getUnion(
          this.openedNames,
          this.getOpenedNamesByActiveName(path)
        );
    },
    openNames(newNames) {
      this.openedNames = newNames;
    },
    openedNames() {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened();
      });
    }
  },
  mounted() {
    this.openedNames = getUnion(
      this.openedNames,
      this.getOpenedNamesByActiveName(name)
    );
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.menu.updateOpened();
      this.$refs.menu.updateActiveName();
    });
  }
};
</script>
<style lang="less">
@import "./side-menu.less";
</style>
