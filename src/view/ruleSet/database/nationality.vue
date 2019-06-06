<template>
  <div>

    <table class="ac">
      <tr>
        <th style="width: 25%;">代码</th>
        <th style="width: 30%;">内容</th>
        <th style="width: 45%;">两位代码</th>
      </tr>
      <tr v-for="(item, index) in list" :key="index">
        <td>{{item.nationalCode}}</td>
        <td>{{item.nationalName}}</td>
        <td>{{item.nationalCodeAbbr}}</td>
      </tr>
    </table>

  </div>
</template>

<script>
import { nationalityTable } from "@/api/rulesSet/nationality";

export default {
  components:{},
  props:{},
  data(){
    return {
      list: []
    }
  },
  computed:{},
  watch:{},
  mounted(){
    this.getData()
  },
  methods:{
    getData() {
      nationalityTable().then(data => {
        // console.log(data)
        this.list = data.list
      })
    }
  }
}
</script>
<style lang="less" scoped>
table{
  width: 100%;
  line-height: 50px;
}
td{
  border-bottom: 1px solid #eee;
}
</style>
