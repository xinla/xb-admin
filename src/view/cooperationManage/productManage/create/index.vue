<template>
<div ref="container" class="container">
  
  <Steps :current="current">
      <Step title="基本信息" content="基本信息">
      </Step>
      <Step title="投保规则" content="投保规则"></Step>
      <Step title="费率计算" content="费率计算"></Step>
      <Step title="产品说明" content="产品说明"></Step>
      <Step title="附加险" content="附加险"></Step>
      <Step title="产品附件" content="产品附件"></Step>
  </Steps>

  <baseInfo ref="baseInfo" v-show="current === 0" :key="key + 1" />
  <insuranceRules ref="insuranceRules" v-show="current === 1" :key="key + 2" />
  <rateCalculation ref="rateCalculation" v-show="current === 2" :key="key + 3" />
  <productExplain ref="productExplain" v-show="current === 3" :key="key + 4" />
  <additionRisk ref="additionRisk" v-show="current === 4" :key="key + 5" />
  <productAccessory ref="productAccessory" v-show="current === 5" :key="key + 6" />

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
    rateCalculation: () => import('../components/rateCalculation'),
    productExplain: () => import('../components/productExplain'),
    additionRisk: () => import('../components/additionRisk'),
    productAccessory: () => import('../components/productAccessory'),
  },
  data() {
    return {
      current: 1,
    }
  },
  computed: {
    key() {
      return Math.floor(Math.random()*100)
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
            // console.log('bs data', data)
            // data && (this.$route.query.id = data)
            // console.log(typeof (this.$route.query.id), this.$route.query.id)
            this.current++
            // console.log('current', this.current)
            return Promise.resolve()
          })
          break
          case 1: 
          return this.$refs.insuranceRules.submit()
          .then(data => {
            this.current++
            return Promise.resolve()
          })
          break
          case 2: 
          return this.$refs.rateCalculation.submit()
          .then(data => {
            this.current++
            return Promise.resolve()
          })
          break
          case 3: 
          return this.$refs.productExplain.submit()
          .then(data => {
            this.current++
          })
          break
          case 4: 
          return this.$refs.additionRisk.submit()
          .then(data => {
            this.current++
          })
          break
          case 5: 
          return this.$refs.productAccessory.submit()
          .then(data => {
            this.$router.push({name: 'productManage'})
          })
          break
        }
      })
      .then(() => {
        this.$Message.info('保存成功');
        // console.log(this.current)
        this.$refs.container.scrollTop = 0
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


