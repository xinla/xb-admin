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
        <div class="add-member" @click="memberFormShow = !memberFormShow">+</div>
        <Table border :columns="columns" :data="NemberList">
          
        </Table>
      </div>
      
      <!-- 添加成员表单 -->
      <MemberForm v-model="memberFormShow"/>
    </div>


    <Form class="org-form cc" :model="orgForm" :rules="ruleValidate" :label-width="100">
      添加下级组织
      <FormItem label="组织名称">
        <Input v-model="orgForm.name" placeholder="親輸入组织名称"></Input>
      </FormItem>
      <FormItem label="组织类型">
        <RadioGroup v-model="orgForm.type">
          <Radio label="分公司"></Radio>
          <Radio label="机构"></Radio>
          <Radio label="部门"></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="组织简介">
        <Input type="textarea" v-model="orgForm.des" placeholder="親輸入组织简介"></Input>
      </FormItem>
      <FormItem label="组织地址">
        <Input v-model="orgForm.site" placeholder="親輸入组织地址"></Input>
      </FormItem>
      <FormItem label="组织电话">
        <Input v-model="orgForm.call" placeholder="親輸入组织电话"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submit()">确认添加</Button>
        <Button @click="cancel()" style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { getLesseePageByName, getLesseePageByJB } from "@/api/lessee";
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
  des: "",
  site: "",
  call: ""
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
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          align: "center"
        },
        {
          title: "部门",
          key: "age",
          align: "center"
        },
        {
          title: "职务",
          key: "address",
          align: "center"
        },
        {
          title: "工号",
          key: "address",
          align: "center"
        },
        {
          title: "手机号",
          key: "address",
          align: "center"
        },
        {
          title: "邮箱",
          key: "address",
          align: "center"
        }
      ],
      NemberList: [],
      memberFormShow: false,
      orgForm: Object.assign({}, defautlOrgForm)
    };
  },
  methods: {
    handleMenuClick({ data, key }) {
      console.log(1);
      this.$Message.success({
        duration: 5,
        content: `点击了《${data.label}》节点的'${menuDic[key]}'菜单`
      });
    },
    submit() {

    },
    cancel() {

    }
  }
};
</script>

<style lang="less" scoped>
@import url(./index.less);
</style>
