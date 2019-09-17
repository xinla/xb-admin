<template>
  <div>
    <div style="margin-bottom: 15px;">
      <Button type="primary" @click="isModal = true, form = {}">新建版本</Button>
      <Select
        v-model="query.type"
        class="right fr"
        style="width:150px;"
        placeholder="请选择状态"
        @on-change="getData()"
      >
        <Option v-for="(item, index) in typeList" :value="item.value" :key="index">{{ item.label }}</Option>
      </Select>
    </div>

    <Table border :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="content">
        <div v-html="row.content" class="oe"></div>
      </template>
      <template slot-scope="{ row }" slot="type" v-if="row.type">
        <Tag
          v-for="(item, index) of row.type.split(',')"
          :color="typeList[item].color"
          :key="index"
        >{{typeList[item].label}}</Tag>
      </template>
      <template slot-scope="{ row }" slot="forceUpdate">{{row.forceUpdate === 0 ? "是" : "否"}}</template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row)">编辑</Button>
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

    <!-- <Modal v-model="isModal" title="新建版本" style="width: 50%;">
      <create :form="form" :key="0" @submit="getData()"/>
    </Modal>-->
    <dialogBox v-model="isModal">
      <div slot="title">新建版本</div>
      <create :formData="form" :key="form.id || 0" @submit="getData()" />
    </dialogBox>
  </div>
</template>

<script>
import { getVersionPage, saveVersion } from "@/api/version";
import { formatDate } from "@/libs/tools";
import create from "./create";

export default {
  filters: {
    transTime(time) {
      return formatDate(time, "second");
    }
  },
  components: {
    create
  },
  data() {
    return {
      query: {
        page: 1,
        size: 10,
        type: ""
      },
      loading: false,
      columns: [
        {
          title: "版本号",
          key: "versionNum",
          align: "center"
        },
        {
          title: "发布端",
          key: "type",
          slot: "type",
          align: "center"
        },
        {
          title: "发布时间",
          key: "updateTime",
          // slot: "time",
          align: "center"
        },
        {
          title: "是否强制更新",
          slot: "forceUpdate", //  0是,1否
          align: "center"
        },
        {
          title: "更新标题",
          key: "title",
          align: "center",
          ellipsis: true
        },
        {
          title: "更新内容",
          slot: "content",
          align: "center",
          ellipsis: true
        },
        // {
        //   title: "下载地址",
        //   key: "download",
        //   align: "center"
        // },
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
      // 0 安卓 1 IOS 2 WEB
      typeList: [
        {
          value: 0,
          label: "Android",
          color: "default"
        },
        {
          value: 1,
          label: "iOS",
          color: "success"
        },
        {
          value: 2,
          label: "Web",
          color: "error"
        }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(page) {
      this.query.page = page || 1;
      this.loading = true;
      getVersionPage(this.query).then(data => {
        this.loading = false;
        console.log("VersionPage: ", data);
        this.list = data.list;
        this.total = data.total;
        this.isModal = false;
      });
    },
    remove(item, index) {
      item.isDel = 1; // 0 未删除 1已删除
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
    edit(data) {
      this.isModal = true;
      this.form = data;
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.oe * {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/deep/.dialog {
  max-height: none !important;
}
</style>
