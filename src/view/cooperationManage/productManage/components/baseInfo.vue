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
          <FormItem label="所属供应商" prop="shortName">
            <Select
              style="width:73%; margin-right: 10px;"
              v-model="form.name"
              filterable
              remote
              :remote-method="search"
              :loading="loading">
                <Option v-for="(option, index) in lesseeList" 
                :value="option.name" 
                :key="index">
                {{option.name}}
                </Option>
            </Select>
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
        <Checkbox label="现保科技 APP"></Checkbox>
        <br>
        <Checkbox :label="{code: 1, linkAddress: form.name}">
          Web 网址：
          <Input class="inline-input" type="text" v-model="form.name" placeholder="供应商名称"/>
        </Checkbox>
        <br>
        <Checkbox :label="{code: 2, linkAddress: form.name}">
          小程序：
          <Input class="inline-input" type="text" v-model="form.name" placeholder="小程序"/>
        </Checkbox>
        <br>
        <Checkbox :label="{code: 2, linkAddress: form.name}">
          供应商 APP：
          <Input class="inline-input" type="text" v-model="form.name" placeholder="供应商 APP"/>
        </Checkbox>
    </CheckboxGroup>
    </FormItem>
    <FormItem label="险种类型" prop="typeRuleId">
        <CheckboxGroup v-model="form.typeRuleId">
            <Checkbox :label="item.id" v-for="(item, index) in insuranceType" :key="index">{{item.name}}</Checkbox>
        </CheckboxGroup>
    </FormItem>

  </Form>
</template>

<script>
import { getLesseePageByJB } from '@/api/lessee'
import { getTypeRulePage } from '@/api/rulesSet/type'
import { getProductPage, getProductInfoById, addProductInfo } from '@/api/product'
const defaultForm = {
  name: '',
  nameForShort: '',
  code: '',
  logo: '',
  isMain: '',
  distributionChannel: [],
  onlineApplication: [],
  typeRuleId: [],
}

export default {
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
      this.id && this.getData()
      getTypeRulePage(0).then(data => {
        this.insuranceType = data.list
        console.log(data.list)
      })
    },
    getData() {
      getProductInfoById(this.id).then(data => {
        console.log(data)
      })
    },
    submit() {
      addProductInfo(this.form).then(data =>{

      })
    },
    search(query) {
      this.query.name = query
      this.loading = true
      getLesseePageByJB(this.query).then(data => {
        // console.log(data)
        this.loading = false
        this.lesseeList = data.list
      })
    },
  }
}
</script>

<style lang="less" scoped>
  .inline-input{
    width: 200px;
  }
</style>
