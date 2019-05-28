<template>
  <div>
    <xNav/>

  </div>
</template>

<script>
import { getLesseePageByJB } from '@/api/lessee'
import xNav from '@/view/components/nav'
export default {
  components: {
    xNav
  },
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
@import url(./index.less);

</style>
