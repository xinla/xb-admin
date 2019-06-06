<template>
  <div>
    <xNav/>
    
    <detail/>
  </div>
</template>

<script>
import { getSupplierBrandInformation } from '@/api/supplier'
import xNav from '@/view/components/nav'
import detail from '../create'

const typeRule = {
  0: '寿险',
  1: '财险',
}
export default {
  components: {
    xNav,
    detail
  },
  // filters: {
  //   typeRule(val) {
  //     return typeRule[val]
  //   }
  // },
  // data() {
  //   return {
  //     form: {
  //       id: '', //  供应商id	
  //       name: '', //  供应商名字	
  //       logo: '', //  logo
  //       nameForShort: '', //  供应商简称	
  //       companyAddress: '', //  公司地址	
  //       companyWebsite: '', //  公司网址	
  //       contactPhone: '', //  公司电话	
  //       nationalServicePhone: '', //  全国统一电话	
  //       supplierDescription: '',  //  供应商简介	
  //       professionUrl: '',  //  职业代码表	
  //       createTime: '', //  创建时间	
  //       updateTime: '', //  修改时间	
  //       typeRule: '', //  供应商类型:0寿险,1财险	
  //       supplierAndOrganizationVoList: []	//  子公司集合
  //     },
  //     columns: [
  //       {
  //           title: '名称',
  //           key: 'organizationName',
  //       },
  //       {
  //           title: '地址',
  //           key: 'organizationAddress',
  //       },
  //       {
  //           title: '电话',
  //           key: 'organizationPhone',
  //       },
  //     ],
  //   }
  // },
  // mounted() {
  //   this.form.id = this.$route.query.id
  //   this.getData()
  // },
  // methods: {
  //   getData() {
  //     getSupplierBrandInformation(this.form.id).then(data => {
  //       // console.log('SupplierBrandInformation:', data)
  //       this.form = data
  //       this.form.supplierAndOrganizationVoList = data.supplierAndOrganizationVoList || []
  //     }) 
  //   }
  // }
}
</script>

<style lang="less" scoped>
@import url(./index.less);
</style>
