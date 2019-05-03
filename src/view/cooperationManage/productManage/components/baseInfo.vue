<template>
  <Form ref="form" :model="form" :label-width="120">
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
             <selectSupplier :id="form.supplierId" @change="change" />
          </FormItem>
        </Col>
    </Row>
    
    <FormItem label="主附险" prop="isMain">
        <RadioGroup v-model="form.isMain">
            <Radio label="0">主险</Radio>
            <Radio label="1">附加险</Radio>
        </RadioGroup>
    </FormItem>
    <FormItem label="分销渠道" prop="distributionChannel">
      <CheckboxGroup v-model="form.distributionChannel">
        <Checkbox label="0">经代</Checkbox>
        <Checkbox label="1">互联网</Checkbox>
        <Checkbox label="2">个险</Checkbox>
        <Checkbox label="3">银保</Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem label="在线投保" prop="onlineApplication">
      <CheckboxGroup v-model="form.onlineApplication">
        <Checkbox :label="`{code: 0, linkAddress: ${form.name}}`">现保科技 APP</Checkbox>
        <br>
        <Checkbox :label="`{code: 1, linkAddress: ${form.onlineApplication[0].linkAddress}}`">
          Web 网址：
          <Input class="inline-input" type="text" v-model="form.onlineApplication[0].linkAddress" placeholder="供应商名称"/>
        </Checkbox>
        <br>
        <Checkbox :label="`{code: 2, linkAddress: ${form.name}}`">
          小程序：
          <Input class="inline-input" type="text" v-model="form.name" placeholder="小程序"/>
        </Checkbox>
        <br>
        <Checkbox :label="`{code: 3, linkAddress: ${form.name}}`">
          供应商 APP：
          <Input class="inline-input" type="text" v-model="form.name" placeholder="供应商 APP"/>
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
import { getProductPage, getProductInfoById, addProductInfo } from '@/api/product'
import selectSupplier from '@/components/selectSupplier'

const defaultForm = {
  supplierId: '',
  name: '',
  nameForShort: '',
  code: '',
  isMain: 0,
  sale: 0,
  distributionChannel: [],
  onlineApplication: [],
  typeRuleId: [],
}

export default {
  components: {
    selectSupplier,
  },
  // props: {
  //   id: undefined
  // },
  data() {
    return {
      loading: false,
      lesseeList: [],
      query: {
        page: 1,
        size: 10,
        type: 1,
        name: ''
      },
      form: Object.assign({}, defaultForm),
      insuranceType: []
    }
  },
  mounted() {
    this.id = this.$route.query.id
    // this.id || (this.id = this.$route.query.id)
    this.init()
  },
  methods: {
    init() {
      this.getData()
      // 获取险种类型
      getTypeRulePage(0).then(data => {
        this.insuranceType = data.list
        console.log(data.list)
      })
    },
    getData() {
      this.id && getProductInfoById(this.id).then(data => {
        console.log(data)
        this.form = data
      })
    },
    submit() {
      return addProductInfo(this.form)
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
