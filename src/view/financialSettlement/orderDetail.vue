<template>
  <div>
    <div class="title-row">当前套餐</div>
    <div>
      <div>基础应用版</div>
      体验期：2019-03-15 至 2019-08-15
      <div class="fr">上月应结账单：￥10,000.00</div>
    </div>

    <div class="title-row">使用状况</div>

    <div class="title-row">全部订单</div>
    <Table border :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">生效</Button>
        <Button type="error" size="small" @click="set(index)">关闭交易</Button>
      </template>
    </Table>
    <div class="ar">合计：￥13,000,000.0</div>

    <div class="title-row">发票历史</div>
    <Table border :loading="loading" :columns="columnsInvoice" :data="listInvoice">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">开票</Button>
        <Button type="error" size="small" @click="set(index)">邮寄</Button>
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
          title: "订单状态",
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
          title: "上月应结账单（元）",
          key: "text",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          width: 100,
          align: "center"
        }
      ],
      list: [],
      columnsInvoice: [
        {
          type: 'selection',
          align: "center",
          width: 50
        },
        {
          title: "申请时间",
          key: "name",
          align: "center"
        },
        {
          title: "发票月份",
          key: "compayAccountType",
          align: "center",
          filters: [
            {
              label: "2019年12月",
              value: 1
            },
            {
              label: "2019年11月",
              value: 2
            },
            {
              label: "2019年10月",
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
          title: "发票金额（元）",
          key: "name",
          align: "center"
        },
        {
          title: "发票信息",
          key: "name",
          align: "center"
        },
        {
          title: "发票状态",
          key: "compayAccountType",
          align: "center",
          filters: [
            {
              label: "已申请",
              value: 1
            },
            {
              label: "已开票",
              value: 2
            },
            {
              label: "已邮寄",
              value: 1
            },
            {
              label: "已送达",
              value: 2
            },
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
      listInvoice: []
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
