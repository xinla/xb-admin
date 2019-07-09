<template>
  <div>
    <Table border :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="type">{{row.type | type}}</template>
      <template slot-scope="{ row }" slot="imgUrl">
        <img class="img" v-for="(item, index) in (row.imgUrl ? row.imgUrl.split(',') : [])" :src="item" :key="index">
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="goDetail(row.id)">详情</Button>
      </template>
    </Table>

    <Page :total="total" show-elevator show-total style="text-align:center;margin-top:20px;" @on-change="getData"/>
  </div>
</template>

<script>
import { saveFeedback, getFeedbackPage } from "@/api/systemHelp";

const type = [
  {
    label: "建议",
    value: 0
  },
  {
    label: "问题",
    value: 1
  }
];
export default {
  filters: {
    type(val) {
      return type[val].label
    }
  },
  data() {
    return {
      loading: false,
      query: {
        page: 1,
        size: 10
      },
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 50
        },
        {
          title: "分类",
          slot: "type",
          align: "center",
          filters: type,
          filterMultiple: false,
          filterMethod(value, row) {
            return row.type === value;
          }
        },
        {
          title: "内容",
          key: "content",
          align: "center"
        },
        {
          title: "图片",
          slot: "imgUrl",
          align: "center"
        },
        {
          title: "机型数据",
          key: "modelData",
          align: "center"
        },
        {
          title: "所属用户",
          key: "userId",
          align: "center"
        },
        {
          title: "所属租户",
          key: "companyId",
          align: "center"
        },
        {
          title: "时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          minWidth: 30,
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
      page && (this.query.page = page)
      this.loading = true;
      getFeedbackPage(this.query).then(res => {
        // console.log("FeedbackPage: ", res);
        this.loading = false;
        this.list = res.list;
        this.total = res.total
      });
    },
    goDetail(id) {
      this.$router.push({name: 'feedbackDetail', query: {id}})
    }
  }
};
</script>
<style lang="less" scoped>
.img{
  width: 70px;
  height: 70px;
  margin: 2px 5px 2px 0;
}
</style>
