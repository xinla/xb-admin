<template>
  <div>
    <div class="title">创建租户</div>
    <div class="title-row">基本信息</div>
    <Row>
        <Col span="12">
          租户名称
          <Select
            style="width:73%; margin-right: 10px;"
            v-model="allForm.lesseeName"
            multiple
            filterable
            remote
            :remote-method="search"
            :loading="loading">
            <Option 
            v-for="(option, index) in lesseeList" 
            :value="option.value" 
            :key="index">{{option.label}}</Option>
        </Select>

        </Col>
        <Col span="12">
          租户类型：
          <RadioGroup v-model="allForm.lesseeType">
            <Radio label="体验"></Radio>
            <Radio label="商用"></Radio>
          </RadioGroup>
        </Col>
    </Row>
    
    <Divider />
    
    <div class="title-row">超级管理员</div>
    <Table 
      border
      :columns="roleColumns"
      :data="allForm.roleList"
      style="text-align: center;">
      <template slot-scope="{ row, index }" slot="action">
          <Icon type="ios-close-circle-outline" @click="deleteRole(index)"/>
      </template>
    </Table>
    <Row>
        <Col span="6">
          <Input v-model="roleForm.name" placeholder="请输入姓名" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="6">
          <Input v-model="roleForm.mobile" placeholder="请输入手机号" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="6">
          <Input v-model="roleForm.duty" placeholder="请输入职务" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="6">
          <Button type="info" @click="add('role')">添加</Button>
        </Col>
    </Row>
    
    <Divider />

    <Table 
      :columns="accountColumns"
      :data="allForm.accountList">
      <template slot-scope="{ row, index }" slot="action">
          <Icon type="ios-close-circle-outline" @click="deleteRole(index)"/>
      </template>
    </Table>
    <Row>
        <Col span="4">
          <Input v-model="accountForm.name" placeholder="请输入姓名" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="4">
          <Input v-model="accountForm.mobile" placeholder="请输入手机号" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="4">
          <Input v-model="accountForm.duty" placeholder="请输入职务" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="4">
          <Select v-model="accountForm.jurisdiction" style="width:73%; margin-right: 10px;">
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
import { getLesseePageByName, getLesseePageByJB } from '@/api/lessee'

const dafaultForm = {
  lesseeName: '',
  lesseeType: '',
  roleList: [],
  accountList: []
}
const roleDefaultForm = {
  name: '',
  mobile: '',
  duty: ''
}
const accountDefaultForm = {
  name: '',
  mobile: '',
  duty: '',
  jurisdiction: '',
  timeStart: '',
  timeEnd: ''
}

export default {
  name: "home",
  data() {
    return {
      query: {
        page: 1,
        size: 10,
        type: '1',
        name: ''
      },
      loading: true,
      leeessList: [],
      allForm: Object.assign({}, dafaultForm),
      roleForm: Object.assign({}, roleDefaultForm),
      accountForm: Object.assign({}, accountDefaultForm),
      roleColumns: [
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
      }
    }
  },
  mounted() {
    //
  },
  methods: {
    search() {
      this.loading = true
      getLesseePageByName(this.query).then(data => {
        // debugger
        // console.log(data)
        this.loading = false
        this.leeessList = data.list
      })
    },
    deleteRole() {

    },
    add(type) {
      if (type === 'role') {
        this.allForm.roleList.push(this.roleForm)
        this.roleForm = Object.assign({}, roleDefaultForm)
      } else {
        this.allForm.accountList.push(this.accountForm)
        this.accountForm = Object.assign({}, accountDefaultForm)
      }
    },
    changeTime(date) {
      // console.log(date)
      this.accountForm.timeStart = date[0]
      this.accountForm.timeEnd = date[1]
    },
    create() {

    }
  }
};
</script>

<style lang="less" scoped>
  @import url('./add.less');
</style>
