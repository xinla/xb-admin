<template>
  <div>
    <div>
      <Tag checkable :checked="checked === 0" @on-change="changeTag()">全部</Tag>
      <Tag checkable :checked="checked" @on-change="changeTag()">待支付</Tag>
      <Tag checkable :checked="checked" @on-change="changeTag()">已支付</Tag>
      <Tag checkable :checked="checked" @on-change="changeTag()">待生效</Tag>
      <Tag checkable :checked="checked" @on-change="changeTag()">生效中</Tag>
      <Tag checkable :checked="checked" @on-change="changeTag()">已完成</Tag>
    </div>
    <Table border :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">生效</Button>
        <Button type="error" size="small" @click="set(index)">关闭交易</Button>
      </template>
    </Table>
    <div class="ar">合计：￥13,000,000.0</div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      checked: 0,
      columns: [
        {
          type: 'selection',
          align: "center",
          width: 50
        },
        {
          title: "订单号",
          key: "name",
          align: "center"
        },
        {
          title: "租户名称",
          key: "text",
          align: "center"
        },
        {
          title: "订单类型",
          key: "compayAccountType",
          align: "center",
          filters: [
            {
              label: "体验服务",
              value: 1
            },
            {
              label: "基础应用服务",
              value: 2
            },
            {
              label: "高级应用服务",
              value: 1
            },
            {
              label: "超级应用服务",
              value: 2
            },
            {
              label: "定制服务",
              value: 1
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 0) {
              return row.compayAccountType == 0;
            } else if (value === 1) {
              return row.compayAccountType == 1;
            }
          }
        },
        {
          title: "下单时间",
          key: "name",
          align: "center"
        },
        {
          title: "订单有效期",
          key: "createTime",
          align: "center"
        },
        {
          title: "订单金额（元）",
          key: "email",
          align: "center"
        },
        {
          title: "发票状态",
          key: "compayAccountType",
          align: "center",
          filters: [
            {
              label: "待支付",
              value: 1
            },
            {
              label: "已支付",
              value: 2
            },
            {
              label: "待生效",
              value: 1
            },
            {
              label: "生效中",
              value: 2
            },
            {
              label: "已完成",
              value: 1
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 0) {
              return row.compayAccountType == 0;
            } else if (value === 1) {
              return row.compayAccountType == 1;
            }
          }
        },
        {
          title: "操作",
          slot: "action",
          width: 100,
          align: "center"
        }
      ],
      list: [],
    }
  },
  computed:{},
  watch:{},
  created(){},
  mounted(){},
  methods:{
    changeTag(index) {
      
    }
  }
}
</script>
<style lang="less" scoped>
  /deep/.ivu-tag-checked{
    background: #2d8cf0;
    .ivu-tag-text{
      color: #fff !important;
    }
  }
  
</style>
