<template>
  <div>
    <Button
      type="primary"
      size="small"
      style="display:block; margin:0 5px 5px auto;"
      @click="$router.push({name: 'createVersion'})"
    >新建</Button>
    <Table border :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="content">
        <div v-html="row.content"></div>
      </template>
      <template slot-scope="{ row }" slot="time">{{row.updateTime | transTime}}</template>
      <template slot-scope="{ row }" slot="forceUpdate">{{row.forceUpdate === 0 ? "是" : "否"}}</template>
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
import { getVersionPage, saveVersion } from "@/api/version";
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
          title: "版本号",
          key: "versionNum",
          align: "center",
        },
        {
          title: "是否强制更新",
          slot: "forceUpdate", //  0是,1否
          align: "center"
        },
        {
          title: "标题",
          key: "title",
          align: "center"
        },
        {
          title: "内容",
          slot: "content",
          align: "center"
        },
        {
          title: "下载地址",
          key: "download",
          align: "center"
        },
        {
          title: "更新时间",
          key: "updateTime",
          slot: "time",
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
      classifyList: [],
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
      getVersionPage(this.query).then(data => {
        this.loading = false;
        // console.log('VersionPage: ', data)
        this.list = data.list;
        this.total = data.total;
      });
    },
    remove(item, index) {
      item.isDel = 1 // 0 未删除 1已删除
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除吗",
        onOk: () => {
          saveVersion(item).then(data => {
            this.list.splice(index, 1);
            this.total--;
            this.$Message.success("操作成功");
          });
        }
      });
    },
    edit(id) {
      this.$router.push({ name: "createVersion", query: { id } });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
