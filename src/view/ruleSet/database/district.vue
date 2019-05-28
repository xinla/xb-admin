<template>
  <div>
    <tree-table :expand-type="false" :columns="columns" 
    :selectable="true"
    children-prop="districts"
    select-type="radio"
    :data="list" 
    :empty-text="load"
    @tree-icon-click="flod">
    </tree-table>
  </div>
</template>

<script>
import { getDistrict } from "@/api/common"
import { getPostcode } from "@/api/rulesSet/nationality"

export default {
  components:{},
  filters: {
    async postcode(val) {
      return await getPostcode(val)
    }
  },
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
          key: 'postcode',
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
      load: ''
    }
  },
  computed:{},
  watch:{},
  mounted(){
    this.load = '正在加载...'
    getDistrict(3).then(data  => {
      this.list = data
      this.load = ''
      // console.log(data)
    })
  },
  methods:{
    // async postcode(address) {
    //   let res = await getPostcode(address)
    //   console.log(res)
    //   return res
    // }
    flod(row, rowIndex, $event) {
      for (const iterator of row.districts) {
        getPostcode(iterator.name).then(data => {
          // iterator.postcode = data
          this.$set(iterator, 'postcode', data)
        // console.log(iterator)
        // console.log(row)
        })
      }
    }
  },
}
</script>
<style lang="less" scoped>
</style>
