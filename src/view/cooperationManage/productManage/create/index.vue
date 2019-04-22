<template>
<div>
  
  <Steps :current="current">
      <Step title="已完成" content="基本信息">
      </Step>
      <Step title="进行中" content="投保规则"></Step>
      <Step title="待进行" content="产品说明"></Step>
      <Step title="待进行" content="产品附件"></Step>
  </Steps>

  <baseInfo v-show="current === 0"/>
  <insuranceRules v-show="current === 1"/>
  <productExplain v-show="current === 2"/>
  <productAccessory v-show="current === 3"/>

  <div class="ac">
    <Button v-show="current > 0" type="primary" ghost @click="current--">上一步</Button>
    <Button v-show="current !== 3" type="primary" @click="current++">下一步</Button>
    <Button v-show="current === 3" type="primary" @click="submit">确认添加</Button>
  </div>
</div>
</template>

<script>
import baseInfo from '../components/baseInfo'
import insuranceRules from '../components/insuranceRules'
import productExplain from '../components/productExplain'
import productAccessory from '../components/productAccessory'

export default {
  components:{
    baseInfo,
    insuranceRules,
    productExplain,
    productAccessory,
  },
  data() {
    return {
      current: 0,
    }
  },
  methods: {
    submit() {
      this.$router.push({name: 'productManage'})
    }
  }
}
</script>

<style lang="less" scoped>
 @import url('./index.less');
</style>


