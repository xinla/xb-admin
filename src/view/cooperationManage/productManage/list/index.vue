<template>
  <div>
    <div class="title">产品列表</div>

    <Row style="padding-bottom: 10px;">
        <Col span="18">
          <Button type="info" @click="goPage('createProduct')">新建产品</Button>
        </Col>
        <Col span="6">
          <Input v-model="query.searchValue" placeholder="搜索供应商/产品名称/代码" style="width:73%; margin-right: 10px;" />
          <Button type="info" @click="search()">搜索</Button>
        </Col>
    </Row>

    <Table 
    border
    :loading="loading"
    :columns="columns"
    :data="list">
      <template slot-scope="{ row }" slot="productType">
          {{row.productType | productType}}
      </template>

      <template slot-scope="{ row }" slot="age">
          {{row.applicationAgeStart + '-' + row.applicationAgeEnd + '周岁'}}
      </template>

      <template slot-scope="{ row }" slot="distributionChannel">
        <span v-for="(item, index) in row.distributionChannel.split(',')" :key="index">
       {{ item | channel}} ,
        </span>
      </template>

      <template slot-scope="{ row }" slot="onlineAddress">
        <div v-for="(item, index) in JSON.parse(row.onlineAddress)" :key="index">
          {{item.linkAddress}}
        </div>
      </template>
      

      <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="goPage('createProduct', {id: row.productId})">编辑</Button>
          <Button type="error" size="small" style="margin-right: 5px" @click="goPage('createProduct', {id: row.productId})">详情</Button>
          <Button type="error" size="small" style="margin-right: 5px" @click="goPage('', {id: row.productId})">H5</Button>
          <Button type="error" size="small" style="margin-right: 5px" @click="sale(row.productId)">上架</Button>
      </template>
    </Table>

    <Page :total="total" show-elevator show-total style="text-align:center;margin-top:20px;" @on-change="getData"/>

  </div>
</template>

<script>
import { getProductPage, saleProduct } from '@/api/product'
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
const productType = []
export default {
  filters: {
    channel(val) {
      return channel[val].label
    },
    productType(val) {
      let arr = val.split(",")
      let res = ''
      for (const _val of arr) {
        for (const iterator of productType) {
          if (iterator.value === _val) {
            res += iterator.label + ','
            break
          }
        }
      }
      return res
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
            key: 'productCode',
            align: 'center'
        },
        {
            title: '产品名称',
            key: 'productFullName',
            align: 'center',
            minWidth: 80
        },
        {
            title: '产品类型',
            slot: 'productType',
            align: 'center',
            filters: productType,
            filterMultiple: true,
            filterMethod (value, row) {
                return row.productType.includes(value)
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
            slot: 'onlineAddress',
            minWidth: 60,
            align: 'center'
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
      // 获取产品分类数据
      getTypeRulePage(1).then(data => {
        // console.log('TypeRule', data)
        let temp = data.list
        for (const iterator of temp) {
          productType.push({
            label: iterator.name,
            value: iterator.id
          })
        }
      })
    },
    getData(pageNum) {
      this.loading = true;
      pageNum && (this.query.pageNum = pageNum);
      getProductPage(this.query).then(data => {
        console.log(data)
        this.loading = false
        this.list = data.list
        this.total = data.total
      })
    },
    search() {
      this.query.pageNum = 1
      this.getData()
    },
    goPage(name, query) {
      this.$router.push({name, query})
    },
    sale(data) {
      saleProduct(data).then(res => {
        this.$Message.info("上架成功");
      })
    }
  }
};
</script>

<style lang="less" scoped>
  .title{
    padding: 0px 0px 20px 10px;
    font-size: 20px;
  }
</style>
