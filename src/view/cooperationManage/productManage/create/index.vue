<template>
<div>
  
  <Steps :current="current">
      <Step title="基本信息" content="基本信息">
      </Step>
      <Step title="投保规则" content="投保规则"></Step>
      <Step title="费率计算" content="费率计算"></Step>
      <Step title="产品说明" content="产品说明"></Step>
      <Step title="附加险" content="附加险"></Step>
      <Step title="产品附件" content="产品附件"></Step>
  </Steps>

  <baseInfo ref="baseInfo" v-show="current === 0"/>
  <insuranceRules ref="insuranceRules" v-show="current === 1"/>
  <!-- <rateCalculation ref="rateCalculation" v-show="current === 2"/>
  <productExplain ref="productExplain" v-show="current === 3"/>
  <additionRisk ref="additionRisk" v-show="current === 4"/>
  <productAccessory ref="productAccessory" v-show="current === 5"/> -->

  <div class="ac">
    <Button v-show="current > 0" type="primary" ghost @click="current--">上一步</Button>
    <Button v-show="current !== 5" type="primary" @click="submit(current)">保存并下一步</Button>
    <Button v-show="current === 5" type="primary" @click="submit(current)">保存</Button>
  </div>
</div>
</template>

<script>
import baseInfo from '../components/baseInfo'

export default {
  components:{
    baseInfo,
    insuranceRules: () => import('../components/insuranceRules'),
    // productExplain: () => import('../components/productExplain'),
    // productAccessory: () => import('../components/productAccessory'),
    // rateCalculation: () => import('../components/rateCalculation'),
    // additionRisk: () => import('../components/additionRisk'),
  },
  data() {
    return {
      current: 1,
    }
  },
  methods: {
    submit(current) {
      Promise.resolve()
      .then(data => {
        switch (current) {
          case 0: 
          return this.$refs.baseInfo.submit()
          .then(data => {
            this.$route.query.id = data
            console.log(data)
            console.log(this.current)
            this.current++
             window.scrollTo(0, 0)
          })
          break
          case 1: 
          return this.$refs.insuranceRules.submit()
          .then(data => {
            console.log(this.current)
            this.current++
             window.scrollTo(0, 0)
          })
          break
          case 2: 
          return this.$refs.rateCalculation.submit()
          .then(data => {
            console.log(this.current)
            this.current++
             window.scrollTo(0, 0)
          })
          break
          case 3: 
          return this.$refs.productExplain.submit()
          .then(data => {
            console.log(this.current)
            this.current++
             window.scrollTo(0, 0)
          })
          break
          case 4: 
          return this.$refs.additionRisk.submit()
          .then(data => {
            console.log(this.current)
            this.current++
             window.scrollTo(0, 0)
          })
          break
          case 5: 
          return this.$refs.productAccessory.submit()
          .then(data => {
            console.log(this.current)
            this.$router.push({name: 'productManage'})
          })
          break
        }
      })
      .catch(err => {
        console.warn(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
 @import url('./index.less');
</style>


