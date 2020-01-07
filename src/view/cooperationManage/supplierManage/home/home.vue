<template>
  <div class="bw br x-h100">
    <Row class="bg pb24">
      <Col span="8">
        <Input v-model="query.name" class="search-input" placeholder="搜索公司" style="width:73%;background: #fff;" />
        <Button type="primary" icon="ios-search" shape="circle" @click="search()"></Button>
      </Col>
      <Col span="16" class="ar">
        <Button type="primary" @click="goPage('createSupplier')">新建品牌</Button>
      </Col>
    </Row>

    <Table :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="typeRule">{{row.typeRule | typeRule}}</template>

      <template slot-scope="{ row }" slot="name">
        <div class="a" @click="goPage('businessInfo', {id: row.id, readOnly: true})">{{row.name}}</div>
      </template>

      <template slot-scope="{ row }" slot="productNum">
        <div class="a" @click="goPage('productList', {id: row.id})">{{row.productNum}}</div>
      </template>

      <template slot-scope="{ row }" slot="saleProductNum">
        <div class="a" @click="goPage('productList', {id: row.id, sale: 1})">{{row.saleProductNum}}</div>
      </template>

      <template slot-scope="{ row }" slot="cooperationCompanyNum">
        <div class="a" @click="showCooperationCompany(row.id)">{{row.cooperationCompanyNum}}</div>
      </template>

      <template slot-scope="{ row }" slot="action">
        <span class="button-pri"
          @click="goPage('businessInfo', {id: row.id, readOnly: true})"
        >详情</span>
        <span class="button-pri" @click="goPage('createSupplier', {id: row.id})">编辑</span>
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

    <dialogBox v-model="cooperationCompanShow">
      <template slot="title">合作企业</template>
      <template>
        <Table border :columns="cooperationCompanyColumns" :data="cooperationCompanyList">
          <template slot-scope="{ row }" slot="name">
            <div class="a" @click="goPage('companyDetail', {id: row.id})">{{row.name}}</div>
          </template>
        </Table>

        <Page
          :total="cooperationCompanyTotal"
          show-elevator
          show-total
          style="text-align:center;margin-top:20px;"
          @on-change="getDataCooperationCompany"
        />
      </template>
    </dialogBox>
  </div>
</template>

<script>
import {
  getSupplierPage,
  getCooperationCompanyPage,
  deleteSupplier
} from "@/api/supplier";
import dialogBox from "@/components/dialogBox";

const typeRule = [
  {
    value: 0,
    label: "寿险"
  },
  {
    value: 1,
    label: "财险"
  }
];
const distributionChannel = {
  0: "经代",
  1: " 互联网",
  2: "个险",
  3: "银保"
};

export default {
  name: "home",
  components: { dialogBox },
  filters: {
    typeRule(val) {
      return typeRule[val].label;
    },
    distributionChannel(val) {
      return distributionChannel[val];
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
          maxWidth: 80,
          align: "center"
        },
        {
          title: "品牌名称",
          slot: "name",
          minWidth: 80,
          align: "center"
        },
        {
          title: "品牌类型",
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
          width: 180,
          align: "center"
        }
      ],
      list: [],
      total: 0,

      cooperationCompanyQuery: {
        page: 1,
        size: 10,
        supplierId: ""
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
    this.getData();
  },
  methods: {
    getData(page) {
      this.loading = true;
      page && (this.query.page = page);
      getSupplierPage(this.query).then(data => {
        // console.log(data);
        this.loading = false;
        this.list = data.list;
        this.total = data.total;
      });
    },
    getDataCooperationCompany(page) {
      page && (this.cooperationCompanyQuery.page = page);
      getCooperationCompanyPage(this.cooperationCompanyQuery).then(data => {
        console.log("CooperationCompany:", data);
        this.cooperationCompanyList = data.list;
        this.cooperationCompanyTotal = data.total;
      });
    },
    showCooperationCompany(id) {
      this.cooperationCompanyQuery.page = 1;
      this.cooperationCompanyQuery.supplierId = id;
      this.cooperationCompanShow = true;
      this.getDataCooperationCompany();
    },
    close() {
      this.cooperationCompanShow = false;
    },
    search() {
      this.query.page = 1;
      this.query.size = 10;
      this.getData();
    },
    goPage(name, query) {
      this.$router.push({ name, query });
    },
    remove(data) {
      if (data.saleProductNum > 0) {
        this.$Message.error("改品牌下存在在售产品，不可删除");
      } else {
        this.$Modal.confirm({
          title: "提示",
          content: "确定要删除吗",
          onOk: () => {
            deleteSupplier(data.id, this.$store.state.user.userId).then(res => {
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
.title {
  padding: 0px 0px 20px 10px;
  font-size: 20px;
}
.ivu-btn-small {
  margin-right: 5px;
}
/deep/.dialog {
  width: 60%;
}
</style>
