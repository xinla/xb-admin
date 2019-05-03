<template>
  <div>
    <xNav/>

    <!-- 组织架构 -->
    <org-view
      v-if="organizationStructure"
      :data="organizationStructure"
      @on-menu-click="handleMenuClick"
    ></org-view>

    <div style="position:relative;">
      <div style="display:inline-block;width: 50%;">
        <div class="add-member" @click="userFormShow = !userFormShow">+</div>

        <Table border :columns="columns" :data="userList">
          <template slot-scope="{ row }" slot="action">
            <Button
              type="primary"
              size="small"
              style="margin-right: 5px"
              @click="edit(row.id)"
            >编辑</Button>
            <Button
              type="error"
              size="small"
              style="margin-right: 5px"
              @click="deleteUser(row.id)"
            >删除</Button>
          </template>
        </Table>
      </div>

      <!-- 添加成员表单 -->
      <MemberForm :id="userId" v-model="userFormShow" @success="getUsers" />
    </div>

    <Form v-if="orgFormShow" ref="orgForm" class="org-form cc" :model="orgForm" :rules="rules" :label-width="100">
      添加下级组织
      <FormItem label="组织名称" prop="name">
        <Input v-model="orgForm.name" placeholder="親輸入组织名称"></Input>
      </FormItem>
      <FormItem label="组织类型" prop="type">
        <RadioGroup v-model="orgForm.type">
          <Radio :label="0">分公司</Radio>
          <Radio :label="1">机构</Radio>
          <Radio :label="2">部门</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="组织简介" prop="organizationDesc">
        <Input type="textarea" v-model="orgForm.organizationDesc" placeholder="親輸入组织简介"></Input>
      </FormItem>
      <FormItem label="组织地址" prop="organizationAddress">
        <Input v-model="orgForm.organizationAddress" placeholder="親輸入组织地址"></Input>
      </FormItem>
      <FormItem label="组织电话" prop="organizationPhone">
        <Input v-model="orgForm.organizationPhone" placeholder="親輸入组织电话"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submit(1)">确认添加</Button>
        <Button @click="cancel('orgForm')" style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { getSupplierOrganization, addSupplierOrganization } from "@/api/supplier/organization";
import { getSupplierUserPage, deleteSupplierUser } from "@/api/supplier/user";
import OrgView from "./components/org-view.vue";
import MemberForm from "./components/MemberForm.vue";
import xNav from "@/view/components/nav";

const menuDic = {
  edit: "编辑部门",
  detail: "查看部门",
  new: "新增子部门",
  delete: "删除部门"
};
const defautlOrgForm = {
  name: "",
  type: "",
  organizationDesc: "",
  organizationAddress: "",
  organizationPhone: ""
};
const defautlMemberForm = {
  name: "",
  department: "",
  post: "",
  site: "",
  isLeader: "",
  postType: "",
  postCode: "",
  mobile: "",
  call: "",
  email: ""
};
export default {
  components: {
    xNav,
    OrgView,
    MemberForm
  },
  data() {
    return {
      query: {
        supplierId: "",
        page: 1,
        size: 10
      },
      organizationStructure: {
        id: 0,
        label: "现保科技有限公司",
        expand: true,
        children: [
          {
            id: 2,
            label: "产品研发部",
            children: [
              {
                id: 5,
                label: "研发-前端"
              },
              {
                id: 6,
                label: "研发-后端"
              },
              {
                id: 9,
                label: "UI设计"
              },
              {
                id: 10,
                label: "产品经理"
              }
            ]
          },
          {
            id: 3,
            label: "销售部",
            children: [
              {
                id: 7,
                label: "销售一部"
              },
              {
                id: 8,
                label: "销售二部"
              }
            ]
          },
          {
            id: 4,
            label: "财务部"
          },
          {
            id: 9,
            label: "HR人事"
          }
        ]
      },
      columns: [
        {
          type: "selection",
          width: 50,
          align: "center"
        },
        {
          title: "姓名",
          key: "uname",
          align: "center"
        },
        {
          title: "部门",
          key: "pname",
          align: "center"
        },
        {
          title: "职务",
          key: "jobname",
          align: "center"
        },
        {
          title: "工号",
          key: "jobnumber",
          align: "center"
        },
        {
          title: "手机号",
          key: "phone",
          align: "center"
        },
        {
          title: "邮箱",
          key: "email",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        type: [{ type: 'number', required: true, message: "不能为空", trigger: "blur" }],
        organizationDesc: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        organizationAddress: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        organizationPhone: [
          { required: true, message: "不能为空", trigger: "blur" }
        ]
      },
      userList: [],
      userFormShow: false,
      orgForm: Object.assign({}, defautlOrgForm),
      orgFormShow: false,
      userId: 0
    };
  },
  mounted() {
    this.query.supplierId = this.$route.query.id;
    this.init();
  },
  methods: {
    init() {
      this.getOrganizations();
      this.getUsers();
    },
    getOrganizations() {
      getSupplierOrganization(this.query.supplierId).then(data => {
        console.log("data:", data);
        this.userList = data;
      });
    },
    getUsers() {
      getSupplierUserPage(this.query).then(data => {
        console.log(data);
        this.userList = data.list;
      });
    },
    edit(id) {
      this.userId = id
      this.userFormShow = true
    },
    deleteUser(id) {
      deleteSupplierUser(id).then(data => {
        this.$Message.success("操作成功")
      })
    },
    handleMenuClick({ data, key }) {
      console.log(1);
      if (key === 'new') {
        this.orgFormShow = true
      } else {
        
      }
      this.$Message.success({
        duration: 5,
        content: `点击了《${data.label}》节点的'${menuDic[key]}'菜单`
      });
    },
    submit(type) {
      this.$refs.orgForm.validate()
      .then(data => {
        if (data) {
          return addSupplierOrganization(this.orgForm)
        } else {
          return new Promise((resolve, reject) => {})
        }
      })
      .then(data => {
        this.$Message.success("操作成功")
      })
    },
    cancel() {
      this.$refs.orgForm.resetFields()
      this.orgFormShow = false
    }
  }
};
</script>

<style lang="less" scoped>
@import url(./index.less);
</style>
