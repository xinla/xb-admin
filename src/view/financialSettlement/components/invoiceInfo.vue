<template>
  <div v-show="value">
    <div class="ar cp" @click="close">x</div>
    <Row style="padding-bottom: 10px;">
      <Col span="12">
        <div>发票信息</div>
        <table>
          <tr>
            <th>发票抬头：</th>
            <td>山东圣安保险销售服务有限公司</td>
          </tr>
          <tr>
            <th>税号：</th>
            <td>山东圣安保险销售服务有限公司</td>
          </tr>
          <tr>
            <th>单位地址：</th>
            <td>安徽合肥大学科技园</td>
          </tr>
          <tr>
            <th>电话号码：</th>
            <td>025-200-4388</td>
          </tr>
          <tr>
            <th>开户银行：</th>
            <td>招商银行合肥支行</td>
          </tr>
          <tr>
            <th>银行账户：</th>
            <td>6311 3333 0000 1234 678</td>
          </tr>
        </table>
      </Col>
      <Col span="12">
        <div>邮寄信息</div>
        <table>
          <tr>
            <th>联系人：</th>
            <td>山东圣安保险销售服务有限公司</td>
          </tr>
          <tr>
            <th>电话号码：</th>
            <td>165432564
            </td>
          </tr>
          <tr>
            <th>邮寄地址：</th>
            <td>安徽合肥大学科技园</td>
          </tr>
        </table>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  components:{},
  props:{
    value: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
    }
  },
  computed:{},
  watch:{},
  created(){},
  mounted(){},
  methods:{
    close() {
      this.$emit('input', false)
    },
  }
}
</script>
<style lang="less" scoped>
</style>
