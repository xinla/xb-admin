<template>
  <div>
    <div class="title">产品列表</div>

    <Row style="padding-bottom: 10px;">
        <Col span="16">
          <Button type="info" @click="goPage('createProduct')">新建产品</Button>
        </Col>
        <Col span="8">
          <Input v-model="query.searchValue" placeholder="搜索供应商/产品名称/代码" style="width:73%; margin-right: 10px;" />
          <Button type="info" @click="search()">搜索</Button>
        </Col>
    </Row>

    <Table 
    border
    :loading="loading"
    :columns="columns"
    :data="list">
      <template slot-scope="{ row }" slot="age">
          {{row.applicationAgeStart + '-' + row.applicationAgeEnd + '周岁'}}
      </template>

      <template slot-scope="{ row }" slot="distributionChannel">
        <span v-for="(item, index) in row.distributionChannel.split(',')" :key="index">
       {{ item | channel}} ,
        </span>
      </template>

      <template slot-scope="{ row }" slot="onlineApplication">
        <div v-for="(item, index) in JSON.parse(row.onlineApplication)" :key="index">
          {{item.linkAddress}}
        </div>
      </template>
      

      <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="goPage('createProduct', {id: row.productId})">编辑</Button>
          <Button type="error" size="small" style="margin-right: 5px" @click="goPage('createProduct', {id: row.productId})">详情</Button>
          <Button type="error" size="small" style="margin-right: 5px" @click="goPage('', {id: row.productId})">H5</Button>
      </template>
    </Table>

    <Page :total="total" show-elevator show-total style="text-align:center;margin-top:20px;" @on-change="getData"/>

  </div>
</template>

<script>
import { getProductPage } from '@/api/product'
import { getTypeRulePage } from '@/api/rulesSet/type'

const channel = [
  {
      label: '经代',
      value: 0
  },
  {
      label: '互联网',
      value: 1
  },
  {
      label: '个险',
      value: 2
  },
  {
      label: '银保',
      value: 3
  },
]
const typeRuleName = [
  {
      label: '经代',
      value: 0
  },
  {
      label: '互联网',
      value: 1
  },
  {
      label: '个险',
      value: 2
  },
  {
      label: '银保',
      value: 3
  },
]
export default {
  filters: {
    channel(val) {
      return channel[val].label
    }
  },
  data() {
    return {
      loading: true,
      query: {
        pageNum: 1,
        pageSize: 10,
        searchValue: '',
        typeRuleId: '',
        distributionChannel: ''
      },
      columns: [
        {
            title: '序号',
            type: 'index',
            align: 'center'
        },
        {
            title: '供应商名称',
            key: 'supplierName',
            align: 'center',
            minWidth: 80
        },
        {
            title: '产品代码',
            key: 'code',
            align: 'center'
        },
        {
            title: '产品名称',
            key: 'productName',
            align: 'center',
            minWidth: 80
        },
        {
            title: '产品类型',
            key: 'typeRuleName',
            align: 'center',
            filters: typeRuleName,
            filterMultiple: false,
            filterMethod (value, row) {
                return row.typeRuleName === 'value'
            }
        },
        {
            title: '分销渠道',
            slot: 'distributionChannel',
            align: 'center',
            filters: channel,
            filterMultiple: false,
            filterMethod (value, row) {
              return row.distributionChannel === 'value'
            }
        },
        {
            title: '投保年龄',
            slot: 'age',
            align: 'center'
        },
        {
            title: '投保期限',
            key: 'applicationDuration',
            align: 'center'
        },
        {
            title: '在线投保',
            slot: 'onlineApplication',
            minWidth: 60,
            align: 'center'
        },
        {
            title: '最近更新时间',
            key: 'updateTime',
            align: 'center',
            minWidth: 80
        },
        {
            title: '操作',
            slot: 'action',
            minWidth: 80,
            align: 'center',
        }
      ],
      list: [],
      total: 0,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getData()
      getTypeRulePage(1).then(data => {
        console.log(data)
      })
    },
    getData(page) {
      this.loading = true;
      page && (this.query.page = page);
      getProductPage(this.query).then(data => {
        console.log(data)
        this.loading = false
        this.list = data.list
        this.total = data.total
      })
    },
    search() {
      this.query.page = 1
      this.query.size = 10
      this.getData()
    },
    goPage(name, query) {
      this.$router.push({name, query})
    },
  }
};
</script>

<style lang="less" scoped>
  .title{
    padding: 0px 0px 20px 10px;
    font-size: 20px;
  }
</style>
