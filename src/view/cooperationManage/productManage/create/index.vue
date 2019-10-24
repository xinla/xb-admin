<template>
<div ref="container" class="container">

  <div class="button-wrap">
    <button :class="['button', {current: current === 0}]" type="button" @click="current = 0">基本信息</button>
    <button :class="['button', {current: current === 1}]" type="button" @click="switchTo(1)">投保规则</button>
    <button :class="['button', {current: current === 2}]" type="button" @click="switchTo(2)">保费计算器</button>
    <button :class="['button', {current: current === 3}]" type="button" @click="switchTo(3)">费率表</button>
    <button :class="['button', {current: current === 4}]" type="button" @click="switchTo(4)">产品说明</button>
    <button :class="['button', {current: current === 5}]" type="button" @click="switchTo(5)">附加和捆绑</button>
  </div>

  <baseInfo ref="baseInfo" v-show="current === 0" :key="key + 1" />
  <insuranceRules ref="insuranceRules" v-show="current === 1" :key="key + 2" />
  <premiumCalculator ref="premiumCalculator" v-show="current === 2" :key="key + 3" />
  <rateSheet ref="rateSheet" v-show="current === 3" :key="key + 4" />
  <productExplain ref="productExplain" v-show="current === 4" :key="key + 5" />
  <additionRisk ref="additionRisk" v-show="current === 5" :key="key + 6" />
</div>
</template>

<script>
import baseInfo from '../components/baseInfo'

export default {
  components:{
    baseInfo,
    insuranceRules: () => import('../components/insuranceRules'),
    rateSheet: () => import('../components/rateSheet'),
    productExplain: () => import('../components/productExplain'),
    additionRisk: () => import('../components/additionRisk'),

    premiumCalculator: () => import('../components/premiumCalculator'),
  },
  data() {
    return {
      current: 0,
      // firstArray: []
    }
  },
  computed: {
    key() {
      return Math.floor(Math.random()*100)
    }
  },
  // mounted() {
  //     console.log(this.key)
  // },
  methods: {
    switchTo(current) {
      if (!this.$route.query.id) {
        this.$Message.error("产品基本属性未设定，无法保存！");
        return
      }
      this.current = current
    },
    // submit(current) {
    //   Promise.resolve()
    //   .then(data => {
    //     switch (current) {
    //       case 0: 
    //       return this.$refs.baseInfo.submit()
    //       .then(data => {
    //         // console.log('bs data', data)
    //         // data && (this.$route.query.id = data)
    //         // console.log(typeof (this.$route.query.id), this.$route.query.id)
    //         this.current++
    //         if (!this.firstArray.includes(this.current)) {
    //           this.firstArray.push(this.current)
    //           this.$route.query.edit && this.$refs.insuranceRules.getData()
    //         }
    //         // this.$refs.baseInfo.getData()
    //         // console.log('current', this.current)
    //       })
    //       break
    //       case 1: 
    //       return this.$refs.insuranceRules.submit()
    //       .then(data => {
    //         this.current++
    //         if (!this.firstArray.includes(this.current)) {
    //           this.firstArray.push(this.current)
    //           this.$route.query.edit && this.$refs.rateCalculation.getData()
    //         }
    //       })
    //       break
    //       case 2: 
    //       return this.$refs.rateCalculation.submit()
    //       .then(data => {
    //         this.current++
    //         if (!this.firstArray.includes(this.current)) {
    //           this.firstArray.push(this.current)
    //           this.$route.query.edit && this.$refs.productExplain.getData()
    //         }
    //       })
    //       break
    //       case 3: 
    //       return this.$refs.productExplain.submit()
    //       .then(data => {
    //         this.current++
    //         if (!this.firstArray.includes(this.current)) {
    //           this.firstArray.push(this.current)
    //           this.$route.query.edit && this.$refs.additionRisk.getData()
    //         }
    //       })
    //       break
    //       case 4: 
    //       return this.$refs.additionRisk.submit()
    //       .then(data => {
    //         this.current++
    //         if (!this.firstArray.includes(this.current)) {
    //           this.firstArray.push(this.current)
    //           this.$route.query.edit && this.$refs.productAccessory.getData()
    //         }
    //       })
    //       break
    //       case 5: 
    //       return this.$refs.productAccessory.submit()
    //       .then(data => {
    //         this.$router.push({name: 'productManage'})
    //       })
    //       break
    //     }
    //   })
    //   .then(() => {
    //     this.$Message.info('保存成功');
    //     // console.log(this.current)
    //     this.$refs.container.scrollTop = 0
    //   })
    //   .catch(err => {
    //     console.warn(err)
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
 @import url('./index.less');
</style>


