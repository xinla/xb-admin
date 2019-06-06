<template>
  <businessInfo :type="type" :key="type"/>
</template>

<script>
import businessInfo from '@/components/businessInfo'

export default {
  components: {
    businessInfo,
  },
  data() {
    return {
      type: ''
    }
  },
  mounted() {
    this.type = this.$route.query.type
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  .title{
    padding: 0px 0px 20px 10px;
    font-size: 20px;
  }
</style>
