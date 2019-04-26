<template>
  <div>

    <businessInfo/>

  </div>
</template>

<script>
import { getLesseePageByName, getLesseePageByJB } from '@/api/lessee'
import businessInfo from '@/components/businessInfo'
export default {
  components: {
    businessInfo,
  },
  data() {
    return {

    }
  },
  methods: {
    goPage(name) {
      console.log(1)
      this.$router.push({name})
    },
  }
}
</script>

<style lang="less" scoped>
  .title{
    padding: 0px 0px 20px 10px;
    font-size: 20px;
  }
</style>
