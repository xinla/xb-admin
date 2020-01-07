<template>
  <div class="x-h100">
    <!-- <div class="title">用户列表</div> -->
    <div class="ar bg pb24">
      <Button type="primary" @click="showModal()">添加角色</Button>
    </div>
    <!-- <Row style="padding-bottom: 10px;">
      <Col span="16">
        <Button type="info" @click="showModal()">添加</Button>
      </Col>
      <Col span="8">
        <Input v-model="query.name" placeholder="用户名" style="width:73%; margin-right: 10px;"/>
        <Button type="primary" icon="ios-search" @click="search()">搜索</Button>
      </Col>
    </Row>-->

    <Table :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="isActive">{{row.outageTime ? '停用' : '正常'}}</template>

      <template slot-scope="{ row }" slot="action">
        <span class="button-pri" @click="showModal(row), disabled = true">查看</span>
        <span class="button-pri" @click="showModal(row)">编辑</span>
        <span class="button-pri" @click="remove(row)">删除</span>
        <span class="button-err" @click="showPsModal(row)">权限</span>
      </template>
    </Table>

    <Page
      :current="query.current"
      :total="total"
      show-elevator
      show-total
      class="c-page"
      @on-change="getData"
    />

    <!-- 编辑角色弹窗 -->
    <Modal v-model="modal" :title="form.roleId ? '编辑' : '新建'" @on-ok="save">
      <Form ref="form" :model="form" :rules="rules" :label-width="60" :disabled="disabled">
        <FormItem label="角色名称" prop="name">
          <Input v-model="form.roleName" placeholder="请输入角色名称" style="width:73%;" />
        </FormItem>

        <FormItem label="角色标识" prop="roleCode">
          <Input v-model="form.roleCode" placeholder="请输入角色标识" style="width:73%;" />
        </FormItem>

        <FormItem label="角色描述" prop="roleDesc">
          <Input v-model="form.roleDesc" placeholder="请输入角色描述" style="width:73%;" />
        </FormItem>

        <FormItem label="数据权限" prop="dsType">
          <Select v-model="form.dsType" style="width:73%;">
            <Option :value="0" :key="0">全部</Option>
            <Option :value="1" :key="1">自定义</Option>
            <Option :value="2" :key="2">本级及子集</Option>
            <Option :value="3" :key="3">本级</Option>
          </Select>
        </FormItem>

        <FormItem label="创建时间" prop="roleDesc">
          <Input v-model="form.createTime" placeholder="请输入创建时间" style="width:73%;" disabled />
        </FormItem>
      </Form>
    </Modal>

    <!-- 分配权限弹窗 -->
    <Modal v-model="modalPs" class="ps" scrollable title="分配权限" @on-ok="savePermission">
      <Tree
        ref="menuTree"
        check-strictly
        :key="roleId"
        :data="menuList"
        show-checkbox
        @on-select-change="clickMenu"
        @on-check-change="clickMenuCheck"
      ></Tree>
    </Modal>
  </div>
</template>

<script>
import * as A from "@/api/permission/role";
import { getMenuTree } from "@/api/permission/menu";

const defaultForm = {
  name: "",
  mobile: ""
};

export default {
  data() {
    return {
      loading: true,
      query: {
        page: 1,
        size: 10
      },
      columns: [
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "角色名称",
          key: "roleName",
          align: "center"
        },
        {
          title: "角色标识",
          key: "roleCode",
          align: "center"
        },
        {
          title: "角色描述",
          key: "roleDesc",
          align: "center"
        },
        {
          title: "数据权限",
          key: "dsType",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          width: 220,
          align: "center"
        }
      ],
      list: [],
      total: 0,
      modal: false,
      modalPs: false,
      form: Object.assign({}, defaultForm),
      rules: {},
      menuList: [],
      _menuList: [],
      roleId: ""
    };
  },
  mounted() {
    this.getData();
    getMenuTree().then(res => {
      // console.log(res);
      this.menuList = [];
      function recursive(origin, target) {
        for (const iterator of origin) {
          let obj = {
            id: iterator.id,
            title: iterator.name,
            expand: true,
            checked: false,
            // selected: false,
            children: []
          };
          target.push(obj);
          recursive(iterator.children, obj.children);
        }
      }
      recursive(res, this.menuList);
      this._menuList = JSON.parse(JSON.stringify(this.menuList));
      // this.list = data.records;
      // this.total = ~~data.total;
    });
  },
  methods: {
    getData(page) {
      this.loading = true;
      A.getRolePage(this.query).then(res => {
        // console.log(res);
        this.loading = false;
        this.list = res.records;
        this.total = ~~res.total;
      });
    },
    // search() {
    //   this.query.page = 1;
    //   this.query.size = 10;
    //   this.getData();
    // },
    showModal(data) {
      this.modal = true;
      this.form = Object.assign({}, data || {});
      this.disabled = false
    },
    showPsModal(data) {
      this.modalPs = true;
      this.roleId = data.roleId;
      this.menuList = JSON.parse(JSON.stringify(this._menuList));
      getMenuTree(data.roleId).then(res => {
        console.log(res);
        function recursive(data) {
          for (const iterator of data) {
            if (res.includes(iterator.id)) {
              iterator.checked = true;
            }
            recursive(iterator.children);
          }
        }

        recursive(this.menuList);
      });
    },
    save() {
      Promise.resolve()
        .then(() => {
          return this.form.roleId
            ? A.updateRole(this.form)
            : A.addRole(this.form);
        })
        .then(res => {
          this.$Message.success("操作成功");
          this.getData();
          // console.log(data)
        });
    },
    savePermission() {
      console.log(this.$refs.menuTree.getCheckedAndIndeterminateNodes());
      let selectedObj = this.$refs.menuTree.getCheckedAndIndeterminateNodes();
      let selectedIds = [];
      for (const iterator of selectedObj) {
        selectedIds.push(iterator.id);
      }
      A.updateRolePermission(this.roleId, selectedIds + "").then(res => {
        this.$Message.success("操作成功");
      });
    },
    remove(data) {
      this.$Modal.confirm({
        title: "提示",
        content: `是否确认删除名称为"${data.roleName}"的数据项?`,
        onOk: () => {
          A.removeRole(data.roleId).then(res => {
            this.getData();
            this.$Message.success("操作成功");
          });
        }
      });
    },
    clickMenu(selected, current) {
      current.expand = !current.expand;
    },
    clickMenuCheck(chenked, current) {
      function recursive(data) {
        for (const iterator of data.children) {
          iterator.checked = data.checked;
          recursive(iterator);
        }
      }

      recursive(current);
    }
  }
};
</script>

<style lang="less" scoped>
.ps /deep/.ivu-modal-body {
  max-height: 65vh;
  overflow: auto;
}
</style>
