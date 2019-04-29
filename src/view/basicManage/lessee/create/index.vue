<template>
  <div>
    <div class="title-row">基本信息</div>

    <Form ref="formAll" :model="formAll" :rules="rulesFormAll" :label-width="100">
    
      <Row>
        <Col span="12">
          <FormItem label="租户名称" prop="name">
            <Select
              style="width:73%; margin-right: 10px;"
              v-model="formAll.name"
              filterable
              remote
              :remote-method="search"
              :loading="loading">
                <Option v-for="(option, index) in lesseeList" 
                :value="option.name" 
                :key="index">
                {{option.name}}
                </Option>
            </Select>
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
      <FormItem label="业务类型" prop="businessType">
        <RadioGroup v-model="formAll.businessType">
          <Radio v-for="(value, key) in businessType" :key="key" :label="+key">{{value}}</Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    
    <Divider />
    
    <div class="title-row">超级管理员</div>
    <Table 
      border
      :columns="roleColumns"
      :data="formAll.roleList"
      style="text-align: center;">
      <template slot-scope="{ row, index }" slot="action">
          <Icon type="ios-close-circle-outline" @click="deleteRole(index)"/>
      </template>
    </Table>
    <Row>
        <Col span="6">
          <Input v-model="formRole.name" placeholder="请输入姓名" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="6">
          <Input v-model="formRole.mobile" placeholder="请输入手机号" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="6">
          <Input v-model="formRole.duty" placeholder="请输入职务" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="6">
          <Button type="info" @click="add('role')">添加</Button>
        </Col>
    </Row>
    
    <Divider />

    <Table 
      :columns="accountColumns"
      :data="formAll.accountList">
      <template slot-scope="{ row, index }" slot="action">
          <Icon type="ios-close-circle-outline" @click="deleteRole(index)"/>
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
          <Select v-model="formAccount.jurisdiction" style="width:73%; margin-right: 10px;">
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
    </Row>

    <Button type="info" @click="create" style="margin: 20px auto; display: block;">确认创建</Button>
  </div>
</template>

<script>
import { getLesseePageByJB, getLesseeById, getRoles, getRolesAndGroups, updateLessee } from '@/api/lessee'

const dafaultForm = {
  name: '',
  compayAccountType: '',
  businessType: '',
  glmap: [],
  exmap: []
}
const defaultFormRole = {
  uname: '',
  mobile: '',
  rname: '',
  roles: []
}
const defaultFormAccount = {
  name: '',
  mobile: '',
  duty: '',
  jurisdiction: '',
  timeStart: '',
  timeEnd: ''
}
const compayAccountType = {
  0: '体验',
  1: '商用'
}
const businessType= {
  0: '保险',
  1: '信贷',
  2: '基金'
}
export default {
  name: "home",
  data() {
    return {
      id: '',
      query: {
        page: 1,
        size: 10,
        type: 1,
        name: ''
      },
      queryRole: {
        page: 1,
        size: 10,
        companyId: '',
      },
      compayAccountType: Object.assign({}, compayAccountType),
      businessType: Object.assign({}, businessType),
      loading: false,
      lesseeList: [],
      formAll: Object.assign({}, dafaultForm),
      formRole: Object.assign({}, defaultFormRole),
      formAccount: Object.assign({}, defaultFormAccount),
      roleColumns: [
        {
            title: '姓名',
            key: 'uname',
        },
        {
            title: '手机号',
            key: 'mobile',
        },
        {
            title: '职位',
            key: 'rname',
        },
        {
            title: '操作',
            slot: 'action',
        },
      ],
      accountColumns: [
        {
            title: '姓名',
            key: 'name',
        },
        {
            title: '手机号',
            key: 'mobile',
        },
        {
            title: '职位',
            key: 'duty',
        },
        {
            title: '应用模块权限',
            key: 'jurisdiction',
        },
        {
            title: '体验期限',
            key: 'timeStart',
        },
        {
            title: '',
            key: 'timeEnd',
        },
        {
            title: '操作',
            slot: 'action',
        },
      ],
      jurisdictionList: {
        0: '消息',
        1: '工作',
        2: '产品',
        3: '审批'
      },
      rulesFormAll:{  
      },
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.queryRole.companyId = this.id
    this.init()
  },
  methods: {
    init() {
      if (this.id) {
        getLesseeById(this.id)
        .then(data => {
          console.log(data)
          let {name, compayAccountType, businessType} = data
          let _form = {name, compayAccountType, businessType}
          this.formAll = Object.assign({}, _form)
          return getRolesAndGroups(data.name)
        })
        .then(_data => {
          console.log('data1',_data)
          this.formAll.roleList = _data
        })

        getRoles(this.queryRole).then(data => {
          console.log('data2',data)
        })
      }
    },
    search(query) {
      this.query.name = query
      this.loading = true
      getLesseePageByJB(this.query).then(data => {
        // console.log(data)
        this.loading = false
        this.lesseeList = data.list
      })
    },
    deleteRole() {

    },
    add(type) {
      if (type === 'role') {
        this.formAll.roleList.push(this.formRole)
        this.formRole = Object.assign({}, defaultFormRole)
      } else {
        this.formAll.accountList.push(this.formAccount)
        this.formAccount = Object.assign({}, defaultFormAccount)
      }
    },
    changeTime(date) {
      // console.log(date)
      this.formAccount.timeStart = date[0]
      this.formAccount.timeEnd = date[1]
    },
    create() {

    }
  }
};
</script>

<style lang="less" scoped>
  @import url('./create.less');
</style>
