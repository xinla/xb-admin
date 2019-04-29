<template>
  <div>
    <!-- <div class="title">租户列表</div> -->

    <Row style="padding-bottom: 10px;">
      <Col span="14">
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
          @click="$router.push({name: 'companyDetail', query: {id: row.companyId}})"
        >{{row.name}}</div>
      </template>

      <template slot-scope="{ row }" slot="compayAccountType">
        {{row.compayAccountType | compayAccountType}}
      </template>

      <template slot-scope="{ row }" slot="businessType">
        {{row.businessType | businessType}}
      </template>

      <template slot-scope="{ row }" slot="isActive">
        {{row.isActive | isActive}}
      </template>

      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row)">编辑</Button>
        <Button
          type="error"
          size="small"
          style="margin-right: 5px"
          @click="goPage('lesseeDetail', row)"
        >详情</Button>
        <Button type="error" size="small" @click="set(row)">{{row.isActive == 0 ? '停用' : '启用'}}</Button>
      </template>

    </Table>

    <Page
      :total="total"
      show-elevator
      show-total
      style="text-align:center;margin-top:20px;"
      @on-change="getListPage"
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
    isActive(val) {
      return isActive[val] && isActive[val].label
    }
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
        {
          title: "体验账户",
          key: "exname",
          align: "center"
        },
        {
          title: "体验截止时间",
          key: "invaTimeEnd",
          align: "center"
        },
        {
          title: "定制模块",
          key: "mname",
          align: "center"
        },
        {
          title: "租户状态",
          key: "isActive",
          align: "center",
          slot: "isActive",
          filters: isActive,
          filterMultiple: false,
          filterMethod(value, row) {
            return row.isActive == value
          }
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
    this.getList();
  },
  methods: {
    getList() {
      getLesseePage(this.query).then(data => {
        console.log(data);
        this.loading = false;
        this.list = data.list;
        this.total = data.total;
      });
    },
    search() {
      this.loading = true;
      this.query.page = 1;
      this.query.size = 10;
      this.getList();
    },
    edit(data) {
      this.$router.push({name: 'createLessee', query: {id: data.id}})
    },
    goDetail(data) {
      this.$router.push({name: 'createLessee', query: {id: data.id}})
    },
    set(data) {
      data.isActive = data.isActive == 0 ? 1 : 0
      setState(data.id, data.isActive).then(data => {
        console.log(data)
      })
    },
    goPage(name, query) {
      if (name === 'createLessee') {
        this.$router.push({ name });
      } else if (name === 'lesseeDetail') {
        this.$router.push({ name, query: {id: query.id} });
      }
    },
    getListPage(page) {
      this.loading = true;
      this.query.page = page;
      this.getList();
    }
  }
};
</script>

<style lang="less" scoped>
  @import url("./home.less");
</style>
