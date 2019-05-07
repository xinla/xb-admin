<template>
  <div>
    <tree-table :expand-type="false" :columns="columns" 
    :selectable="true"
    children-prop="districts"
    select-type="radio"
    :data="list" >
      <!-- <template slot="classify" slot-scope="scope">
        {{scope.row.type}}
      </template> -->
    </tree-table>
  </div>
</template>

<script>
import { getDistrict } from "@/api/common"

export default {
  components:{},
  props:{},
  data(){
    return {
      columns: [
        {
          title: '行政区划代码',
          key: 'adcode',
          minWidth: '130px',
        },
        {
          title: '行政区划名称',
          key: 'name',
          headerAlign: 'center',
          align: 'center',
        },
        {
          title: '邮编',
          key: 'menuUrl',
          headerAlign: 'center',
          align: 'center'
        },
        // {
        //   title: '操作',
        //   key: 'action',
        //   minWidth: '150px',
        //   type: 'template',
        //   template: 'action',
        //   headerAlign: 'center',
        //   align: 'center'
        // },
      ],
      list: [],
    }
  },
  computed:{},
  watch:{},
  mounted(){
    getDistrict(3).then(res => {
      this.list = res.data.districts[0].districts
      console.log(res.data.districts[0].districts)
    })
  },
  methods:{}
}
</script>
<style lang="less" scoped>
</style>
