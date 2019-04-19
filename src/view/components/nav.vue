<template>
  <nav>
    <router-link class="tab-li" :to="{name: 'businessInfo'}">工商信息</router-link>
    <router-link class="tab-li" :to="{name: 'brandInfo'}">品牌信息</router-link>
    <router-link class="tab-li" :to="{name: 'organizationalStructure'}">组织架构</router-link>
    <router-link class="tab-li" :to="{name: 'productList'}">产品列表</router-link>
    <router-link class="tab-li" :to="{name: 'news'}">新闻资讯</router-link>
    <router-link class="tab-li" :to="{name: 'ascoCode'}">职业代码表</router-link>
    <router-link class="tab-li" :to="{name: 'insuranceRules'}">投保规则</router-link>
  </nav>
</template>

<script>
export default {
  
}
</script>

<style scoped>
  .tab-li{
    display: inline-block;
    padding: 8px 16px;
    font-size: 12px;
  }
  /* .tab-li-active {
    color: #2d8cf0;
  } */
  .router-link-active{
    color: #2d8cf0;
  }
</style>
