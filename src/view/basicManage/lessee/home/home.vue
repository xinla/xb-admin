<template>
  <div>
    <div class="title">租户列表</div>

    <Row style="padding-bottom: 10px;">
        <Col span="14">
          <Button type="info" @click="goPage('addLessee')">新建租户</Button>
        </Col>
        <Col span="8">
          <Input v-model="query.name" placeholder="搜索公司" style="width:73%; margin-right: 10px;" />
          <Button type="info" @click="search()">搜索</Button>
        </Col>
    </Row>

    <Table 
    border
    :loading="loading"
    :columns="columns"
    :data="list">
      <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
          <Button type="error" size="small" style="margin-right: 5px" @click="goPage('lesseeDetail')">详情</Button>
          <Button type="error" size="small" @click="set(index)">停用</Button>
      </template>
    </Table>

    <Page :total="100" show-elevator show-total style="text-align:center;margin-top:20px;" @on-Change="getListByPage"/>

  </div>
</template>

<script>
import { getLesseePageByName, getLesseePageByJB } from '@/api/lessee'
export default {
  name: "home",
  data() {
    return {
      loading: true,
      query: {
        page: 1,
        size: 10,
        type: '1',
        name: ''
      },
      columns: [
        {
            type: 'index',
            width: 60,
            align: 'center'
        },
        {
            title: '租户名称',
            key: 'name',
            align: 'center'
        },
        {
            title: '租户类型',
            key: 'compayAccountType',
            align: 'center',
            filters: [
              {
                  label: '体验服务',
                  value: 1
              },
              {
                  label: '基础应用服务',
                  value: 2
              },
              {
                  label: '高级应用服务',
                  value: 1
              },
              {
                  label: '超级应用服务',
                  value: 2
              },
              {
                  label: '定制服务',
                  value: 1
              }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
                if (value === 0) {
                    return row.compayAccountType == 0;
                } else if (value === 1) {
                    return row.compayAccountType == 1;
                }
            }
        },
        {
            title: '超级管理员',
            key: 'createTime',
            align: 'center'
        },
        {
            title: '体验账户',
            key: 'email',
            align: 'center'
        },
        {
            title: '体验截止时间',
            key: 'text',
            align: 'center'
        },
        {
            title: '定制模块',
            key: 'text',
            align: 'center'
        },
        {
            title: '租户状态',
            key: 'isActive',
            align: 'center',
            filters: [
              {
                  label: '正常',
                  value: 0
              },
              {
                  label: '停用',
                  value: 1
              }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
                if (value === 0) {
                    return row.isActive == 0;
                } else if (value === 1) {
                    return row.isActive == 1;
                }
            }
        },
        {
            title: '最近更新时间',
            key: 'text',
            align: 'center'
        },
        {
            title: '操作',
            slot: 'action',
            width: 200,
            align: 'center',
        }
      ],
      list: [],
    }
  },
  mounted() {
    //
    getLesseePageByName(this.query).then(data => {
      // debugger
      console.log(data)
      this.loading = false
      this.list = data.list
    })
  },
  methods: {
    search() {
      this.loading = true
      this.query.page = 1
      this.query.size = 1
      getLesseePageByName(this.query).then(data => {
        console.log(data)
        this.loading = false
        this.list = data.list
      })
    },
    edit() {

    },
    goDetail() {

    },
    set() {

    },
    goPage(name) {
      this.$router.push({name})
    },
    getListByPage(page) {
      console.log(1)
      this.loading = true
      this.query.page = page
      getLesseePage(this.query).then(data => {
        console.log(data)
        this.loading = false
        this.list = data.list
      })
    }
  }
};
</script>

<style lang="less" scoped>
  @import url('./home.less');
</style>
