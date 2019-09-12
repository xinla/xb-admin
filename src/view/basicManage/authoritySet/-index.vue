<template>
  <div>
    <Tabs v-model="type">
        <TabPane label="SaaS" name="1"></TabPane>
        <TabPane label="保险" name="2"></TabPane>
        <TabPane label="信贷" name="0"></TabPane>
        <TabPane label="基金" name="3"></TabPane>
    </Tabs>
    <saas :x-type="parseInt(this.type)" :key='this.type' />
  </div>
</template>

<script>
import saas from './saas'

export default {
  components:{
    saas
  },
  data(){
    return {
      type: '1'
    }
  }
}
</script>
<style lang="less" scoped>
</style>
