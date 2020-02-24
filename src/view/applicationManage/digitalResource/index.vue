<template>
  <div class="x-h100" style="padding: 0;">
    <xNav type="digitalResource" />

    <router-view></router-view>
  </div>
</template>

<script>
import xNav from '@/view/components/nav'

export default {
  components:{xNav},
  props:{},
  data(){
    return {
    }
  },
  computed:{},
  watch:{},
  created(){},
  mounted(){},
  methods:{}
}
</script>
<style lang="less" scoped>
</style>
