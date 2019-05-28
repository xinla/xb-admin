<template>
  <div>

    <table class="ac">
      <tr>
        <th>代码</th>
        <th>内容</th>
        <th>两位代码</th>
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
</style>
