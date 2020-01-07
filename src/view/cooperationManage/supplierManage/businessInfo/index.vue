<template>
  <div>
    
    <xNav/>

    <businessInfo type="supplier" style="padding: 20px;"/>

  </div>
</template>

<script>
import { getLesseePageByJB } from '@/api/lessee'
import businessInfo from '@/components/businessInfo'
import xNav from '@/view/components/nav'
export default {
  components: {
    businessInfo,
    xNav
  },
}
</script>

<style lang="less" scoped>
@import url(./index.less);
  .title{
    padding: 0px 0px 20px 10px;
    font-size: 20px;
  }
</style>
