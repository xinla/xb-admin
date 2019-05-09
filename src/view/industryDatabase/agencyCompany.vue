<template>
  <div>
    <Row style="padding-bottom: 10px;">
      <Col span="10">
        <Button type="info" @click="goPage('')">新建</Button>
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
      <template slot-scope="{ row }" slot="name" >
        <div class="a" @click="$router.push({name: 'companyDetail', query: {id: row.companyId}})">{{row.name}}</div>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row)">编辑</Button>
        <Button type="error" size="small" style="margin-right: 5px" @click="deleteItem(row)">删除</Button>
        <Button type="error" size="small" @click="set(row)">转移</Button>
      </template>
    </Table>

    <Page
      :total="total"
      show-elevator
      show-total
      style="text-align:center;margin-top:20px;"
      @on-change="getDataPage"
    />
  </div>
</template>

<script>
import { getLesseePageByJB } from "@/api/lessee";
import { getDistrict } from "@/api/common";
export default {
  // filters: {
  //   timeFormat(val) {
  //     return val.substring(0, val.indexOf("T"));
  //   }
  // },
  props: {
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
        type: 1, // 1是经代,0是保险( json格式)
        name: "",
        provinceName: "",
        areaName: ""
      },
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          Width: 60
        },
        {
          title: "公司名称",
          key: "name",
          slot: "name",
          align: "center",
          minWidth: 160
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
          align: "center",
          minWidth: 260
        },
        {
          title: "注册时间",
          key: "establishTime",
          align: "center",
          minWidth: 50
        },
        {
          title: "公司状态",
          key: "managementStatus",
          align: "center",
        },
        {
          title: "操作",
          slot: "action",
          minWidth: 130,
          align: "center"
        }
      ],
      list: [],
      districtsList: [], // 行政区划表
      selectDistrict: [], // 选择的省市
      total: 0
    };
  },
  watch: {
    selectDistrict() {
      this.query.provinceName = this.selectDistrict[0] || "";
      this.query.areaName = this.selectDistrict[1] || "";
    }
  },
  mounted() {
    // 获取行政区划数据
    getDistrict()
    .then(data => {
      // console.log(data.data.districts[0].districts)
      let districtsFull = data;
      recursiveExtract(this.districtsList, districtsFull);
      // console.log(this.districtsList)

      // 提取省市 （若使用递归会报：栈溢出错误，带后续探究）
      function recursiveExtract(arr1, arr2) {
        for (const iterator of districtsFull) {
          arr1.push({
            value: iterator.name,
            label: iterator.name,
            children: []
          });
          if (iterator.districts.length) {
            for (const iterator of iterator.districts) {
              arr1[arr1.length - 1].children.push({
                value: iterator.name,
                label: iterator.name
              });
            }
          }
          // iterator.districts.length && recursiveExtract(arr1[arr1.length - 1].children, iterator.districts)
        }
      }
    });

    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      getLesseePageByJB(this.query).then(data => {
        console.log(data);
        this.loading = false;
        this.list = data.list;
        this.total = data.total;
      });
    },
    search() {
      this.query.page = 1;
      this.query.size = 10;
      // console.log(this.query);
      this.getData();
    },
    edit(data) {},
    deleteItem(data) {},
    goDetail(data) {},
    set(data) {},
    goPage(name) {
      this.$router.push({ name });
    },
    getDataPage(page) {
      this.query.page = +page;
      this.getData()
    }
  }
};
</script>

<style lang="less" scoped>
.ivu-select {
  margin-right: 10px;
}
</style>
