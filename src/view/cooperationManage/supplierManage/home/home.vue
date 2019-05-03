<template>
  <div>
    <div class="title">租户列表</div>

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
  </div>
</template>

<script>
import { getLesseePage, getLesseePageByJB } from "@/api/lessee";
export default {
  name: "home",
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
          key: "name",
          minWidth: 80,
          align: "center"
        },
        {
          title: "产品类型",
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
          title: "分销渠道",
          key: "createTime",
          align: "center"
        },
        {
          title: "体验产品数量账户",
          key: "email",
          align: "center"
        },
        {
          title: "在售产品数",
          key: "text",
          align: "center"
        },
        {
          title: "合作企业数",
          key: "text",
          align: "center"
        },
        {
          title: "分公司数量",
          key: "isActive",
          align: "center"
        },
        {
          title: "最近更新时间",
          key: "text",
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
      total: undefined
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(page) {
      this.loading = true;
      page && (this.query.page = page);
      getLesseePage(this.query).then(data => {
        console.log(data);
        this.loading = false;
        this.list = data.list;
        this.total = data.total;
      });
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
