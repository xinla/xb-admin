<template>
  <div>
    <template v-for="(item, index) in menu">
      <div v-show="show">
        <Row>
          <Col span="3">
            <div @click="toggle(index)">{{item.childList.length ? '展开' : '无子分类'}}</div>
          </Col>
          <Col span="3">{{item.businessType | businessType}}</Col>
          <Col span="3">{{item.name}}</Col>
          <Col span="3">{{item.menuUrl}}</Col>
          <Col span="3">{{item.classify | menuType}}</Col>

          <Col span="2">{{item.isVo ? '可见' : '隐藏'}}</Col>
          <Col span="3">{{item.permissionIdentifying}}</Col>
          <Col span="4">
            <Button type="info" size="small" @click="edit()">编辑</Button>
            <Button type="success" size="small" @click="addChild()">添加下级</Button>
            <Button type="error" size="small" @click="deleteMenu()">删除</Button>
          </Col>
        </Row>
        <memuRecursive :menu="item.childList" :show="whi === index && isChild"></memuRecursive>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "memuRecursive",
  filters: {
    menuType(data) {
      const menuType= {
        0: '菜单',
        1: '按钮'
      }
      return menuType[data]
    },
    businessType(data) {
      const businessType= {
        0: '保险',
        1: '信贷',
        2: '基金'
      }
      return businessType[data]
    }
  },
  props: {
    menu: Array,
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      whi: undefined,
      isChild: false
    };
  },
  methods: {
    toggle(index) {
      this.whi = index
      this.isChild = !this.isChild
    }
  }
};
</script>
<style lang="less" scoped>
  .ivu-row{
    border-left: 1px solid #ccc;
  }
  /deep/.ivu-btn-small{
    vertical-align: baseline;
  }
</style>

