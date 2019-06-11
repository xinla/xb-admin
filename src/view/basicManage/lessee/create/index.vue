<template>
  <div>
    <div class="title-row">基本信息</div>

    <Form ref="formAll" :model="formAll" :rules="rules" :label-width="100">
      <Row>
        <Col span="10">
          <FormItem label="租户名称" prop="name">
            <selectSupplier :val="formAll.name" @change="change"/>
          </FormItem>
          <FormItem label="业务类型" prop="businessType">
            <RadioGroup v-model="formAll.businessType">
              <Radio v-for="(value, key) in businessType" :key="key" :label="+key">{{value}}</Radio>
            </RadioGroup>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="租户类型" prop="compayAccountType">
            <RadioGroup v-model="formAll.compayAccountType">
              <Radio v-for="(value, key) in compayAccountType" :key="key" :label="+key">{{value}}</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <Divider/>

    <div class="title-row">超级管理员</div>
    <Table border :columns="roleColumns" :data="formAll.listAdmin" style="text-align: center;">
      <template slot-scope="{}" slot="rname">超级管理员</template>
      <template slot-scope="{ row, index }" slot="action">
        <Icon type="ios-close-circle-outline" @click="deleteRole(0, index)"/>
      </template>
    </Table>
    <Form ref="formRole" :model="formRole" :rules="rules" :label-width="0">
      <Row>
        <Col span="6">
        <FormItem prop="name">
          <Input
            v-model="formRole.name"
            placeholder="请输入姓名"
            style="width:73%; margin-right: 10px;"
          />
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="mobile">
            <Input
              v-model="formRole.mobile"
              type="tel"
              placeholder="请输入手机号"
              style="width:73%; margin-right: 10px;"
            />
          </FormItem>
        </Col>
        <Col span="6">
          <Input placeholder="超级管理员" disabled style="width:73%; margin-right: 10px;"/>
        </Col>
        <Col span="6">
          <Button type="info" @click="add('role')">添加</Button>
        </Col>
      </Row>
    </Form>

    <Divider/>

    <!-- <div class="title-row">体验账号</div>
    <Table 
      :columns="accountColumns"
      :data="formAll.exmap">
      <template slot-scope="{ row, index }" slot="action">
          <Icon type="ios-close-circle-outline" @click="deleteRole(1, index)"/>
      </template>
    </Table>
    <Row>
        <Col span="4">
          <Input v-model="formAccount.name" placeholder="请输入姓名" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="4">
          <Input v-model="formAccount.mobile" placeholder="请输入手机号" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="4">
          <Input v-model="formAccount.duty" placeholder="请输入职务" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="4">
          <Select :multiple="true" v-model="formAccount.jurisdiction" style="width:73%; margin-right: 10px;">
              <Option v-for="(value, key) in jurisdictionList" :value="value" :key="key">{{ value }}</Option>
          </Select>
        </Col>
        <Col span="6">
          <DatePicker 
            type="daterange" 
            placement="bottom-end" 
            placeholder="请选择开始和结束日期" 
            style="width: 200px"
            @on-change="changeTime">
          </DatePicker>
        </Col>
        <Col span="2">
          <Button type="info" @click="add('account')">添加</Button>
        </Col>
    </Row>-->

    <Button type="info" @click="create" style="margin: 20px auto; display: block;">确认</Button>
  </div>
</template>

<script>
import {
  getLesseeDetail,
  getRoles,
  getRolesAndGroups,
  updateLessee,
  addLessee
} from "@/api/lessee";
import selectSupplier from "@/components/selectSupplier";

const dafaultForm = {
  name: "",
  compayAccountType: 0,
  businessType: 0, // 0保险,1信贷,2基金
  listAdmin: [],
  agentCompanyId: '',
  exmap: []
};
const defaultFormRole = {
  name: "",
  mobile: "",
};
const defaultFormAccount = {
  name: "",
  mobile: "",
  duty: "",
  jurisdiction: "",
  timeStart: "",
  timeEnd: ""
};
const compayAccountType = {
  0: "体验",
  1: "基础",
  2: "高级",
  3: "旗舰"
};
const businessType = {
  0: "保险",
  1: "信贷",
  2: "基金"
};
export default {
  name: "home",
  components: {
    selectSupplier
  },
  data() {
    return {
      id: "",
      JDId: "",
      query: {
        page: 1,
        size: 10,
        type: 1,
        name: ""
      },
      queryRole: {
        page: 1,
        size: 10,
        companyId: ""
      },
      compayAccountType: Object.assign({}, compayAccountType),
      businessType: Object.assign({}, businessType),
      formAll: Object.assign({}, dafaultForm),
      formRole: Object.assign({}, defaultFormRole),
      formAccount: Object.assign({}, defaultFormAccount),
      roleColumns: [
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "手机号",
          key: "mobile"
        },
        {
          title: "职位",
          slot: "rname"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      accountColumns: [
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "手机号",
          key: "mobile"
        },
        {
          title: "职位",
          key: "duty"
        },
        {
          title: "应用模块权限",
          key: "jurisdiction"
        },
        {
          title: "体验期限",
          key: "timeStart"
        },
        {
          title: "",
          key: "timeEnd"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      jurisdictionList: {
        0: "消息",
        1: "工作",
        2: "产品",
        3: "审批"
      },
      rules: {
        name: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        compayAccountType: [
          {
            required: true,
            type: 'number',
            message: "不能为空",
            trigger: "change"
          }
        ],
        businessType: [
          {
            required: true,
            type: 'number',
            message: "不能为空",
            trigger: "change"
          }
        ],
        mobile: [
          {
            required: true,
            len: 11,
            message: "输入错误",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.queryRole.companyId = this.id;
    this.init();
  },
  methods: {
    init() {
      if (this.id) {
        getLesseeDetail(this.id).then(data => {
          console.log(data);
          this.formAll = data;
          // return getRolesAndGroups(data.name)
          // return getRoles(this.queryRole)
        });
        // .then(data => {
        //   // console.log('data2', data)
        //   // this.formAll.listAdmin = data.list
        //   this.$set(this.formAll, 'listAdmin', data.list)
        // })
        // .then(_data => {
        // console.log('data1',_data)
        //   this.formAll.listAdmin = _data
        // })
      }
      // getRolesAndGroups().then(data => {
      //   this.formRole.roles = data
      // })
    },
    deleteRole(type, index) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除么",
        onOk: () => {
          // 0：超级管理员 ，1：体验账号
          type === 0
            ? this.formAll.listAdmin.splice(index, 1)
            : this.formAll.exmap.splice(index, 1);
        }
      });
    },
    add(type) {
      if (type === "role") {
        this.$refs['formRole'].validate((valid) => {
          if (valid) {
            this.formAll.listAdmin.push(this.formRole);
            this.formRole = Object.assign({}, defaultFormRole);
          }
        })
      } else {
        this.formAll.exmap.push(this.formAccount);
        this.formAccount = Object.assign({}, defaultFormAccount);
      }
    },
    changeTime(date) {
      // console.log(date)
      this.formAccount.timeStart = date[0];
      this.formAccount.timeEnd = date[1];
    },
    change(item) {
      this.formAll.agentCompanyId = item.id;
      this.formAll.name = item.name;
      // console.log(item)
    },
    create() {
      // debugger
      // console.log(this.formAll)
      Promise.resolve()
        .then(() => {
          return this.id
            ? updateLessee(this.formAll)
            : addLessee(this.formAll);
        })
        .then(data => {
          this.$Message.success("操作成功");
          this.$router.push({ name: "lessee" });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  padding: 0px 0px 20px 10px;
  font-size: 20px;
}
.ivu-row {
  margin-top: 10px;
}
.ivu-col {
  padding-right: 10%;
}
</style>
