<template>
  <div>
    <Tabs type="card">
        <TabPane label="标签一">标签一的内容</TabPane>
        <TabPane label="标签二">标签二的内容</TabPane>
        <TabPane label="标签三">标签三的内容</TabPane>
    </Tabs> 
  </div>
</template>

<script>
const defautlOrgForm = {
  name: "",
  type: "",
  des: "",
  site: "",
  call: ""
};
export default {
  components:{},
  props:{},
  data(){
    return {
      orgForm: Object.assign({}, defautlOrgForm),
      supplierColumns: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '类型名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        },
      ],
      supplierList: [],
      supplierType: '',
      productColumns: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '分类',
          key: 'name',
          align: 'center'
        },
        {
          title: '类型名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        },
      ],
      productList: [],
      productType: '',
    }
  },
  watch:{},
  computed:{},
  created(){},
  mounted(){},
  methods:{}
}
</script>
<style lang="less" scoped>
</style>
