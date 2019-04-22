<template>
  <nav>
    <router-link v-for="(item,index) of routes" :key="index" class="tab-li" :to="{name: item.name}">{{item.text}}</router-link>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      routes: [
          {name: 'baseInfo', text: '基本信息'},
          {name: 'productInsuranceRules', text: '投保规则'},
          {name: 'productExplain', text: '产品说明'},
          {name: 'productAccessory', text: '产品附件'},
        ]
    }
  }
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
