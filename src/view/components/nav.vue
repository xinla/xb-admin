<template>
  <nav>
    <router-link v-for="(item, index) of routes" :key="index" class="tab-li" :to="{name: item.name, query: {id: $route.query.id}}">
      {{item.text}}
    </router-link>
  </nav>
</template>

<script>
const routesA = [
  {name: 'businessInfo', text: '工商信息'},
  {name: 'brandInfo', text: '品牌信息'},
  {name: 'organizationalStructure', text: '组织架构'},
  {name: 'productList', text: '产品列表'},
  {name: 'news', text: '新闻资讯'},
  {name: 'ascoCode', text: '职业代码表'},
  {name: 'insuranceRules', text: '投保规则'},
]
const routesB = [
  {name: 'nationalityTable', text: '国籍表'},
  {name: 'districtTable', text: '行政区划表'},
  {name: 'professionTable', text: '职业代码表'},
]

const routesC = [
  {name: 'proposalTitle', text: '建议书标题库'},
  {name: 'proposalThumb', text: '建议书封面库'},
]

export default {
  props: {
    type: ''
  },
  data() {
    return {
    }
  },
  computed: {
    routes() {
      if (this.type === 'database') {
        return routesB
      } else if (this.type === 'digitalResource') {
        return routesC
      } else {
        return routesA
      }
    }
  },
}
</script>

<style scoped>
  nav{
    margin-bottom: 10px;
    border-bottom: 2px solid #ddd;
  }
  .tab-li{
    display: inline-block;
    padding: 8px 16px;
    font-size: 12px;
    margin-bottom: -2px;
  }
  /* .tab-li-active {
    color: #2d8cf0;
  } */
  .router-link-active{
    color: #2d8cf0;
    border-bottom: 2px solid;
  }
</style>
