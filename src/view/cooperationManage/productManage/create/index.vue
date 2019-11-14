<template>
  <div ref="container" class="container">
    <div class="button-wrap ac">
      <Button
        class="button"
        size="large"
        :type="current === 0 && 'primary'"
        @click="current = 0"
      >基本信息</Button>
      <Button
        class="button"
        size="large"
        :type="current === 1 && 'primary'"
        @click="switchTo(1)"
      >投保规则</Button>
      <Button
        class="button"
        size="large"
        :type="current === 2 && 'primary'"
        @click="switchTo(2)"
      >保费计算器</Button>
      <Button
        class="button"
        size="large"
        :type="current === 3 && 'primary'"
        @click="switchTo(3)"
      >费率表</Button>
      <Button
        class="button"
        size="large"
        :type="current === 4 && 'primary'"
        @click="switchTo(4)"
      >产品说明</Button>
      <Button
        class="button"
        size="large"
        :type="current === 5 && 'primary'"
        @click="switchTo(5)"
      >附加和捆绑</Button>
    </div>

    <baseInfo
      class="item bw br"
      style="padding: 20px 0 1px 0;"
      ref="baseInfo"
      v-show="current === 0"
      :key="key + 1"
    />
    <insuranceRules
      class="item"
      ref="insuranceRules"
      v-show="current === 1"
      :key="key + 2"
    />
    <premiumCalculator
      class="item"
      ref="premiumCalculator"
      v-if="current === 2"
      :key="key + 3"
    />
    <rateSheet
      class="item bw br"
      style="padding-bottom: 18px; height: auto; max-height: 100%;"
      ref="rateSheet"
      v-if="current === 3"
      :key="key + 4"
    />
    <productExplain
      class="item"
      ref="productExplain"
      v-if="current === 4"
      :key="key + 5"
    />
    <additionRisk
      class="item"
      ref="additionRisk"
      v-if="current === 5"
      :key="key + 6"
    />
  </div>
</template>

<script>
import baseInfo from "../components/baseInfo";

export default {
  components: {
    baseInfo,
    insuranceRules: () => import("../components/insuranceRules"),
    rateSheet: () => import("../components/rateSheet"),
    productExplain: () => import("../components/productExplain"),
    additionRisk: () => import("../components/additionRisk"),

    premiumCalculator: () => import("../components/premiumCalculator")
  },
  data() {
    return {
      current: 0
      // firstArray: []
    };
  },
  computed: {
    key() {
      return Math.floor(Math.random() * 100);
    }
  },
  // mounted() {
  //     console.log(this.key)
  // },
  methods: {
    switchTo(current) {
      if (!this.$route.query.id) {
        this.$Message.error("产品基本属性未设定，无法保存！");
        return;
      }
      this.current = current;
    }
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
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>


