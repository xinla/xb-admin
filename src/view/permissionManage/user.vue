<template>
  <div>
    <Row>
      <Col span="6">
        <!-- <Button type="info" @click="showModal()">新建用户</Button> -->
        <Tree :data="departmentList" @on-select-change="clickDepartment"></Tree>
      </Col>
      <Col span="18">
        <div>
          <Input v-model="query.username" placeholder="用户名" style="width:200px;" />
          <Button type="primary" icon="ios-search" @click="getData(1)">搜索</Button>
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
              style="margin-right: 10px;"
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
      </Col>
    </Row>

    <Modal v-model="modal" :title="form.userId ? '编辑' : '新建'" @on-ok="save">
      <Form ref="form" :model="form" :rules="rules" :label-width="60">
        <FormItem label="用户名" prop="name">
          <Input v-model="form.username" placeholder="请输入用户名" style="width:73%;" />
        </FormItem>

        <FormItem label="密码" prop="name">
          <Input v-model="form.password" placeholder="请输入密码" style="width:73%;" />
        </FormItem>

        <FormItem label="手机号" prop="phone">
          <Input v-model="form.phone" placeholder="请输入手机号" style="width:73%;" />
        </FormItem>

        <FormItem label="角色" prop="roleList">
          <Select v-model="form.role" style="width:73%;" multiple>
            <Option
              v-for="(item, index) of roleList"
              :value="item.roleId"
              :key="index"
            >{{item.roleName}}</Option>
          </Select>
        </FormItem>

        <FormItem label="状态" prop="lockFlag">
          <RadioGroup v-model="form.lockFlag">
            <Radio label="0">锁定</Radio>
            <Radio label="1">正常</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import * as A from "@/api/permission/user";
import { getAllRole } from "@/api/permission/role";
import { getDeptTree } from "@/api/permission/department";

const defaultForm = {
  username: "",
  phone: "",
  password: "",
  roleList: [],
  lockFlag: 0,
  deptId: "",
  role: [] // 角色id集合
};

export default {
  data() {
    return {
      loading: true,
      query: {
        current: 1, // 页数
        size: 10, // 一页数据
        deptId: "", // 部门id
        username: ''
      },
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 60
        },
        {
          title: "用户名",
          key: "username",
          align: "center"
        },
        {
          title: "手机号",
          key: "phone",
          align: "center"
        },
        {
          title: "角色",
          slot: "roleList",
          align: "center"
        },
        {
          title: "状态",
          align: "center",
          slot: "lockFlag"
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
      form: Object.assign({}, defaultForm),
      rules: {},
      roleList: [],
      departmentList: []
    };
  },
  mounted() {
    // 获取所有的角色列表
    getAllRole().then(res => {
      this.roleList = res;
    });
    this.init();
  },
  methods: {
    init() {
      // 获取部门树
      getDeptTree().then(res => {
        this.departmentList = []
        function recursive(origin, target) {
          for (const iterator of origin) {
            let obj = {
              id: iterator.id,
              title: iterator.name,
              expand: true,
              children: []
            };
            target.push(obj);
            recursive(iterator.children, obj.children);
          }
        }
        recursive(res, this.departmentList);

        this.query.deptId = this.departmentList[0].id;
        this.getData(1);
      });
    },
    getData(page) {
      this.loading = true;
      page && (this.query.current = page);
      A.getUserPage(this.query).then(data => {
        // console.log(data);
        this.loading = false;
        this.list = data.records;
        this.total = ~~data.total;
      });
    },
    showModal(data) {
      this.modal = true;
      this.form = JSON.parse(JSON.stringify(data || defaultForm))
      this.form.password = ''
      this.form.role = [];
      for (const iterator of this.form.roleList) {
        this.form.role.push(iterator.roleId);
      }
      this.form.deptId = this.query.deptId;
    },
    remove(data) {
      // if (data.lockFlag) {
      //   this.$Message.error("当前用户正在启用中，无法删除，请停用后再尝试");
      // } else {
      //   }
      this.$Modal.confirm({
        title: "提示",
        content: "是否删除当前用户？删除后该用户下所有成员无法登陆现保系统",
        onOk: () => {
          A.removeUser(data.userId).then(res => {
            this.getData();
            this.$Message.success("操作成功");
          });
        }
      });
    },
    save() {
      A.updateUser(this.form).then(res => {
        this.getData();
        this.$Message.success("操作成功");
      });
    },
    clickDepartment(selected, current) {
      // console.log(current)
      this.query.deptId = current.id;
      this.getData(1);
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  padding: 0px 0px 20px 10px;
  font-size: 20px;
}
.ivu-btn-small {
  margin-right: 5px;
}
</style>
