<template>
  <div>
    <!-- <div class="title">用户列表</div> -->

    <Row style="padding-bottom: 10px;">
      <Col span="16">
        <Button type="info" @click="showModal(defaultForm)">新建用户</Button>
      </Col>
      <Col span="8">
        <Input v-model="query.name" placeholder="用户名" style="width:73%; margin-right: 10px;"/>
        <Button type="primary" icon="ios-search" @click="search()">搜索</Button>
      </Col>
    </Row>

    <Table :loading="loading" :columns="columns" :data="list">

      <template slot-scope="{ row }" slot="name">
        <div
          class="a"
        >{{row.name}}</div>
      </template>

      <template slot-scope="{ row }" slot="compayAccountType">
        {{row.compayAccountType | compayAccountType}}
      </template>

      <template slot-scope="{ row }" slot="businessType">
        {{row.businessType | businessType}}
      </template>

      <template slot-scope="{ row }" slot="isActive">
        {{row.outageTime ? '停用' : '正常'}}
      </template>

      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" @click="showModal(row)">编辑</Button>
        <Button type="primary" size="small" @click="remove(row)">删除</Button>
      </template>

    </Table>

    <Page
      :total="total"
      show-elevator
      show-total
      style="text-align:center;margin-top:20px;"
      @on-change="getData"
    />

    <Modal
        v-model="modal"
        :title="form.id ? '编辑' : '新建'"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form ref="form" :model="form" :rules="rules" :label-width="60">
          <FormItem label="用户名" prop="name">
          <Input
            v-model="form.name"
            placeholder="请输入用户名"
            style="width:73%;"
          />
          </FormItem>

          <FormItem label="密码" prop="name">
          <Input
            v-model="form.name"
            placeholder="请输入密码"
            style="width:73%;"
          />
          </FormItem>

          <FormItem label="手机号" prop="name">
          <Input
            v-model="form.compayAccountType"
            placeholder="请输入手机号"
            style="width:73%;"
          />
          </FormItem>

          <FormItem label="角色" prop="name">
          <Select v-model="form.glname" style="width:73%;">
            <Option :value="1" :key="1">admin</Option>
          </Select>
          </FormItem>

          <FormItem label="状态" prop="name">
          <RadioGroup v-model="form.isActive">
            <Radio label="0">正常</Radio>
            <Radio label="1">锁定</Radio>
          </RadioGroup>
          </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
import { getLesseePage, setState } from "@/api/lessee";

const compayAccountType = [
  {
    label: "体验",
    value: 0
  },
  {
    label: "基础",
    value: 1
  },
  {
    label: "高级",
    value: 2
  },
  {
    label: "旗舰",
    value: 3
  }
]
const businessType = [
  {
    label: "保险",
    value: 0
  },
  {
    label: "信贷",
    value: 1
  },
  {
    label: "基金",
    value: 2
  }
]
const isActive = [
  {
    label: "停用",
    value: 1
  },
  {
    label: "正常",
    value: 2
  },
]
const defaultForm = {
  name: "",
  mobile: "",
}

export default {
  filters: {
    compayAccountType(val) {
      return compayAccountType[val] && compayAccountType[val].label
    },
    businessType(val) {
      return businessType[val] && businessType[val].label
    },
  },
  data() {
    return {
      loading: true,
      query: {
        page: 1,
        size: 10,
        name: ""
      },
      columns: [
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "用户名",
          key: "name",
          slot: "name",
          align: "center",
          minWidth: 140
        },
        {
          title: "手机号",
          key: "compayAccountType",
          align: "center",
        },
        {
          title: "角色",
          key: "glname",
          align: "center"
        },
        {
          title: "状态",
          key: "isActive",
          align: "center",
          slot: "isActive",
        },
        {
          title: "创建时间",
          key: "updateTime",
          align: "center",
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
      rules: {

      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(page) {
      this.loading = true;
      page && (this.query.page = page);
      getLesseePage(this.query).then(data => {
        // console.log(data);
        this.loading = false;
        this.list = data.list;
        this.total = ~~data.total;
      });
    },
    search() {
      this.query.page = 1;
      this.query.size = 10;
      this.getData();
    },
    set(data) {
      let state = data.outageTime ? 2 : 1
      setState(data.id, state).then(res => {
        this.$Message.success("操作成功");
        this.getData()
        // console.log(data)
      })
    },
    showModal(data) {
      this.modal = true
      this.form = Object.assign({}, data)
    },
    remove(data) {
      if (!data.outageTime) {
        this.$Message.error("当前用户正在启用中，无法删除，请停用后再尝试");
      } else {
        this.$Modal.confirm({
          title: "提示",
          content: "是否删除当前用户？删除后该用户下所有成员无法登陆现保系统",
          onOk: () => {
            setState(data.id, 0).then(data => {
              this.getData();
              this.$Message.success("操作成功");
            });
          }
        })
      }
    }
  }
};
</script>

<style lang="less" scoped>
.title{
  padding: 0px 0px 20px 10px;
  font-size: 20px;
}
.ivu-btn-small{
  margin-right: 5px;
}
</style>
