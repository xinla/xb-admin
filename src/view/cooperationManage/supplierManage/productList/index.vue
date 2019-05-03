<template>
  <div>
    <xNav/>
    
    <Form class="form " inline :model="query" :label-width="80">
      <FormItem label="在售状态:">
        <Select v-model="query.state" clearable>
            <Option v-for="(value, key) in saleState" :value="value" :key="key">{{ value }}</Option>
        </Select>
      </FormItem>
      <FormItem label="产品类型:">
        <Select v-model="query.type" clearable>
            <Option v-for="(value, key) in productType" :value="value" :key="key">{{ value }}</Option>
        </Select>
      </FormItem>
      <FormItem label="组织名称" style="width:400px">
        <Input v-model="query.name" placeholder="搜索公司"/>
      </FormItem>
       <Button type="info" @click="search()">搜索</Button>
      
    </Form>

    <Table border :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
        <Button
          type="error"
          size="small"
          style="margin-right: 5px"
          @click="goPage('lesseeDetail')"
        >详情</Button>
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
import { getLesseePageByName, getLesseePageByJB } from "@/api/lessee";
import xNav from "@/view/components/nav";

export default {
  components: {
    xNav,
  },
  data() {
    return {
      loading: false,
      query: {
        page: 1,
        size: 10,
        sale: 0,
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
          key: "name",
          align: "center"
        },
        {
          title: "产品名称",
          key: "compayAccountType",
          align: "center",
        },
        {
          title: "分销渠道",
          key: "createTime",
          align: "center"
        },
        {
          title: "投保年龄",
          key: "email",
          align: "center"
        },
        {
          title: "投保期限",
          key: "text",
          align: "center"
        },
        {
          title: "在线投保",
          key: "text",
          align: "center"
        },
        {
          title: "是否在售",
          key: "isActive",
          align: "center",
        },
        {
          title: "最近更新时间",
          key: "text",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align: "center"
        }
      ],
      list: [],
      total: 0,
      saleState: {
        0: '在售',
        0: '停售',
      },
      productType: {
        0: '在售',
        0: '停售',
      }
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
@import url("./index.less");
</style>
