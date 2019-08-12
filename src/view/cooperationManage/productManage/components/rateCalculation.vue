<template>
  <Form ref="form" :model="form" :label-width="120">
    <FormItem label="投保单位" prop="applicationUnit">
      <RadioGroup v-model="form.applicationUnit">
        <Radio :label="0">元</Radio>
        <Radio :label="1">份</Radio>
        <Radio :label="2">档</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem label="费率计算方式" prop="rateCountMethod">
      <RadioGroup v-model="form.rateCountMethod">
        <Radio :label="0">保额推保费</Radio>
        <br />
        <Radio :label="1">保费推保额</Radio>
      </RadioGroup>计算单位：
      <Input
        type="number"
        :number="true"
        style="width:100px;"
        size="small"
        v-model="form.countUnit"
      />
    </FormItem>

    <FormItem label="交费方式计费系数">
      年：
      <Input
        type="number"
        :number="true"
        size="small"
        disabled
        v-model="form.paymentMethodRatioYear"
      />半年：
      <Input type="number" :number="true" size="small" v-model="form.paymentMethodRatioHalfYear" />季：
      <Input type="number" :number="true" size="small" v-model="form.paymentMethodRatioQuarter" />月：
      <Input type="number" :number="true" size="small" v-model="form.paymentMethodRatioMonth" />
    </FormItem>

    <FormItem label="是否区分性别" prop="sexSort">
      <RadioGroup v-model="form.sexSort">
        <Radio :label="0">不区分</Radio>
        <Radio :label="1">区分</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem label="是否区分社保" prop="socialInsuranceSort">
      <RadioGroup v-model="form.socialInsuranceSort">
        <Radio :label="0">不区分</Radio>
        <Radio :label="1">区分</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem label="保额限制" prop="premiumLimitMin">
      最低
      <Input type="number" :number="true" size="small" v-model="form.premiumLimitMin" />元
      递增单位
      <Input type="number" :number="true" size="small" v-model="form.premiumLimitIncrementalUnit" />元
    </FormItem>

    <FormItem label="费率表" prop="premiumLimitMin">
      <a v-if="form.rateTableUrl" :href="form.rateTableUrl">{{form.rateTableName}}</a>
      <Upload
        :action="uploadUrl"
        :show-upload-list="false"
        :data="{productId: form.productId}"
        :on-success="uploadSuccess"
      >
        <Button icon="ios-cloud-upload-outline">上传费率表</Button>
      </Upload>
    </FormItem>
  </Form>
</template>

<script>
import {
  getProductRateByProductId,
  addProductRate,
  updateProductRate
} from "@/api/product/rate";

const defaultForm = {
  productId: "",
  applicationUnit: 0,
  rateCountMethod: 0,
  countUnit: 0,
  paymentMethodRatioYear: 1, // 交费方式计费系数年
  paymentMethodRatioHalfYear: 0, // 交费方式计费系数半年
  paymentMethodRatioQuarter: 0, // 交费方式计费系数季度
  paymentMethodRatioMonth: 0, // 交费方式计费系数月
  sexSort: 0, // 是否区分性别  0  不区分性别   1 区分性别
  socialInsuranceSort: 0, // 是否区分社保  0  不区分社保   1  区分社保
  premiumLimitMin: 0, // 保费限制最低
  premiumLimitIncrementalUnit: 0,
  rateTableUrl: "", // 费率表Url
  rateTableName: ''  // 费率表名称
};
let oldData = "";
export default {
  data() {
    return {
      form: Object.assign({}, defaultForm),
      uploadUrl: this.$config.domain + "/insurance/import",
      rules: {
        applicationUnit: [
          {
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "change"
          }
        ],
        rateCountMethod: [
          {
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "change"
          }
        ],
        countUnit: [
          {
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "blur"
          }
        ],
        paymentMethodRatioYear: [
          {
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "blur"
          }
        ],
        paymentMethodRatioHalfYear: [
          {
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "blur"
          }
        ],
        paymentMethodRatioQuarter: [
          {
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "blur"
          }
        ],
        paymentMethodRatioMonth: [
          {
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "blur"
          }
        ],
        sexSort: [
          {
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "change"
          }
        ],
        socialInsuranceSort: [
          {
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "change"
          }
        ],
        premiumLimitMin: [
          {
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "blur"
          }
        ],
        premiumLimitIncrementalUnit: [
          {
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "blur"
          }
        ]
      },
    };
  },
  mounted() {
    // this.getData();
  },
  methods: {
    getData() {
      this.form.productId = this.$route.query.id;
      this.form.productId &&
        getProductRateByProductId(this.form.productId).then(data => {
          // console.log(data)
          this.form = data;
        });
    },
    submit() {
      this.form.productId = this.$route.query.id;
      return this.$refs.form
        .validate()
        .then(data => {
          if (data) {
            let isNew = oldData !== JSON.stringify(this.form);
            oldData = JSON.stringify(this.form);
            // 过滤重复提交(暂废弃)
            if (true) {
              // console.log(this.form)
              if (this.form.id) {
                // console.log(1)
                return updateProductRate(this.form);
              } else {
                return addProductRate(this.form);
              }
            }
          } else {
            return new Promise((resolve, reject) => {});
          }
        })
        .then(() => {
          this.getData();
          return Promise.resolve();
        });
    },
    uploadSuccess(response, file, fileList) {
      if (response.code === 0) {
        this.form.rateTableUrl = response.result.fileUrl;
        this.form.rateTableName = response.result.originalName;
      } else {
        this.$Message.error('上传失败，请重试')
      }
      console.log(response, file, fileList);
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-input-wrapper,
.ivu-input-number {
  width: 100px;
  margin: 0 10px;
}
.ivu-upload {
  display: inline-block;
  margin-left: 10px;
}
</style>

