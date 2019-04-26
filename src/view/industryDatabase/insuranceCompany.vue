<template>
  <div>
    <Row style="padding-bottom: 10px;">
      <Col span="10">
        <Button type="info" @click="goPage('createLessee')">新建</Button>
      </Col>
      <Col span="14">
        所在省市
        <Cascader 
        :data="districtsList" 
        placeholder="所在省市" 
        change-on-select 
        style="width:200px;display:inline-block;"
        v-model="selectDistrict"
        ></Cascader>
        <Input v-model="query.name" placeholder="搜索公司" style="width:30%; margin-right: 10px;"/>
        <Button type="info" @click="search()">搜索</Button>
      </Col>
    </Row>

    <Table border :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row, index }" slot="establishTime">
        {{row.establishTime | timeFormat}}
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
        <Button
          type="error"
          size="small"
          style="margin-right: 5px"
          @click="deleteItem(row)"
        >删除</Button>
        <Button type="error" size="small" @click="set(index)">转移</Button>
      </template>
    </Table>

    <Page
      :total="100"
      show-elevator
      show-total
      style="text-align:center;margin-top:20px;"
      @on-Change="getListByPage"
    />
  </div>
</template>

<script>
import { getLesseePageByJB } from "@/api/lessee"
import { getDistrict } from "@/api/common"
export default {
  name: "home",
  filters: {
    timeFormat(val) {
      return val.substring(0, val.indexOf('T'))
    }
  },
  props:{
    type: {
      type: Number,
      // required: true,
      default: 1
    }
  },
  data() {
    return {
      loading: true,
      query: {
        page: 1,
        size: 10,
        type: 1,
        name: '',
        provinceName: '',
        areaName: ''
      },
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 60
        },
        {
          title: "公司名称",
          key: "name",
          align: "center"
        },
        {
          title: "公司类型",
          key: "companyType",
          align: "center",
          filters: [
            {
              label: "体验服务",
              value: 1
            },
            {
              label: "基础应用服务",
              value: 2
            },
            {
              label: "高级应用服务",
              value: 1
            },
            {
              label: "超级应用服务",
              value: 2
            },
            {
              label: "定制服务",
              value: 1
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 0) {
              return row.compayAccountType == 0;
            } else if (value === 1) {
              return row.compayAccountType == 1;
            }
          }
        },
        {
          title: "所在省",
          key: "provinceName",
          align: "center"
        },
        {
          title: "所在市",
          key: "areaName",
          align: "center"
        },
        {
          title: "公司地址",
          key: "companyAddress",
          align: "center"
        },
        {
          title: "注册时间",
          slot: 'establishTime',
          align: "center"
        },
        {
          title: "公司状态",
          key: "managementStatus",
          align: "center",
          filters: [
            {
              label: "正常",
              value: 0
            },
            {
              label: "停用",
              value: 1
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 0) {
              return row.isActive == 0;
            } else if (value === 1) {
              return row.isActive == 1;
            }
          }
        },
        {
          title: "操作",
          slot: "action",
          width: 180,
          align: "center"
        }
      ],
      list: [],
      districtsList: [], // 行政区划表
      selectDistrict: []  // 选择的省市
    };
  },
  watch: {
    selectDistrict() {
      this.query.provinceName = this.selectDistrict[0] || ''
      this.query.areaName = this.selectDistrict[1] || ''
    }
  },
  mounted() {
    getDistrict().then(data=> {
      // console.log(data.data.districts[0].districts)
      let districtsFull = data.data.districts[0].districts
      recursiveExtract(this.districtsList, districtsFull)
      // console.log(this.districtsList)

      // 提取省市 （若使用递归会报：栈溢出错误，带后续探究）
      function recursiveExtract(arr1, arr2) {
        for (const iterator of districtsFull) {
          arr1.push(
            {
              value: iterator.name,
              label: iterator.name,
              children: []
            }
          )
          if (iterator.districts.length) {
            for( const iterator of iterator.districts ) {
              arr1[arr1.length - 1].children.push(
                {
                  value: iterator.name,
                  label: iterator.name,
                }
              )
            }
          }
          // iterator.districts.length && recursiveExtract(arr1[arr1.length - 1].children, iterator.districts)
        }
      }
    })

    getLesseePageByJB(this.query).then(data => {
      // debugger
      console.log(data);
      this.loading = false;
      this.list = data.list;
    });
  },
  methods: {
    search() {
      this.loading = true;
      this.query.page = 1;
      this.query.size = 10;
      console.log(this.query);
      getLesseePageByJB(this.query).then(data => {
        console.log(data);
        this.loading = false;
        this.list = data.list;
      });
    },
    edit() {},
    deleteItem(data) {
      
    },
    goDetail() {},
    set() {},
    goPage(name) {
      this.$router.push({ name });
    },
    getListByPage(page) {
      console.log(1);
      this.loading = true;
      this.query.page = page;
      getLesseePage(this.query).then(data => {
        console.log(data);
        this.loading = false;
        this.list = data.list;
      });
    },
  }

}
</script>

<style lang="less" scoped>
.ivu-select {
  margin-right: 10px;
}
</style>
