<template>
  <div>
    <!-- <div class="title">租户列表</div> -->

    <Row style="padding-bottom: 10px;">
      <Col span="16">
        <Button type="info" @click="goPage('createLessee')">新建租户</Button>
      </Col>
      <Col span="8">
        <Input v-model="query.name" placeholder="搜索公司" style="width:73%; margin-right: 10px;"/>
        <Button type="info" @click="search()">搜索</Button>
      </Col>
    </Row>

    <Table border :loading="loading" :columns="columns" :data="list">

      <template slot-scope="{ row }" slot="name">
        <div
          class="a"
          @click="goPage('companyDetail', {id: row.id})"
        >{{row.name}}</div>
      </template>

      <template slot-scope="{ row }" slot="compayAccountType">
        {{row.compayAccountType | compayAccountType}}
      </template>

      <template slot-scope="{ row }" slot="businessType">
        {{row.businessType | businessType}}
      </template>

      <template slot-scope="{ row }" slot="isActive">
        {{row.outageTime ? '停用' : '正常'}}
      </template>

      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="goPage('createLessee', {id: row.id})">编辑</Button>
        <Button
          type="error"
          size="small"
          style="margin-right: 5px"
          @click="goPage('lesseeDetail', {id: row.id})"
        >详情</Button>
        <Button type="error" size="small" @click="set(row)">{{row.outageTime ? '启用' : '停用'}}</Button>
      </template>

    </Table>

    <Page
      :total="total"
      show-elevator
      show-total
      style="text-align:center;margin-top:20px;"
      @on-change="getData"
    />
  </div>
</template>

<script>
import { getLesseePage, setState } from "@/api/lessee";

const compayAccountType = [
  {
    label: "体验",
    value: 0
  },
  {
    label: "商用",
    value: 1
  }
]
const businessType = [
  {
    label: "保险",
    value: 0
  },
  {
    label: "信贷",
    value: 1
  },
  {
    label: "基金",
    value: 2
  }
]
const isActive = [
  {
    label: "正常",
    value: 0
  },
  {
    label: "停用",
    value: 1
  }
]

export default {
  filters: {
    compayAccountType(val) {
      return compayAccountType[val] && compayAccountType[val].label
    },
    businessType(val) {
      return businessType[val] && businessType[val].label
    },
  },
  data() {
    return {
      loading: true,
      query: {
        page: 1,
        size: 10,
        name: ""
      },
      columns: [
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "租户名称",
          key: "name",
          slot: "name",
          align: "center",
          minWidth: 160
        },
        {
          title: "租户类型",
          key: "compayAccountType",
          align: "center",
          slot: "compayAccountType",
          filters: compayAccountType,
          filterMultiple: false,
          filterMethod(value, row) {
            return row.compayAccountType == value
          }
        },
        {
          title: "业务类型",
          key: "businessType",
          align: "center",
          slot: "businessType",
          filters: businessType,
          filterMultiple: false,
          filterMethod(value, row) {
            return row.businessType == value
          }
        },
        {
          title: "超级管理员",
          key: "glname",
          align: "center"
        },
        // {
        //   title: "体验账户",
        //   key: "exname",
        //   align: "center"
        // },
        // {
        //   title: "体验截止时间",
        //   key: "invaTimeEnd",
        //   align: "center"
        // },
        // {
        //   title: "定制模块",
        //   key: "mname",
        //   align: "center"
        // },
        {
          title: "租户状态",
          key: "isActive",
          align: "center",
          slot: "isActive",
        },
        {
          title: "最近更新时间",
          key: "updateTime",
          align: "center",
          minWidth: 80
        },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align: "center"
        }
      ],
      list: [],
      total: 0
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(page) {
      this.loading = true;
      page && (this.query.page = page);
      getLesseePage(this.query).then(data => {
        // console.log(data);
        this.loading = false;
        this.list = data.list;
        this.total = data.total;
      });
    },
    search() {
      this.query.page = 1;
      this.query.size = 10;
      this.getData();
    },
    set(data) {
      let temp = data.outageTime ? 0 : 1
      setState(data.id, temp).then(data => {
        this.getData()
        // console.log(data)
      })
    },
    goPage(name, query) {
      this.$router.push({ name, query });
    },
  }
};
</script>

<style lang="less" scoped>
  @import url("./home.less");
</style>
