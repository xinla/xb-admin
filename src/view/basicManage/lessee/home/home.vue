<template>
  <div class="x-h100">
    <div style="padding-bottom: 24px; background: #f5f7f9;">
      <Input v-model="query.name" class="search-input" placeholder="请输入公司关键字搜索" style="width:280px;" />
      <Button type="primary" shape="circle" icon="ios-search" @click="search()"></Button>
      <Button type="primary" class="fr" @click="goPage('createLessee')">新建租户</Button>
    </div>

    <Table :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="name">
        <div class="a" @click="goPage('lesseeDetail', {id: row.id})">{{row.name}}</div>
      </template>

      <template
        slot-scope="{ row }"
        slot="compayAccountType"
      >{{row.compayAccountType | compayAccountType}}</template>

      <template slot-scope="{ row }" slot="businessType">{{row.businessType | businessType}}</template>

      
      <template slot-scope="{ row }" slot="isActive">
        <Tag type="dot" :color="row.outageTime ? 'error' : 'success'">{{row.outageTime ? '停用' : '正常'}}</Tag>
      </template>

      <template slot-scope="{ row }" slot="action">
        <span class="button-pri" @click="goPage('lesseeDetail', {id: row.id})">详情</span>
        <span class="button-pri" @click="goPage('createLessee', {id: row.id})">编辑</span>
        <span class="button-pri" @click="set(row)">{{row.outageTime ? '启用' : '停用'}}</span>
        <span class="button-err" @click="remove(row)">删除</span>
      </template>
    </Table>

    <Page
      :total="total"
      show-elevator
      show-total
      class="c-page"
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
    label: "基础",
    value: 1
  },
  {
    label: "高级",
    value: 2
  },
  {
    label: "旗舰",
    value: 3
  }
];
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
];
const isActive = [
  {
    label: "停用",
    value: 1
  },
  {
    label: "正常",
    value: 2
  }
];

export default {
  filters: {
    compayAccountType(val) {
      return compayAccountType[val] && compayAccountType[val].label;
    },
    businessType(val) {
      return businessType[val] && businessType[val].label;
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
          minWidth: 140
        },
        {
          title: "租户类型",
          key: "compayAccountType",
          slot: "compayAccountType",
          filters: compayAccountType,
          filterMultiple: false,
          filterMethod(value, row) {
            return row.compayAccountType == value;
          }
        },
        {
          title: "业务类型",
          key: "businessType",
          slot: "businessType",
          filters: businessType,
          filterMultiple: false,
          filterMethod(value, row) {
            return row.businessType == value;
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
          slot: "isActive"
        },
        {
          title: "最近更新时间",
          key: "updateTime",
          minWidth: 80
        },
        {
          title: "操作",
          slot: "action",
          width: 220,
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
        this.total = ~~data.total;
      });
    },
    search() {
      this.query.page = 1;
      this.query.size = 10;
      this.getData();
    },
    set(data) {
      let state = data.outageTime ? 2 : 1;
      setState(data.id, state).then(res => {
        this.$Message.success("操作成功");
        this.getData();
        // console.log(data)
      });
    },
    goPage(name, query) {
      this.$router.push({ name, query });
    },
    remove(data) {
      if (!data.outageTime) {
        this.$Message.error("当前租户正在启用中，无法删除，请停用后再尝试");
      } else {
        this.$Modal.confirm({
          title: "提示",
          content: "是否删除当前租户？删除后该租户下所有成员无法登陆现保系统",
          onOk: () => {
            setState(data.id, 0).then(data => {
              this.getData();
              this.$Message.success("操作成功");
            });
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./home.less");
</style>
