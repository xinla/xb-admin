<template>
  <div>
    <div class="title">供应商列表</div>

    <Row style="padding-bottom: 10px;">
      <Col span="14">
        <Button type="info" @click="goPage('createSupplier')">新建供应商</Button>
      </Col>
      <Col span="8">
        <Input v-model="query.name" placeholder="搜索公司" style="width:73%; margin-right: 10px;"/>
        <Button type="info" @click="search()">搜索</Button>
      </Col>
    </Row>

    <Table border :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="typeRule">
        {{row.typeRule | typeRule}}
      </template>

      <template slot-scope="{ row }" slot="name">
        <div class="a" @click="goPage('businessInfo', {id: row.id})">
          {{row.name}}
        </div>
      </template>
      
      <template slot-scope="{ row }" slot="productNum">
        <div class="a" @click="goPage('productList', {id: row.id})">
          {{row.productNum}}
        </div>
      </template>
      
      <template slot-scope="{ row }" slot="saleProductNum">
        <div class="a" @click="goPage('productList', {id: row.id})">
          {{row.saleProductNum}}
        </div>
      </template>

      <template slot-scope="{ row }" slot="cooperationCompanyNum">
        <div class="a" @click="showCooperationCompany(row.id)">
          {{row.cooperationCompanyNum}}
        </div>
      </template>

      <template slot-scope="{ row }" slot="action">
        <Button
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="goPage('createSupplier', {id: row.id})"
        >编辑</Button>
        <Button
          type="error"
          size="small"
          style="margin-right: 5px"
          @click="goPage('businessInfo', {id: row.id})"
        >详情</Button>
      </template>
    </Table>

    <Page
      :total="total"
      show-elevator
      show-total
      style="text-align:center;margin-top:20px;"
      @on-change="getData"
    />

    <div v-show="cooperationCompanShow">
      <div>合作企业 <span class="fr" @click="close">x</span></div>
      <Table border :columns="cooperationCompanyColumns" :data="cooperationCompanyList">
        <template slot-scope="{ row }" slot="name">
          <div class="a" @click="goPage('businessInfo', {id: row.id})">
            {{row.name}}
          </div>
        </template>
      </Table>

      <Page
        :total="cooperationCompanyTotal"
        show-elevator
        show-total
        style="text-align:center;margin-top:20px;"
        @on-change="getDataCooperationCompany"
      />
    </div>

  </div>

</template>

<script>
import { getSupplierPage, getCooperationCompanyPage } from "@/api/supplier";

const typeRule = [
  {
    value: 0,
    label: '寿险'
  },
  {
    value: 1,
    label: '财险'
  }
]
const distributionChannel = {
  0: '经代',
  1:' 互联网',
  2: '个险',
  3: '银保'
}

export default {
  name: "home",
  filters: {
    typeRule(val) {
      return typeRule[val].label
    },
    distributionChannel(val) {
      return distributionChannel[val]
    }
  },
  data() {
    return {
      loading: true,
      query: {
        page: 1,
        size: 10,
        type: "1",
        name: ""
      },
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "供应商名称",
          slot: "name",
          minWidth: 80,
          align: "center"
        },
        {
          title: "供应商类型",
          slot: "typeRule",
          align: "center",
          filters: typeRule,
          filterMultiple: false,
          filterMethod(value, row) {
            return row.typeRule == value;
          }
        },
        {
          title: "分销渠道",
          key: "distributionChannel",
          align: "center"
        },
        {
          title: "产品总数",
          slot: "productNum",
          align: "center"
        },
        {
          title: "在售产品数",
          slot: "saleProductNum",
          align: "center"
        },
        {
          title: "合作企业数",
          slot: "cooperationCompanyNum",
          align: "center"
        },
        {
          title: "分公司数量",
          key: "filialeNum",
          align: "center"
        },
        {
          title: "最近更新时间",
          key: "updateTime",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          minWidth: 60,
          align: "center"
        }
      ],
      list: [],
      total: 0,

      cooperationCompanyQuery: {
        page: 1,
        size: 10,
        supplierId: ''
      },
      cooperationCompanyColumns: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "合作租户名称",
          slot: "name",
          minWidth: 80,
          align: "center"
        },
        {
          title: "合作时间",
          key: "createTime",
          align: "center"
        }
      ],
      cooperationCompanyList: [],
      cooperationCompanyTotal: 0,
      cooperationCompanShow: false
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(page) {
      this.loading = true;
      page && (this.query.page = page);
      getSupplierPage(this.query).then(data => {
        console.log(data);
        this.loading = false;
        this.list = data.list;
        this.total = data.total;
      });
    },
    getDataCooperationCompany(page) {
      page && (this.cooperationCompanyQuery.page = page);
      getCooperationCompanyPage(this.cooperationCompanyQuery).then(data => {
        console.log(data);
        this.cooperationCompanyList = data.list;
        this.cooperationCompanyTotal = data.total;
      });
    },
    showCooperationCompany(id) {
      this.cooperationCompanyQuery.page = 1
      this.cooperationCompanyQuery.supplierId = id
      this.cooperationCompanShow = true
      this.getDataCooperationCompany()
    },
    close() {
      this.cooperationCompanShow = false
    },
    search() {
      this.query.page = 1;
      this.query.size = 10;
      this.getData()
    },
    goPage(name, query) {
      this.$router.push({ name, query });
    },
  }
};
</script>

<style lang="less" scoped>
.title {
  padding: 0px 0px 20px 10px;
  font-size: 20px;
}
</style>
