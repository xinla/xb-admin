<template>
  <div>
    <xNav/>

    <!-- 组织架构 -->
    <org-view
      :data="organizationStructure"
      @on-menu-click="handleMenuClick"
    ></org-view>
    <Row>
      <Col span="4">
        <Tree :data="department"></Tree>
      </Col>
      <Col span="18">
        <div style="position:relative;">
          <div style="display:inline-block;width: 70%;">
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
      </Col>
    </Row>


    <Form v-if="orgFormShow" ref="orgForm" class="org-form cc" :model="orgForm" :rules="rules" :label-width="100">
      添加下级组织
      <FormItem label="组织名称" prop="name">
        <Input v-model="orgForm.name" placeholder="親輸入组织名称"></Input>
      </FormItem>
      <FormItem label="组织类型" prop="type">
        <RadioGroup v-model="orgForm.type">
          <Radio :label="0">部门</Radio>
          <Radio :label="1">机构</Radio>
          <Radio :label="2">分公司</Radio>
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
        <Button type="primary" @click="submit()">确定</Button>
        <Button @click="cancel('orgForm')" style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { getSupplierOrganization, addSupplierOrganization, updateSupplierOrganization } from "@/api/supplier/organization";
import { getSupplierUserPage, deleteSupplierUser } from "@/api/supplier/user";
import OrgView from "./components/org-view.vue";
import MemberForm from "./components/MemberForm.vue";
import xNav from "@/view/components/nav";

const menuDic = {
  edit: "编辑部门",
  // detail: "查看部门",
  new: "新增子部门",
  delete: "删除部门"
};
const defautlOrgForm = {
  name: "",
  type: '',
  organizationDesc: "",
  organizationAddress: "",
  organizationPhone: "",
  PerfWidgetExternal: '0',
  pid: '0'
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
        // id: 0,
        // title: "现保科技有限公司",
        // expand: true,
        // children: [
        //   {
        //     id: 2,
        //     title: "产品研发部",
        //     children: [
        //       {
        //         id: 5,
        //         title: "研发-前端"
        //       },
        //       {
        //         id: 6,
        //         title: "研发-后端"
        //       },
        //       {
        //         id: 9,
        //         title: "UI设计"
        //       },
        //       {
        //         id: 10,
        //         title: "产品经理"
        //       }
        //     ]
        //   },
        //   {
        //     id: 3,
        //     title: "销售部",
        //     children: [
        //       {
        //         id: 7,
        //         title: "销售一部"
        //       },
        //       {
        //         id: 8,
        //         title: "销售二部"
        //       }
        //     ]
        //   },
        //   {
        //     id: 4,
        //     title: "财务部"
        //   },
        //   {
        //     id: 9,
        //     title: "HR人事"
        //   }
        // ]
      },
      // organizationStructure: [],
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
        type: [{ type: 'number', required: true, message: "不能为空", trigger: "change" }],
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
      orgForm: Object.assign({supplierId:this.$route.query.id}, defautlOrgForm),
      orgFormShow: false,
      userId: 0,
      department: []
    };
  },
  mounted() {
    this.query.supplierId = this.$route.query.id;
    this.init();
    // console.log(this.orgForm)
  },
  methods: {
    init() {
      this.getOrganizations();
      this.getUsers();
    },
    getOrganizations() {
      getSupplierOrganization(this.query.supplierId).then(data => {
        console.log("SupplierOrganization:", data);
        /**
         * 递归提取对象内所需数据
         * 此方法可以封装到工具库中
         */
        function recursiveExtract(res, obj) {
          // debugger
          obj.type === 0 && (res['title'] = obj.title)
          res.children = []
          if (obj.children.length) {
            for (const key in obj.children) {
              if (obj.children.hasOwnProperty(key)) {
                res.children[key] = {}
                recursiveExtract(res.children[key], obj.children[key])
              }
            }
          }
        }
        let res = {}
        recursiveExtract(res, data[0])
        this.department = [res]
        console.log('res', res)
        this.organizationStructure = data[0]
      });
    },
    getUsers() {
      getSupplierUserPage(this.query).then(data => {
        // console.log(data);
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
      if (key === 'new') {
        this.orgFormShow = true
        this.orgForm = Object.assign({supplierId:this.$route.query.id}, defautlOrgForm)
        this.orgForm.pid = data.id
      } else if (key === 'edit') {
        this.orgFormShow = true
        this.orgForm = data
      } else if (key === 'delete') {
        this.$Message.success({
          duration: 5,
          content: `暂时不提供删除功能，请知晓，如有需要请联系总台`
        });
      }
      // this.$Message.success({
      //   duration: 5,
      //   content: `点击了《${data.title}》节点的'${menuDic[key]}'菜单`
      // });
    },
    submit() {
      this.$refs.orgForm.validate()
      .then(data => {
        if (data) {
          return this.orgForm.id
          ? updateSupplierOrganization(this.orgForm)
          : addSupplierOrganization(this.orgForm)
        } else {
          return new Promise((resolve, reject) => {})
        }
      })
      .then(data => {
        this.getOrganizations()
        this.orgFormShow = false
        this.$Message.success("操作成功")
      })
    },
    cancel() {
      this.$refs.orgForm.resetFields()
      this.orgFormShow = false
    },
    // renderContent (h, { root, node, data }) {
    //     return h('span', {
    //         style: {
    //             display: 'inline-block',
    //             width: '100%'
    //         }
    //     }, [
    //         h('span', [
    //             // h('Icon', {
    //             //     props: {
    //             //         type: 'ios-paper-outline'
    //             //     },
    //             //     style: {
    //             //         marginRight: '8px'
    //             //     }
    //             // }),
    //             h('span', data.title)
    //         ]),
    //         h('div', {
    //             style: {
    //                 display: 'inline-block',
    //                 float: 'right',
    //                 marginRight: '32px'
    //             }
    //         }, [
    //             h('Icon', {
    //                 props: {
    //                   type: 'md-more'
    //                 },
    //                 style: {
    //                     fontSize: '20px'
    //                 },
    //                 on: {
    //                     click: () => { this.showOrgFormShow(data) }
    //                 }
    //             }),
    //             h('div', {
    //               style: {
    //                  display: 'inline-block',

    //               }
    //             })
    //         ])
    //     ]);
    // },
  },
};
</script>

<style lang="less" scoped>
@import url(./index.less);
</style>
