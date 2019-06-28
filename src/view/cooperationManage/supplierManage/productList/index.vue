<template>
  <div>
    <xNav/>
    
    <Form class="form " inline :model="query" :label-width="80">
      <FormItem label="在售状态:">
        <Select v-model="query.sale" clearable>
            <Option v-for="(value, key) in saleState" :value="key" :key="key">{{ value }}</Option>
        </Select>
      </FormItem>
      <FormItem label="产品类型:">
        <Select v-model="query.typeRuleId" clearable>
            <Option v-for="(item, index) in productType" :value="item.id" :key="index">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="组织名称" style="width:400px">
        <Input v-model="query.nameAndCode" placeholder="搜索公司"/>
      </FormItem>
       <Button type="info" @click="search()">搜索</Button>
      
    </Form>

    <Table border :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="sale">
        {{row.sale | saleStateFilter}}
      </template>

      <template slot-scope="{ row }" slot="onlineApplication">
        <div v-for="(item, index) in JSON.parse(row.onlineApplication)" :key="index">
          {{item.code === 0 ? '现保' : ''}}
          {{item.linkAddress}}
        </div>
      </template>

      <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" :disabled="row.publish === 1" style="margin-right: 5px" @click="goPage('createProduct', {id: row.pid})">编辑</Button>
          <Button type="error" size="small" style="margin-right: 5px" @click="goPage('createProduct', {id: row.pid})">详情</Button>
      </template>
    </Table>

    <Page
      :total="total"
      show-elevator
      show-total
      style="text-align:center;margin-top:20px;"
      @on-Change="getListByPage"
    />
  </div>
</template>

<script>
import { getLesseePageByJB } from "@/api/lessee";
import { getSupplierProductPage } from "@/api/supplier";
import { getTypeRulePage } from '@/api/rulesSet/type'

import xNav from "@/view/components/nav";

const saleState = {
  0: '停售',
  1: '在售',
}

export default {
  filters: {
    saleStateFilter(val) {
      return saleState[val]
    }
  },
  components: {
    xNav,
  },
  data() {
    return {
      loading: false,
      query: {
        page: 1,
        size: 10,
        sale: '',
        nameAndCode: '',
        typeRuleId: '',
        supplierId: ''
      },
      columns: [
        {
          title: '序号',
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "产品代码",
          key: "code",
          align: "center"
        },
        {
          title: "产品名称",
          key: "name",
          align: "center",
        },
        {
          title: "产品类型",
          key: "typeRuleName",
          minWidth: 60,
          align: "center"
        },
        {
          title: "分销渠道",
          key: "distributionChannel",
          align: "center"
        },
        {
          title: "投保年龄",
          key: "applicationAge",
          align: "center"
        },
        {
          title: "投保期限",
          key: "ruleIntervalName",
          align: "center"
        },
        {
          title: "在线投保",
          slot: "onlineApplication",
          minWidth: 60,
          align: "center"
        },
        {
          title: "是否在售",
          slot: "sale", //0在售,1不在
          align: "center",
        },
        {
          title: "最近更新时间",
          key: "updateTime",
          minWidth: 60,
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          width: 130,
          align: "center"
        }
      ],
      list: [],
      total: 0,
      saleState: Object.assign({}, saleState),
      productType: []
    };
  },
  mounted() {
    this.query.supplierId = this.$route.query.id
    this.init()
  },
  methods: {
    init() {
      this.getData()
      getTypeRulePage(1).then(data => {
        // console.log(data)
        this.productType = data.list
      })
    },
    getData() {
      this.loading = true;
      getSupplierProductPage(this.query).then(data => {
        // console.log(data);
        this.loading = false;
        this.list = data.list;
        this.total = data.total;
      });
    },
    search() {
      this.query.page = 1;
      this.getData()
    },
    edit() {},
    goDetail() {},
    set() {},
    goPage(name, query) {
      this.$router.push({ name, query });
    },
    getListByPage(page) {
      this.loading = true;
      this.query.page = page;
      getLesseePage(this.query).then(data => {
        // console.log(data);
        this.loading = false;
        this.list = data.list;
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
