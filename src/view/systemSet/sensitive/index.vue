<template>
  <div>
    <Button
      type="primary"
      size="small"
      style="display:block; margin:0 5px 5px auto;"
      @click="$router.push({name: 'createSensitive'})"
    >新建</Button>
    <Table border :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="content">
        <div v-html="row.content"></div>
      </template>
      <template slot-scope="{ row }" slot="isDisable">{{!row.isDisable ? "是" : "否"}}</template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row.id)">编辑</Button>
        <Button type="error" size="small" @click="remove(row, index)">删除</Button>
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
import { getSensitivePage, deleteSensitive } from "@/api/sensitive";
import { formatDate } from "@/libs/tools";
export default {
  filters: {
    transTime(time) {
      return formatDate(time, "year");
    }
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
      total: 0
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
