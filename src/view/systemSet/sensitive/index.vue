<template>
  <div class="x-h100">
    <div class="bg pb24 ar">
    <Button
      type="primary"
      @click="isModal = true, form = {}"
    >新建敏感词</Button>
    </div>

    <Table :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="content">
        <div v-html="row.content"></div>
      </template>
      <template slot-scope="{ row }" slot="isDisable">{{!row.isDisable ? "是" : "否"}}</template>
      <template slot-scope="{ row, index }" slot="action">
        <span class="button-pri" @click="edit(row.id)">编辑</span>
        <span class="button-err" @click="remove(row, index)">删除</span>
      </template>
    </Table>

    <Page
      :total="total"
      show-elevator
      show-total
      class="c-page"
      @on-change="getData"
    />

    <dialogBox v-model="isModal">
      <div slot="title">新建敏感词</div>
      <create :formData="form" style="width: 320px;" :key="form.id || 0" @submit="getData()" />
    </dialogBox>
  </div>
</template>

<script>
import { getSensitivePage, deleteSensitive } from "@/api/sensitive";
import { formatDate } from "@/libs/tools";
import create from "./create";

export default {
  filters: {
    transTime(time) {
      return formatDate(time, "year");
    }
  },
  components: {
    create
  },
  props: {},
  data() {
    return {
      query: {
        page: 1,
        size: 10
      },
      loading: false,
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        },
          {
            title: "敏感词",
            key: "sensitiveWord",
            align: "center"
          },
        {
          title: "是否启用",
          slot: "isDisable", //  0是,1否
          align: "center"
        },
        {
          title: "创建时间",
          key: "createdAt",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      list: [],
      total: 0,
      isModal: false,
      form: {},
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(page) {
      this.query.page = page || 1;
      this.loading = true;
      getSensitivePage(this.query).then(data => {
        this.loading = false;
        // console.log('SensitivePage: ', data)
        this.list = data.list;
        this.total = data.total;
      });
    },
    remove(item, index) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除吗",
        onOk: () => {
          deleteSensitive([item]).then(data => {
            this.list.splice(index, 1);
            this.total--;
            this.$Message.success("操作成功");
          });
        }
      });
    },
    edit(id) {
      this.$router.push({ name: "createSensitive", query: { id } });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
