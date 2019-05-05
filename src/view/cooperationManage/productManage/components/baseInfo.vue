<template>
  <Form ref="form" :model="form" :rules="rules" :label-width="120">
    <Row>
        <Col span="12">
          <FormItem label="产品全称" prop="form">
              <Input type="text" v-model="form.name" placeholder="供应商名称"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="产品简称" prop="nameForShort">
              <Input type="text" v-model="form.nameForShort" placeholder="供应商简称"/>
          </FormItem>
        </Col>
    </Row>
    <Row>
        <Col span="12">
          <FormItem label="产品代码" prop="code">
              <Input type="text" v-model="form.code" placeholder="产品代码"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="所属供应商" prop="supplierId">
             <selectSupplier :val="form.supplierId" type="supplier" @change="change" />
          </FormItem>
        </Col>
    </Row>
    
    <FormItem label="主附险" prop="isMain">
        <RadioGroup v-model="form.isMain">
            <Radio :label="0">主险</Radio>
            <Radio :label="1">附加险</Radio>
        </RadioGroup>
    </FormItem>
    <FormItem label="分销渠道" prop="distributionChannelAgency">
      <CheckboxGroup v-model="distributionChannelAgency">
        <Checkbox label="0">经代</Checkbox>
        <Checkbox label="1">互联网</Checkbox>
        <Checkbox label="2">个险</Checkbox>
        <Checkbox label="3">银保</Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem label="在线投保" prop="onlineType">
      <CheckboxGroup v-model="onlineType">
        <Checkbox :label="0">现保科技 APP</Checkbox>
        <br>
        <Checkbox :label="1">
          Web 网址：
          <Input class="inline-input" type="text" v-model="onlineLinkAddress[1]" placeholder="Web 网址"/>
        </Checkbox>
        <br>
        <Checkbox :label="2">
          小程序：
          <Input class="inline-input" type="text" v-model="onlineLinkAddress[2]" placeholder="小程序"/>
        </Checkbox>
        <br>
        <Checkbox :label="3">
          供应商 APP：
          <Input class="inline-input" type="text" v-model="onlineLinkAddress[3]" placeholder="供应商 APP"/>
        </Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem label="险种类型" prop="typeRuleId">
      <RadioGroup v-model="form.typeRuleId">
        <Radio v-for="(item, index) in insuranceType" :key="index" :label="item.id">{{item.name}}</Radio>
      </RadioGroup>
    </FormItem>

  </Form>
</template>

<script>
import { getLesseePageByJB } from '@/api/lessee'
import { getTypeRulePage } from '@/api/rulesSet/type'
import { getProductPage, getProductInfoById, addProductInfo, updateProductInfo } from '@/api/product'
import selectSupplier from '@/components/selectSupplier'

const defaultForm = {
  supplierId: '',
  name: '',
  nameForShort: '',
  code: '',
  isMain: 0,
  sale: 0,
  distributionChannel: '',
  onlineApplication: '',
  typeRuleId: '',
}

export default {
  components: {
    selectSupplier,
  },
  data() {
    return {
      loading: false,
      lesseeList: [],
      query: {
        pageNum: 1,
        pageSize: 10,
        type: 1,
        name: ''
      },
      form: Object.assign({}, defaultForm),
      onlineType: [],
      onlineLinkAddress: [],
      distributionChannelAgency: [],
      rules: {
        name: [
            { required: true, message: '不能为空', trigger: 'blur' }
        ],
        nameForShort: [
            { required: true, message: '不能为空', trigger: 'blur' }
        ],
        isMain: [
            { type: 'number', required: true, message: '不能为空', trigger: 'blur' }
        ],
        sale: [
            { type: 'number', required: true, message: '不能为空', trigger: 'blur' }
        ],
        supplierId: [
            { required: true, message: '不能为空', trigger: 'blur' }
        ],
        code: [
            { required: true, message: '不能为空', trigger: 'blur' }
        ],
        distributionChannel: [
            { type: 'array', required: true, message: '不能为空', trigger: 'blur' }
        ],
        onlineApplication: [
            { type: 'array', required: true, message: '不能为空', trigger: 'blur' }
        ],
        typeRuleId: [
            { required: true, message: '不能为空', trigger: 'blur' }
        ],
      },
      insuranceType: []
    }
  },
  watch: {
  },
  mounted() {
    this.form.id = this.$route.query.id
    // this.form.id || (this.form.id = this.$route.query.id)
    this.init()
  },
  methods: {
    init() {
      this.getData()
      // 获取险种类型
      getTypeRulePage(1).then(data => {
        this.insuranceType = data.list
        console.log(data.list)
      })
    },
    getData() {
      this.form.id && getProductInfoById(this.form.id).then(data => {
        console.log(data)
        this.form = data
        // 分销渠道 转为数组
        this.distributionChannelAgency = this.form.distributionChannel.split(',')
        // 在线投保 显示转换
        this.form.onlineApplication = JSON.parse(this.form.onlineApplication)
        for (const iterator of this.form.onlineApplication) {
          // this.onlineType[iterator.code] = iterator.code
          this.onlineType.splice(0, iterator.code, iterator.code)
          this.onlineLinkAddress[iterator.code] = iterator.linkAddress
        }
      })
    },
    submit() {
      // 分销渠道 转为提交字符串
      this.form.distributionChannel = this.distributionChannelAgency.join()
      // 在线投保 提交转换
      this.form.onlineApplication = []
      for (const iterator of this.onlineType) {
        if ((iterator < 1) || this.onlineLinkAddress[iterator]) {
          this.form.onlineApplication.push({
            code: iterator,
            linkAddress: this.onlineLinkAddress[iterator]
          })
        } else {
           this.$Message.error("在线投保填写不完整，请确认无误后提交")
           return new Promise((resolve, reject) => {})
        }
      }
      this.form.onlineApplication = JSON.stringify(this.form.onlineApplication)

      console.log(this.onlineLinkAddress)
      console.log(this.form)

      return this.$refs.form.validate()
      .then(data => {
        if(data) {
          console.log(this.form)
          if (this.form.id) {
            // console.log(1)
            return updateProductInfo(this.form)
          } else {
            return addProductInfo(this.form)
          }
        } else {
          return new Promise((resolve, reject) => {})
        }
      })
    },
    change(val) {
      this.form.supplierId = val.id
      // console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>
  .inline-input{
    width: 200px;
  }
</style>
