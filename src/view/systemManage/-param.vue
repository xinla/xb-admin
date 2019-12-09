<template>
  <div>
    <div class="bfc-o">
         <Button type="info" @click="showModal()">添加</Button>
        <div class="fr">
          <Input v-model="query.publicName" placeholder="名称" style="width:200px;"/>
          <Select v-model="query.system" style="width:200px;" placeholder='类型'>
            <Option :value="0">业务类</Option>
            <Option :value="1">系统类</Option>
          </Select>
          <Button type="primary" icon="ios-search" @click="getData(1)">搜索</Button>
          <Button icon="ios-close-circle-outline" @click="query.publicName = '', query.system = '', getData(1)">清空</Button>
        </div>
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
            <Button
              type="primary"
              size="small"
              @click="showModal(row)"
            >编辑</Button>
            <Button type="primary" size="small" @click="remove(row)">删除</Button>
          </template>
        </Table>

        <Page
          :current='query.current'
          :total="total"
          show-elevator
          show-total
          style="text-align:center;margin-top:20px;"
          @on-change="getData"
        />

    <Modal v-model="modal" :title="form.publicId ? '编辑' : '新建'" @on-ok="save">
      <Form :model="form" :label-width="60">
        <FormItem label="名称" prop="publicName">
          <Input v-model="form.publicName" style="width:73%;" />
        </FormItem>

        <FormItem label="键" prop="name">
          <Input v-model="form.publicKey" style="width:73%;" />
        </FormItem>

        <FormItem label="值" prop="phone">
          <Input v-model="form.publicValue" style="width:73%;" />
        </FormItem>

        <FormItem label="编码" prop="roleList">
          <Input v-model="form.validateCode" style="width:73%;" />
        </FormItem>

<FormItem label="状态" prop="roleList">
        <Select v-model="form.delFlag" style="width:73%;" placeholder='状态'>
            <Option :value="0">业务类</Option>
            <Option :value="1">系统类</Option>
          </Select>
          </FormItem>

          <FormItem label="类型" prop="roleList">
        <Select v-model="form.publicType" style="width:73%;" placeholder='状态'>
            <Option :value="0">业务类</Option>
            <Option :value="1">系统类</Option>
          </Select>
          </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import * as A from "@/api/system/param";

export default {
  data() {
    return {
      loading: true,
      query: {
        current: 1, // 页数
        size: 10, // 一页数据
        publicName: '',
        system: ''
      },
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 60
        },
        {
          title: "名称",
          key: "publicName",
          align: "center"
        },
        {
          title: "键",
          key: "publicKey",
          align: "center"
        },
        {
          title: "值",
          key: "publicValue",
          align: "center"
        },
        {
          title: "编码",
          align: "center",
          key: "validateCode"
        },
        {
          title: "作用",
          key: "system",
          align: "center"
        },
        {
          title: "状态",
          align: "center",
          key: "delFlag"
        },
        {
          title: "类型",
          align: "center",
          key: "publicType"
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
      this.form = Object.assign({}, data || {})
    },
    remove(data) {
      // if (data.lockFlag) {
      //   this.$Message.error("当前用户正在启用中，无法删除，请停用后再尝试");
      // } else {
      //   }
      this.$Modal.confirm({
        title: "提示",
        content: `是否确认删除ID为"${data.publicId}"?`,
        onOk: () => {
          A.delObj(data.publicId).then(res => {
            this.getData();
            this.$Message.success("操作成功");
          });
        }
      });
    },
    save() {
      Promise.resolve()
        .then(() => {
          return this.form.publicId
            ? A.putObj(this.form)
            : A.addObj(this.form);
        })
        .then(res => {
          this.$Message.success("操作成功");
          this.getData();
          // console.log(data)
        });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
