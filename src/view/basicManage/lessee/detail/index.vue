<template>
  <div>
    <Tabs type="card">
        <TabPane label="工商信息">
          <businessInfo/>
        </TabPane>
        <TabPane label="品牌信息">
          <brandInfo/>
        </TabPane>
        <TabPane label="账号列表">
          <accountList/>
        </TabPane>
    </Tabs>
  </div>
</template>

<script>
import businessInfo from '@/components/businessInfo/index'
import './detail.less'
export default {
  components: {
    businessInfo,
    brandInfo: () => import('@/components/brandInfo'),
    accountList: () => import('@/components/accountList'),
  }
}
</script>
