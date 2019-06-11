<template>
  <div>
    <Row style="padding-bottom: 10px;">
      <Col span="16">
        <Button type="info" @click="edit()">新建</Button>
      </Col>
      <Col span="8">
        所在省市
        <Cascader
          :data="districtsList"
          placeholder="所在省市"
          change-on-select
          style="width:30%;display:inline-block;margin-right: 2%;"
          v-model="selectDistrict"
        ></Cascader>
        <Input v-model="query.name" placeholder="搜索公司" style="width:40%; margin-right: 10px;"/>
        <Button type="info" @click="search()">搜索</Button>
      </Col>
    </Row>

    <Table border :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="name">
        <div
          class="a"
          @click="$router.push({name: 'companyDetail', query: {id: row.id, type: 'company'}})"
        >{{row.name}}</div>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row)">编辑</Button>
        <Button type="error" size="small" style="margin-right: 5px" @click="remove(row)">删除</Button>
        <Button type="error" size="small" @click="set(row)">转移</Button>
      </template>
    </Table>

    <Page
      :total="total"
      show-elevator
      show-total
      style="text-align:center;margin-top:20px;"
      @on-change="getData"
    />

    <dialogBox v-model="isShow">
      <template slot="title">添加标题</template>
      <template>
        <Form ref="form" :model="form" :rules="rules" :label-width="80">
          <FormItem prop="title" label="公司名称">
            <Input type="text" v-model="form.name" placeholder="请输入公司名称"></Input>
          </FormItem>

          <FormItem prop="_selectDistrict" label="公司地址">
            <Cascader
              :data="districtsList"
              placeholder="所在省市"
              change-on-select
              v-model="form._selectDistrict"
            ></Cascader>
          </FormItem>

          <FormItem prop="_address">
            <Input type="text" v-model="form._address" placeholder="请输入详细地址"></Input>
          </FormItem>

          <FormItem label="注册时间" prop="establishTime">
            <DatePicker
              type="date"
              format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择时间"
              style="width: 100%;"
              :value="form.establishTime"
              @on-change="changeTime"
            ></DatePicker>
          </FormItem>

          <FormItem prop="managementStatus" label="经营状态">
            <Select v-model="form.managementStatus">
              <Option v-for="(item, index) of stateList" :value="item" :key="index">{{ item }}</Option>
            </Select>
          </FormItem>

          <Button
            type="primary"
            size="small"
            style="display: block; margin: 0 auto"
            @click="submit(form)"
          >确定</Button>
        </Form>
      </template>
    </dialogBox>
  </div>
</template>

<script>
import { getLesseePageByJB, saveCompanyBusinessInformation, deleteCompanyBusinessInformation } from "@/api/lessee";
import { getDistrict } from "@/api/common";
import dialogBox from "@/components/dialogBox";

const form = {
  name: "",
  establishTime: "",
  managementStatus: "",
  provinceName: "",
  areaName: "",
  type: 1,
  companyAddress: '',
  _selectDistrict: [],
  _address: ''
};
export default {
  components: { dialogBox },
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
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          minWidth: 100,
          align: "center"
        }
      ],
      rules: {
        _address: [{ required: true, message: "不能为空", trigger: "blur" }],
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        establishTime: [{ required: true, message: "不能为空", trigger: "blur" }],
        managementStatus: [{ required: true, message: "不能为空", trigger: "change" }],
        _selectDistrict: [{ required: true, type: 'array', message: "不能为空", trigger: "change" }]
      },
      form: Object.assign({}, form),
      list: [],
      districtsList: [], // 行政区划表
      selectDistrict: [], // 选择的省市
      total: 0,
      isShow: false,
      stateList: ["存续", "在业", "吊销", "注销", "迁入", "迁出", "停业", "结算"],
      // stateList: {
      //   0: "存续",
      //   1: "在业",
      //   2: "吊销",
      //   3: "注销",
      //   4: "迁入",
      //   5: "迁出",
      //   6: "停业",
      //   7: "结算"
      // }
    };
  },
  watch: {
    selectDistrict(val) {
      this.query.provinceName = val[0] || "";
      this.query.areaName = val[1] || "";
    },
    "form._selectDistrict"(val) {
      this.form.provinceName = val[0] || "";
      this.form.areaName = val[1] || "";
      // console.log(this.form)
    },
    isShow(val) {
      if (!val) {
        this.cancel();
      }
    }
  },
  mounted() {
    // 获取行政区划数据
    getDistrict().then(data => {
      // console.log(data)
      let districtsFull = data;
      recursiveExtract(this.districtsList, districtsFull);
      // console.log(this.districtsList)

      // 递归提取省市
      function recursiveExtract(arr1, arr2) {
        for (const iterator of arr2) {
          arr1.push({
            value: iterator.name,
            label: iterator.name,
            children: []
          });
          iterator.districts.length &&
            recursiveExtract(
              arr1[arr1.length - 1].children,
              iterator.districts
            );
        }
      }
    });

    this.getData();
  },
  methods: {
    getData(page) {
      this.loading = true;
      page && (this.query.page = page);
      getLesseePageByJB(this.query).then(data => {
        // console.log(data);
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
    edit(data) {
      this.isShow = true;
      this.form = Object.assign({}, form);
      data && (this.form = Object.assign({}, data));
      this.form._selectDistrict = [this.form.provinceName, this.form.areaName]
      this.form._address = this.form.companyAddress
    },
    remove(data) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除吗",
        onOk: () => {
          deleteCompanyBusinessInformation(data).then(res => {
            this.getData();
            this.$Message.success("操作成功");
          });
        }
      });
    },
    set(data) {},
    changeTime(data) {
      // console.log(data)
      this.form.establishTime = data;
    },
    submit(item) {
      console.log(item);
      this.form.companyAddress = this.form.provinceName + this.form.areaName + this.form._address
      this.$refs.form
        .validate()
        .then(data => {
          if (data) {
            return saveCompanyBusinessInformation(item);
          } else {
            return Promise.reject();
          }
        })
        .then(data => {
          this.getData();
          this.$Message.success("操作成功");
          this.cancel();
        });
    },
    cancel() {
      this.$refs.form.resetFields();
      this.isShow = false;
    }
  }
};
</script>

<style lang="less" scoped>
.ivu-select {
  margin-right: 10px;
}
</style>
