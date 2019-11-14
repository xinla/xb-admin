<template>
  <Form ref="form" :model="form" :rules="rules" :label-width="120">
    <Row>
      <Col span="8">
        <FormItem label="产品全称" prop="productFullName">
          <Input type="text" v-model="form.productFullName" placeholder="产品全称" />
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="产品简称" prop="productAbbr">
          <Input type="text" v-model="form.productAbbr" placeholder="产品简称" />
        </FormItem>
      </Col>
      <Col span="8" class="ar">
      <Button class="button" @click="submit()">保存</Button>
      <Button class="button" @click="clear()">清空</Button>
    </Col>
    </Row>
    <Row>
      <Col span="8">
        <FormItem label="产品代码" prop="productCode">
          <Input type="text" v-model="form.productCode" placeholder="产品代码" />
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="所属品牌" prop="name">
          <selectSupplier :val="form.name" type="brand" @change="change" />
        </FormItem>
      </Col>
    </Row>

    <FormItem label="所属大类" prop="mainClass">
      <RadioGroup v-model="form.mainClass">
        <Radio v-for="(item, index) of allClass" :label="item.id" :key="index">{{item.name}}</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem label="所属中类" prop="mediumClass">
      <template v-for="item of allClass">
        <RadioGroup v-model="form.mediumClass" v-show="form.mainClass === item.id">
          <Radio
            v-for="(unit, index) of item.children"
            :label="unit.id"
            :key="index"
          >{{unit.name}}</Radio>
        </RadioGroup>
      </template>
    </FormItem>

    <FormItem label="所属小类" prop="smallClass">
      <template v-for="item of allClass">
      <div v-for="_item of item.children" :key="_item.id">
        <CheckboxGroup v-model="form.smallClass" v-show="form.mediumClass === _item.id">
          <Checkbox
            v-for="unit of _item.children"
            :key="unit.id"
            :label="unit.id"
          >{{unit.name}}</Checkbox>
        </CheckboxGroup>
      </div>
       </template>
    </FormItem>

    <FormItem label="保障功能" prop="protectFunction">
      <CheckboxGroup v-model="form.protectFunction">
        <Checkbox label="0">家庭保障</Checkbox>
        <Checkbox label="1">健康医疗</Checkbox>
        <Checkbox label="2">子女教育</Checkbox>
        <Checkbox label="3">退休养老</Checkbox>
        <Checkbox label="4">财富传承</Checkbox>
      </CheckboxGroup>
    </FormItem>

    <FormItem label="适合人群" prop="ageLevel">
      <CheckboxGroup v-model="form.ageLevel">
        <Checkbox label="0">母婴</Checkbox>
        <Checkbox label="1">少儿</Checkbox>
        <Checkbox label="2">青中年</Checkbox>
        <Checkbox label="3">中老年</Checkbox>
        <Checkbox label="4">老年</Checkbox>
        <Checkbox label="5">全龄</Checkbox>
      </CheckboxGroup>
    </FormItem>

    <FormItem label="承保方式" prop="underwritingModel">
      <RadioGroup v-model="form.underwritingModel">
        <Radio :label="0">个人</Radio>
        <Radio :label="1">团体</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem label="承保周期" prop="underwritingPeriod">
      <RadioGroup v-model="form.underwritingPeriod">
        <Radio :label="0">短期</Radio>
        <Radio :label="1">长期</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem label="在售状态" prop="sale">
      <RadioGroup v-model="form.sale">
        <Radio :label="0">停售</Radio>
        <Radio :label="1">在售</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem label="产品形态" prop="productForm">
      <RadioGroup v-model="form.productForm">
        <Radio :label="0">主险</Radio>
        <Radio :label="1">附加险</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem label="分销渠道" prop="distributionChannel">
      <!-- <RadioGroup v-model="form.distributionChannel">
        <Radio label="0">传统经代</Radio>
      </RadioGroup> -->
      <CheckboxGroup v-model="form.distributionChannel">
        <Checkbox label="0">传统经代</Checkbox>
      </CheckboxGroup>
      <FormItem label="是否支持现保投保" prop>
        <RadioGroup v-model="form.vitSupport">
          <Radio :label="0">不支持</Radio>
          <Radio :label="1">支持</Radio>
        </RadioGroup>
      </FormItem>

      <!-- <RadioGroup v-model="form.distributionChannel">
        <Radio label="1">互联网</Radio>
      </RadioGroup> -->
      <CheckboxGroup v-model="form.distributionChannel">
        <Checkbox label="1">互联网</Checkbox>
      </CheckboxGroup>
      <FormItem label="互联网投保方式" prop>
        <RadioGroup v-model="form.internetInsurance">
          <Radio :label="0">H5</Radio>
          <Radio :label="1">API</Radio>
        </RadioGroup>
      </FormItem>
    </FormItem>

    <FormItem label="保险公司投保渠道">
      <Row>
        <Col span="10">
          <FormItem label="APP名称" prop="insuranceApp">
            <Input type="text" v-model="form.insuranceApp" placeholder="APP名称" />
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem label="PC网址" prop="insurancePc">
            <Input type="text" v-model="form.insurancePc" placeholder="PC网址" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="10">
          <FormItem label="H5网址" prop="insuranceH5">
            <Input type="text" v-model="form.insuranceH5" placeholder="H5网址" />
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem label="小程序" prop="insuranceSmallProgram">
            <Input type="text" v-model="form.insuranceSmallProgram" placeholder="小程序" />
          </FormItem>
        </Col>
      </Row>
    </FormItem>
  </Form>
</template>

<script>
import { getSupplierDetail } from "@/api/supplier";
import { getTypeRulePage, getAllInsuranceSubclass } from "@/api/rulesSet/type";
import {
  getProductInfo,
  fastCreateProductInfo,
  createProductInfo,
  updateProductInfo,
  deleteProduct
} from "@/api/product";

import selectSupplier from "@/components/selectSupplier";

const defaultForm = {
  productFullName: "",
  productAbbr: "",
  supplierId: "",
  name: "", // 所属品牌名称
  productCode: "",
  mainClass: "",
  mediumClass: "",
  smallClass: [],
  protectFunction: [],
  ageLevel: [],
  underwritingModel: 0,
  underwritingPeriod: 0,
  productForm: 0,
  distributionChannel: [],
  sale: 0,
  onlineInsurance: 0,
  insuranceApp: "",
  insurancePc: "",
  insuranceH5: "",
  insuranceSmallProgram: "",
  internetInsurance: 0,
  vitSupport: 0
};

export default {
  components: {
    selectSupplier
  },
  data() {
    return {
      loading: false,
      lesseeList: [],
      query: {
        pageNum: 1,
        pageSize: 10,
        type: 1,
        name: ""
      },
      form: JSON.parse(JSON.stringify(defaultForm)),
      rules: {
        productFullName: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        productAbbr: [{ required: true, message: "不能为空", trigger: "blur" }],
        supplierId: [{ required: true, message: "不能为空", trigger: "blur" }],
        name: [{ required: true, message: "不能为空", trigger: "change" }]
        // mainClass: [
        //   {
        //     type: "number",
        //     required: true,
        //     message: "不能为空",
        //     trigger: "change"
        //   }
        // ],
        // productCode: [{ required: true, message: "不能为空", trigger: "blur" }],
        // subClass: [
        //   {
        //     type: "array",
        //     required: true,
        //     message: "不能为空",
        //     trigger: "change"
        //   }
        // ],
        // protectFunction: [
        //   {
        //     type: "array",
        //     required: true,
        //     message: "不能为空",
        //     trigger: "change"
        //   }
        // ],
        // ageLevel: [
        //   {
        //     type: "array",
        //     required: true,
        //     message: "不能为空",
        //     trigger: "change"
        //   }
        // ],
        // underwritingModel: [
        //   {
        //     type: "number",
        //     required: true,
        //     message: "不能为空",
        //     trigger: "change"
        //   }
        // ],
        // underwritingPeriod: [
        //   {
        //     type: "number",
        //     required: true,
        //     message: "不能为空",
        //     trigger: "change"
        //   }
        // ],
        // sale: [
        //   {
        //     type: "number",
        //     required: true,
        //     message: "不能为空",
        //     trigger: "change"
        //   }
        // ],
        // productForm: [
        //   {
        //     type: "number",
        //     required: true,
        //     message: "不能为空",
        //     trigger: "change"
        //   }
        // ],
        // distributionChannel: [
        //   {
        //     type: "array",
        //     required: true,
        //     message: "不能为空",
        //     trigger: "change"
        //   }
        // ],
        // h5Url: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      allClass: [
        {
          children: []
        }
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 获取产品分类数据
      getAllInsuranceSubclass(1).then(data => {
        // console.log("TypeRule", data);
        this.allClass = data.children;
      });
      this.getData();
    },
    getData() {
      let id = this.$route.query.id;
      id &&
        getProductInfo(id).then(data => {
          if (!data) {
            return;
          }
          // 供应商id传值
              this.$route.query.supplierId = data.supplierId

          // 所属小类,分销渠道,保障功能 转为数组
          let trans = ["smallClass", "protectFunction", "ageLevel", 'distributionChannel'];
          for (const iterator of trans) {
            data[iterator] = data[iterator] ? data[iterator].split(",") : [];
          }
          this.form = data
          // 获取品牌名称
          getSupplierDetail(data.supplierId).then(_data => {
            this.$set(this.form, 'name', _data.xbSupplier.name)
            console.log("ProductInfo:", this.form);
          });
        });
    },
    submit() {
      // console.log(this.form)
      this.$refs.form
        .validate()
        .then(data => {
          if (data) {
            let formData = Object.assign({}, this.form);
              // 数组字段转字符串
              let trans = ["smallClass", "protectFunction", "ageLevel", 'distributionChannel'];
              for (const iterator of trans) {
                formData[iterator] += "";
              }
              console.log(formData)
              // 产品形态，主附险传值
              this.$route.query.productForm = formData.productForm;
              // 供应商id传值
              this.$route.query.supplierId = formData.supplierId;
              // console.log(this.$route)
              if (formData.id) {
                return updateProductInfo(formData);
              } else {
                return createProductInfo(formData);
              }
          } else {
            return Promise.reject();
          }
        })
        .then(data => {
          data && (this.$route.query.id = data);
          this.getData();
          this.$Message.success("操作成功");
        });
    },
    clear() {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除吗",
        onOk: () => {
          deleteProduct([this.form.id], this.$store.state.user.userId).then(res => {
        this.form = JSON.parse(JSON.stringify(defaultForm));
        this.$Message.success("操作成功");
      });
        }
      });
    },
    change(val) {
      this.form.supplierId = val.id;
      this.form.name = val.name;
      // console.log(val)
    }
  }
};
</script>

<style lang="less" scoped>
.inline-input {
  width: 200px;
  margin: 2px 0;
}
.tip {
  color: #f40;
}
/deep/.ivu-form-item .ivu-form-item .ivu-form-item-label {
  min-width: 80px !important;
  width: auto !important;
  // text-align: left;
}
/deep/.ivu-form-item .ivu-form-item .ivu-form-item-content {
  margin-left: 80px !important;
}
.button {
  padding: 5px 20px;
  margin-right: 10px;
  border: 1px solid #ddd;
  line-height: 1;
}
</style>
