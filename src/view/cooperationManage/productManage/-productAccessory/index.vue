<template>
  <div>
    <xNav/>

    <productAccessory/>
  </div>
</template>

<script>
import productAccessory from '../components/productAccessory'
import xNav from '../components/nav'
export default {
  components:{
    xNav,
    productAccessory,
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
