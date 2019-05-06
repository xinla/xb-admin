<template>
  <div>
    <xNav/>

    <insuranceRules/>

  </div>
</template>

<script>
import insuranceRules from '../components/insuranceRules'
import xNav from '../components/nav'
export default {
  components:{
    xNav,
    insuranceRules,
  },
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style lang="less" scoped>
</style>
