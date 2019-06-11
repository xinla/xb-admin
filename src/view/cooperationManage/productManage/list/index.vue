<template>
  <div>
    <div class="title">产品列表</div>

    <Row style="padding-bottom: 10px;">
        <Col span="18">
          <Button type="info" @click="goPage('createProduct')">新建产品</Button>
        </Col>
        <Col span="6">
          <Input v-model="query.searchValue" placeholder="搜索品牌/产品名称/代码" style="width:73%; margin-right: 10px;" />
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

      <!-- <template slot-scope="{ row }" slot="age">
          {{row.applicationAgeStart + '-' + row.applicationAgeEnd + '周岁'}}
      </template> -->

      <template slot-scope="{ row }" slot="isSale">
          {{row.isSale === 1 ? '在售' : '停售'}}
      </template>

      <template slot-scope="{ row }" slot="publishStatus">
          {{row.isPublish | publishStatus}}
      </template>

      <template slot-scope="{ row }" slot="distributionChannel">
        <span v-for="(item, index) in row.distributionChannel.split(',')" :key="index">
       {{ item | channel}} {{index ? ',' : ''}}
        </span>
      </template>

      <template slot-scope="{ row }" slot="onlineAddress">
        <div v-for="(item, index) in JSON.parse(row.onlineAddress)" :key="index">
          {{item.code === 0 ? '现保' : ''}}
          {{item.linkAddress}}
        </div>
      </template>
      

      <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="goPage('createProduct', {id: row.productId})">编辑</Button>
          <Button type="warning" size="small" style="margin-right: 5px" :to="'http://' + row.h5Url" target="_blank">H5</Button>
          <Button type="success" size="small" style="margin-right: 5px" @click="sale(row)">{{row.isSale === 1 ? '停售' : '在售'}}</Button>
          <Button type="info" size="small" style="margin-right: 5px" @click="publish(row)">{{row.isPublish === 1 ? '撤回' : '发布'}}</Button>
          <Button type="error" size="small" style="margin-right: 5px" @click="remove(row)">删除</Button>
      </template>
    </Table>

    <Page :total="total" show-elevator show-total style="text-align:center;margin-top:20px;" @on-change="getData"/>

  </div>
</template>

<script>
import { getProductPage, saleProduct, publishProduct, deleteProduct } from '@/api/product'
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
const publishStatus = [
  {
      label: '未发布',
      value: 0
  },
  {
      label: '已发布',
      value: 1
  },
]
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
    },
    publishStatus(val) {
      return publishStatus[val].label
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
            align: 'center',
            maxWidth: 60
        },
        {
            title: '品牌名称',
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
            minWidth: 40
        },
        {
            title: '产品类型',
            slot: 'productType',
            align: 'center',
            minWidth: 80,
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
            minWidth: 80,
            filters: channel,
            filterMultiple: false,
            filterMethod (value, row) {
              return row.distributionChannel === 'value'
            }
        },
        // {
        //     title: '投保年龄',
        //     slot: 'age',
        //     align: 'center'
        // },
        // {
        //     title: '投保期限',
        //     key: 'applicationDuration',
        //     align: 'center'
        // },
        {
            title: '在售状态',
            slot: 'isSale',
            width: 100,
            align: 'center'
        },
        {
            title: '在线投保',
            slot: 'onlineAddress',
            minWidth: 60,
            align: 'center'
        },
        {
            title: '发布状态',
            slot: 'publishStatus',
            align: 'center',
            filters: publishStatus,
            filterMultiple: false,
            filterMethod (value, row) {
              return row.isPublish === 'value'
            }
        },
        {
            title: '操作',
            slot: 'action',
            minWidth: 150,
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
        // console.log(data)
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
      let status = data.isSale === 1 ? 0 : 1
      saleProduct(data.productId, status).then(res => {
        this.$Message.info("执行成功");
        this.getData()
      })
    },
    publish(data) {
      let status = data.isPublish === 1 ? 0 : 1
      publishProduct(data.productId, status).then(res => {
        this.$Message.info("执行成功");
        this.getData()
      })
    },
    remove(data) {
      if (data.isSale) {
        this.$Message.error("在售产品，不可删除，请知悉");
      } else {
        this.$Modal.confirm({
          title: "提示",
          content: "确定要删除吗",
          onOk: () => {
            deleteProduct(data.productId).then(res => {
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
</style>
