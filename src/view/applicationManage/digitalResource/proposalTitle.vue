<style lang="less" scoped>
/deep/.dialog {
  // width: 350px;
  overflow: visible;
}
/deep/.ivu-checkbox-group-item {
  display: block;
  margin-bottom: 5px;
}
.checkbox-wrap {
  max-height: 300px;
  overflow: auto;
}
.pb24 {
  margin: 0 24px;
}
.tag-wrap {
  display: inline-block;
  max-width: 400px;
  overflow: auto;
  vertical-align: bottom;
}
</style>

<template>
  <div>
    <!-- <div class="right">
          <Button type="primary" size="small" style="margin-right:5px;" @click="edit(0)">添加分类</Button>
          <Button type="primary" size="small" style="margin-right:5px;" @click="edit(1)">添加标题</Button>
    </div>-->
    <div class="pb24">
      <Input
        v-model="query.params"
        class="search-input bg"
        placeholder="请输入关键字搜索"
        style="width:280px;"
      />
      <Button type="primary" shape="circle" icon="ios-search" @click="getData(1)"></Button>
      <div class="fr">
        <Button type="primary" @click="edit(0)">添加标题</Button>
      </div>
    </div>
    <Table :loading="loading" :columns="columns" :data="list" no-data-text="暂无标题，请添加">
      <template slot-scope="{ row }" slot="classifyId">{{listClass[row.classifyId]}}</template>
      <template slot-scope="{ row }" slot="action">
        <span class="button-pri" @click="edit(0, row)">编辑</span>
        <span class="button-err" @click="remove(row.id)">删除</span>
      </template>
    </Table>

    <Page :total="~~total" show-elevator show-total class="c-page" @on-change="getData" />

    <dialogBox key="1" v-model="isShow">
      <template slot="title">{{form.id ? '编辑' : '新建'}}标题</template>
      <template>
        <Form ref="form" :model="form" :rules="rules" :label-width="80">
          <FormItem prop="title" label="标题">
            <Input type="text" v-model="form.title" placeholder="请输入标题"></Input>
          </FormItem>
          <FormItem prop="classifyId" label="所属分类">
            <Select v-model="form.classifyId">
              <Option v-for="(value, key, index) in listClass" :value="key" :key="index">{{ value }}</Option>
            </Select>
          </FormItem>
          <FormItem label="关联产品">
            <div class="tag-wrap">
              <Tag
                v-for="(item, index) of form.products"
                size="medium"
                :key="index"
                closable
                @on-close="cancelPro(item)"
              >{{item}}</Tag>
            </div>
            <Icon type="ios-add-circle-outline" size="22" color="#6582FF" @click="edit(1)" />
          </FormItem>
          <div class="ar">
            <Button type="primary" ghost @click="isShow = false">取消</Button>
            <Button type="primary" @click="submit()">确定</Button>
          </div>
        </Form>
      </template>
    </dialogBox>

    <dialogBox key="2" v-model="isShow1">
      <template slot="title">关联产品</template>
      <template>
        <Form ref="form1" inline>
          <FormItem>
            <Input
              type="text"
              v-model="queryPro.productName"
              class="search-input bg"
              placeholder="请输入产品关键字搜索"
              style="width:180px;"
            />
            <Button type="primary" shape="circle" icon="ios-search" @click="getProList()"></Button>
          </FormItem>

          <FormItem>
            <Select v-model="queryPro.supplierId" placeholder="保险公司">
              <Option
                v-for="(item, index) of listBrand"
                :value="item.id"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </FormItem>

          <FormItem>
            <Select v-model="queryPro.productType" placeholder="产品分类">
              <Option v-for="(item, index) of listType" :value="index + ''" :key="index">{{ item }}</Option>
            </Select>
          </FormItem>
        </Form>
        <div class="checkbox-wrap">
          <CheckboxGroup v-model="form.productIds">
            <Checkbox
              :label="item.id"
              v-for="(item, index) of listPro"
              :key="index"
              @click.native="selectPro(item.productFullName)"
            >{{item.productFullName}}</Checkbox>
          </CheckboxGroup>
        </div>

        <div class="ar">
          <Button type="primary" ghost @click="isShow1 = false">取消</Button>
          <Button type="primary" @click="confirm">确定</Button>
        </div>
      </template>
    </dialogBox>
  </div>
</template>

<script>
import {
  getProposalPage,
  saveProposal,
  deleteProposal,
  getProposalDictPage,
  saveProposalDict,
  getProducts,
  getClasses
} from "@/api/proposal";
import { getSupplierPage } from "@/api/supplier";

const form = {
  classifyId: "",
  title: "",
  cover: "",
  type: 0,
  productIds: [],
  products: [],
  createTime: "",
  updateTime: ""
};

export default {
  data() {
    return {
      loading: true,
      query: {
        page: 1,
        size: 10,
        type: 0, // * 标题
        classifyId: "",
        params: ""
      },
      queryPro: {
        productName: "",
        supplierId: "",
        productType: ""
      },
      columns: [
        {
          title: "标题",
          key: "title"
        },
        {
          title: "分类",
          slot: "classifyId"
        },
        {
          title: "关联产品",
          key: "products"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      list: [],
      // listClass: [
      //   { dataCode: "1", dataName: "健康类" },
      //   { dataCode: "2", dataName: "养老类" },
      //   { dataCode: "3", dataName: "教育类" },
      //   { dataCode: "4", dataName: "理财类" },
      //   { dataCode: "5", dataName: "保障类" },
      //   { dataCode: "6", dataName: "人寿类" },
      //   { dataCode: "7", dataName: "意外类" }
      // ],
      listClass: {},
      rules: {
        title: [{ required: true, message: "不能为空", trigger: "blur" }],
        classifyId: [{ required: true, message: "不能为空", trigger: "change" }]
      },
      form: JSON.parse(JSON.stringify(form)),
      isShow: false,
      isShow1: false,
      total: 0,

      listPro: [],
      relatePro: [],
      listBrand: [],
      listType: ["家庭保障", "健康医疗", "子女教育", "退休养老", "财富传承"]
    };
  },
  computed: {},
  // watch: {
  //   isShow(val) {
  //     if (!val) {
  //       this.cancel();
  //     }
  //   },
  //   isShow1(val) {
  //     if (!val) {
  //       this.cancel();
  //     }
  //   }
  // },
  mounted() {
    getClasses().then(res => {
      // console.log("ProposalDictPage", res);
      // 先写死，后期获取
      let temp = {};
      for (const iterator of res) {
        temp[iterator.dataCode] = iterator.dataName;
      }
      this.listClass = temp;
      this.getData();
    });
  },
  methods: {
    getData(page) {
      this.loading = true;
      page && (this.query.page = page);
      getProposalPage(this.query).then(res => {
        // console.log('ProposalPage: ', res);
        this.loading = false;
        this.list = res.list;
        this.total = res.total;
      });
    },
    edit(_type, item) {
      if (_type === 0) {
        this.form = Object.assign({}, item || JSON.parse(JSON.stringify(form)));
        // console.log(this.form)
        if (item) {
          this.form.products = this.form.products
            ? this.form.products.split(",")
            : [];
          this.form.productIds = this.form.productIds
            ? this.form.productIds.split(",")
            : [];
        }
        this.isShow = true;
        this.$refs.form.resetFields();
      } else {
        // 显示关联产品框
        this.isShow1 = true;

        // 获取保险企业列表
        !this.listBrand &&
          getSupplierPage({ page: 1, size: 100 }).then(res => {
            this.listBrand = res.list;
          });
      }
    },
    submit() {
      // console.log(item);
      // 0 分类 ， 1 建议书
      // console.log('supplierForm', this.supplierForm)
      // console.log('productForm', this.productForm)
      this.$refs.form
        .validate()
        .then(data => {
          if (data) {
            let formData = JSON.parse(JSON.stringify(this.form));
            formData.products += "";
            formData.productIds += "";
            return saveProposal(formData);
          } else {
            return Promise.reject();
          }
        })
        .then(data => {
          // 判读是否为添加操作
          if (this.form.id) {
            this.query.params = ''
          }
          
          this.getData();
          this.$Message.success("操作成功");
          this.cancel();
        });
    },
    confirm() {
      this.isShow1 = false;
      // this.form.productIds = [...new Set(this.form.productIds.split(',').concat(this.relatePro))] + ''
      // this.form.products = [...new Set(this.form.productIds.concat(this.relatePro))] + ''
    },
    cancel() {
      this.$refs.form.resetFields();
      this.isShow = false;
    },
    remove(id) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除吗",
        onOk: () => {
          deleteProposal(id).then(data => {
            this.getData();
            this.$Message.success("操作成功");
          });
        }
      });
    },
    getProList() {
      getProducts(this.queryPro).then(res => {
        this.listPro = res;
      });
    },
    selectPro(data) {
      let arr = this.form.products;
      if (arr.includes(data)) {
        arr.splice(arr.indexOf(data), 1);
      } else {
        arr.push(data);
      }
      console.log(this.form.products);
    },
    cancelPro(data) {
      this.form.products.splice(this.form.products.indexOf(data), 1);
    }
  }
};
</script>
