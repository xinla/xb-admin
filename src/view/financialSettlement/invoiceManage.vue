<template>
  <div>
    <!-- <Row style="padding-bottom: 10px;">
      <Col span="18"> 
      </Col>
      <Col span="6">
      </Col>
    </Row> -->
    <div style="text-align:right;padding-bottom: 10px;">
        <Input v-model="query.name" placeholder="搜索公司" style="width:30%; margin-right: 10px;"/>
        <Button type="info" @click="search()">搜索</Button>
    </div>
    <Table border :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">开票</Button>
        <Button type="error" size="small" @click="set(index)">邮寄</Button>
      </template>
    </Table>
    <div class="ar">合计：￥13,000,000.0</div>

    <Page
      :total="100"
      show-elevator
      show-total
      style="text-align:center;margin-top:20px;"
      @on-Change="getListByPage"
    />

    <invoiceState v-model="isInvoiceState"/>
    <invoiceInfo v-model="isInvoiceInfo"/>
    <mailInfo v-model="isMailInfo"/>

  </div>
</template>

<script>
import { getLesseePageByName, getLesseePageByJB } from "@/api/lessee"
import invoiceState from './components/invoiceState'
import invoiceInfo from './components/invoiceInfo'
import mailInfo from './components/mailInfo'
export default {
  components: {
    invoiceState,
    invoiceInfo,
    mailInfo
  },
  data() {
    return {
      loading: true,
      isInvoiceState: false,
      isInvoiceInfo: false,
      isMailInfo: false,
      query: {
        page: 1,
        size: 10,
        type: "1",
        name: ""
      },
      columns: [
        {
          type: 'selection',
          align: "center",
          width: 50
        },
        {
          title: "租户名称",
          key: "name",
          align: "center"
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
          key: "createTime",
          align: "center"
        },
        {
          title: "发票信息",
          key: "email",
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
          width: 200,
          align: "center"
        }
      ],
      list: []
    };
  },
  mounted() {
    //
    getLesseePageByName(this.query).then(data => {
      // debugger
      console.log(data);
      this.loading = false;
      this.list = data.list;
    });
  },
  methods: {
    search() {
      this.loading = true;
      this.query.page = 1;
      this.query.size = 1;
      getLesseePageByName(this.query).then(data => {
        console.log(data);
        this.loading = false;
        this.list = data.list;
      });
    },
    edit() {},
    goDetail() {},
    set() {},
    goPage(name) {
      this.$router.push({ name });
    },
    getListByPage(page) {
      console.log(1);
      this.loading = true;
      this.query.page = page;
      getLesseePage(this.query).then(data => {
        console.log(data);
        this.loading = false;
        this.list = data.list;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ivu-select {
  margin-right: 10px;
}
</style>
