<template>
  <div class="x-h100">
        <div class="bg pb24">
          <Select v-model="query.type" style="width:20%;" placeholder='类型'>
            <Option :value="0">正常</Option>
            <Option :value="1">异常</Option>
          </Select>
          <Button type="primary" icon="ios-search" shape="circle" @click="getData(1)"></Button>
          <!-- <Button type="primary" icon="ios-close-circle-outline" @click="query.type = '', getData(1)">清空</Button> -->
        </div>
        <Table :loading="loading" :columns="columns" :data="list">
          <template slot-scope="{ row }" slot="roleList">
            <Tag
              color="primary"
              v-for="(item, index) of row.roleList"
              :key="index"
            >{{item.roleName}}</Tag>
          </template>

          <template slot-scope="{ row }" slot="lockFlag">{{row.outageTime ? '锁定' : '正常'}}</template>

          <template slot-scope="{ row }" slot="action">
            <span class="button-pri"
              @click="showModal(row)"
            >查看</span>
            <span class="button-err" @click="remove(row)">删除</span>
          </template>
        </Table>

        <Page
          :current='query.current'
          :total="total"
          show-elevator
          show-total
          class="c-page"
          @on-change="getData"
        />

    <Modal v-model="modal" title="查看" footer-hide>
      <Form :model="form" :label-width="60" disabled>
        <FormItem label="类型" prop="name">
          <Input v-model="form.type" style="width:73%;" />
        </FormItem>

        <FormItem label="标题" prop="name">
          <Input v-model="form.title" style="width:73%;" />
        </FormItem>

        <FormItem label="IP地址" prop="phone">
          <Input v-model="form.remoteAddr" style="width:73%;" />
        </FormItem>

        <FormItem label="请求方式" prop="roleList">
          <Input v-model="form.method" style="width:73%;" />
        </FormItem>

        <FormItem label="客户端" prop="roleList">
          <Input v-model="form.serviceId" style="width:73%;" />
        </FormItem>

        <FormItem label="请求时间" prop="roleList">
          <Input v-model="form.time" style="width:73%;" />
        </FormItem>

        <FormItem label="创建时间" prop="roleList">
          <Input v-model="form.createTime" style="width:73%;" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import * as A from "@/api/system/log";
import { getAllRole } from "@/api/permission/role";
import { getDeptTree } from "@/api/permission/department";

export default {
  data() {
    return {
      loading: true,
      query: {
        current: 1, // 页数
        size: 10, // 一页数据
        type: ''
      },
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 60
        },
        {
          title: "类型",
          key: "type",
          align: "center"
        },
        {
          title: "标题",
          key: "title",
          align: "center"
        },
        {
          title: "IP地址",
          key: "remoteAddr",
          align: "center"
        },
        {
          title: "请求方式",
          align: "center",
          key: "method"
        },
        {
          title: "客户端",
          align: "center",
          key: "serviceId"
        },
        {
          title: "请求时间",
          align: "center",
          key: "time"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          width: 140,
          align: "center"
        }
      ],
      list: [],
      total: 0,
      modal: false,
      form: {},
      roleList: [],
      departmentList: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(page) {
      this.loading = true;
      page && (this.query.current = page);
      A.fetchList(this.query).then(data => {
        // console.log(data);
        this.loading = false;
        this.list = data.records;
        this.total = ~~data.total;
      });
    },
    showModal(data) {
      this.modal = true;
      this.form = data
    },
    remove(data) {
      // if (data.lockFlag) {
      //   this.$Message.error("当前用户正在启用中，无法删除，请停用后再尝试");
      // } else {
      //   }
      this.$Modal.confirm({
        title: "提示",
        content: `是否确认删除ID为"${data.id}"的日志?`,
        onOk: () => {
          A.delObj(data.id).then(res => {
            this.getData();
            this.$Message.success("操作成功");
          });
        }
      });
    },
  }
};
</script>

<style lang="less" scoped>
</style>
