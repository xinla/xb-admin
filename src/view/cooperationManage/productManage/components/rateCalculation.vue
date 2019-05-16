<template>
  <Form ref="form" :model="form" :rules="rules" :label-width="120">

    <FormItem label="投保单位" prop="applicationUnit">
        <RadioGroup v-model="form.applicationUnit">
            <Radio :label="0">元</Radio>
            <Radio :label="1">份</Radio>
            <Radio :label="2">档</Radio>
        </RadioGroup>
    </FormItem>

    <FormItem label="费率计算方式" prop="rateCountMethod">
      <RadioGroup v-model="form.rateCountMethod">
          <Radio :label="0">
            保额推保费
          </Radio>
          <br>
          <Radio :label="1">
            保费推保额
          </Radio>
      </RadioGroup>
        计算单位：
        <Input type="number" 
        :number="true" style="width:100px;" size="small" v-model="form.countUnit"/>
    </FormItem>

    <FormItem label="交费方式计费系数">
      年：
      <Input type="number" 
        :number="true" size="small" v-model="form.paymentMethodRatioYear"/>
      半年：
        <Input type="number" 
        :number="true" size="small" v-model="form.paymentMethodRatioHalfYear"/>
        季： 
        <Input type="number" 
        :number="true" size="small" v-model="form.paymentMethodRatioQuarter"/>
        月： 
        <Input type="number" 
        :number="true" size="small" v-model="form.paymentMethodRatioMonth"/>
    </FormItem>
    
    <FormItem label="是否区分性别" prop="sexSort">
      <RadioGroup v-model="form.sexSort">
          <Radio :label="0">
            不区分
          </Radio>
          <Radio :label="1">
            区分
          </Radio>
      </RadioGroup>
    </FormItem>

    <FormItem label="是否区分社保" prop="socialInsuranceSort">
      <RadioGroup v-model="form.socialInsuranceSort">
          <Radio :label="0">
            不区分
          </Radio>
          <Radio :label="1">
            区分
          </Radio>
      </RadioGroup>
    </FormItem>

    <FormItem label="保额限制" prop="premiumLimitMin">
      最低
        <Input type="number" 
        :number="true" size="small" v-model="form.premiumLimitMin"/>
        元 

        递增单位
        <Input type="number" 
        :number="true" size="small" v-model="form.premiumLimitIncrementalUnit"/>
        元
    </FormItem>

    <Upload action="//jsonplaceholder.typicode.com/posts/">
        <Button icon="ios-cloud-upload-outline">上传费率表</Button>
    </Upload>

  </Form>
</template>

<script>
import { getProductRate, addProductRate, updateProductRate } from '@/api/product/rate'

const defaultForm = {
  productId: '',
  applicationUnit: 0,
  rateCountMethod: 0,
  countUnit: 0,
  paymentMethodRatioYear: 0, // 交费方式计费系数年	
  paymentMethodRatioHalfYear: 0, // 交费方式计费系数半年	
  paymentMethodRatioQuarter: 0, // 交费方式计费系数季度	
  paymentMethodRatioMonth: 0, // 交费方式计费系数月	
  sexSort: 0, // 是否区分性别  0  不区分性别   1 区分性别	
  socialInsuranceSort: 0, // 是否区分社保  0  不区分社保   1  区分社保 	
  premiumLimitMin: 0, // 保费限制最低	
  premiumLimitIncrementalUnit: 0
}
let oldData = ''
export default {
  data() {
    return {
      form: Object.assign({}, defaultForm),
      rules: {
        applicationUnit: [
            { required: true, type: 'number', message: '不能为空', trigger: 'change' }
        ],
        rateCountMethod: [
            { required: true, type: 'number', message: '不能为空', trigger: 'change' }
        ],
        countUnit: [
            { required: true, type: 'number', message: '不能为空', trigger: 'blur' }
        ],
        paymentMethodRatioYear: [
            { required: true, type: 'number', message: '不能为空', trigger: 'blur' }
        ],
        paymentMethodRatioHalfYear: [
            { required: true, type: 'number', message: '不能为空', trigger: 'blur' }
        ],
        paymentMethodRatioQuarter: [
            { required: true, type: 'number', message: '不能为空', trigger: 'blur' }
        ],
        paymentMethodRatioMonth: [
            { required: true, type: 'number', message: '不能为空', trigger: 'blur' }
        ],
        sexSort: [
            { required: true, type: 'number', message: '不能为空', trigger: 'change' }
        ],
        socialInsuranceSort: [
            { required: true, type: 'number', message: '不能为空', trigger: 'change' }
        ],
        premiumLimitMin: [
            { required: true, type: 'number', message: '不能为空', trigger: 'blur' }
        ],
        premiumLimitIncrementalUnit: [
            { required: true, type: 'number', message: '不能为空', trigger: 'blur' }
        ],
      }
    }
  },
  mounted() {
    this.form.productId = this.$route.query.id
    this.getData()
  },
  methods: {
    getData() {
      this.form.productId && getProductRate(this.form.productId).then(data => {
        console.log(data)
        this.form = data
      })
    },
    submit() {
      this.form.productId = this.$route.query.id || '2257229893945262088'
      return this.$refs.form.validate()
      .then(data => {
        if(data) {
          let isNew = oldData !== JSON.stringify(this.form)
          oldData = JSON.stringify(this.form)
          if (isNew){
            console.log(this.form)
            if (this.form.id) {
              // console.log(1)
              return updateProductRate(this.form)
            } else {
              return addProductRate(this.form)
            }
          }
        } else {
          return new Promise((resolve, reject) => {})
        }
      })
      .then(() => {
        this.getData()
        return Promise.resolve()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.ivu-input-wrapper, .ivu-input-number {
  width: 100px;
  margin: 0 10px;
}
</style>

