<template>
  <div>
    <xNav/>
    
    <brandInfo/>

  </div>
</template>

<script>
import { getLesseePageByName, getLesseePageByJB } from '@/api/lessee'
import xNav from '@/view/components/nav'
import brandInfo from '@/components/brandInfo'
export default {
  components: {
    brandInfo,
    xNav
  },
  data() {
    return {
      disabled: true,
      zoomIndex: undefined,
      company: {
        fullName: '',
        shortName: '',
        englishFullName: '',
        englishShortName: '',
        registerArea: '',
        site: '',
        registerDate: '',
        realDate: '',
        introduction: '安徽据说牛信息科技有限公司是一家致力于企业客户营销升级的综合创新服务公司。总部位于安徽省合肥市高新区国家大学科技园。公司成立于2018年10月9日，汇聚了来自北上广有着丰富经验的工程师们与营销团队。在短短2个月的时间内，公司就申请了数项发明专利与30余项软件著作权。公司秉着“拥抱变化，赋能创新”的核心价值观，专注于各类企业的营销升级与推广，为企业客户带来价值，重塑大数据营销领域新气象！'
      },
      columns: [
        {
            title: '颁发机构',
            key: 'name',
        },
        {
            title: '荣誉名称',
            key: 'name',
        },
        {
            title: '获奖时间',
            key: 'name',
        },
        {
            title: '图片/附件',
            slot: 'action',
            key: 'name',
        },
      ],
      list: []
    }
  },
  methods: {
    goPage(name) {
      console.log(1)
      this.$router.push({name})
    },
    zoom(index) {
      this.zoomIndex = index
    },
    test(){
      console.log(1)
    }
  }
}
</script>

<style lang="less" scoped>
@import url(./index.less);
  .title{
    padding: 0px 0px 20px 10px;
    font-size: 20px;
  }
</style>
