<template>
    <Tabs type="card">
        <TabPane label="工商信息">
          <businessInfo :id="id"/>
        </TabPane>
        <TabPane label="品牌信息">
          <brandInfo :id="id"/>
        </TabPane>
        <TabPane label="账号列表">
          <accountList :id="id"/>
        </TabPane>
    </Tabs>
</template>

<script>
import businessInfo from '@/components/businessInfo/index'

export default {
  components: {
    businessInfo,
    brandInfo: () => import('@/components/brandInfo'),
    accountList: () => import('@/components/accountList'),
  },
  data() {
    return {
      id: ''
    }
  },
  created() {
    this.id = this.$route.query.id
  }
}
</script>
<style lang="less" scoped>
  @import url("./detail.less");
  /deep/.ivu-tabs-tabpane{
    padding: 20px;
  }
</style>
