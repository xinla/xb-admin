<template>
  <Form ref="form" :model="form" :rules="rules" :label-width="120">
    <Row>
        <Col span="8">
          <FormItem label="产品全称" prop="productFullName">
              <Input type="text" v-model="form.productFullName" placeholder="供应商名称"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="产品简称" prop="productAbbr">
              <Input type="text" v-model="form.productAbbr" placeholder="供应商简称"/>
          </FormItem>
        </Col>
    </Row>
    <Row>
        <Col span="8">
          <FormItem label="产品代码" prop="productCode">
              <Input type="text" v-model="form.productCode" placeholder="产品代码"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属供应商" prop="name">
             <selectSupplier :val="form.name" type="supplier" @change="change" />
          </FormItem>
        </Col>
    </Row>
    
    <FormItem label="所属大类" prop="mainClass">
        <RadioGroup v-model="form.mainClass">
            <Radio :label="0">人身保险</Radio>
            <Radio :label="1">财产保险</Radio>
        </RadioGroup>
    </FormItem>

    <FormItem label="所属细类" prop="subClass">
      <div class="sub-calss" v-for="(item, index) of subclass" :key="index">
          <CheckboxGroup v-model="form.subClass" @on-change="changeSubClassA(index)">
            <Checkbox :label="item.id">{{item.name}}</Checkbox> <span class="cp" @click="showCheck(index)">+</span>
          </CheckboxGroup>
          <CheckboxGroup v-show="subClassShow[index]" class="child-check" v-model="form.subClass" @on-change="changeSubClassB(index)">
            <Checkbox v-for="(unit, unique) of item.children" :key="unique" :label="unit.id">{{unit.name}}</Checkbox>
          </CheckboxGroup>
      </div>
      
    </FormItem>

    <FormItem label="保障功能" prop="function">
      <CheckboxGroup v-model="form.function">
        <Checkbox label="0">家庭保障</Checkbox>
        <Checkbox label="1">健康医疗</Checkbox>
        <Checkbox label="2">子女教育</Checkbox>
        <Checkbox label="3">退休养老</Checkbox>
        <Checkbox label="4">投资理财</Checkbox>
        <Checkbox label="5">财富传承</Checkbox>
      </CheckboxGroup>
    </FormItem>

    <FormItem label="适合人群" prop="ageLevel">
        <RadioGroup v-model="form.ageLevel">
            <Radio :label="0">母婴</Radio>
            <Radio :label="1">儿童</Radio>
            <Radio :label="2">青中年</Radio>
            <Radio :label="3">中老年</Radio>
            <Radio :label="4">老年</Radio>
            <Radio :label="5">全龄</Radio>
        </RadioGroup>
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

    <FormItem label="产品形态" prop="productForm">
        <RadioGroup v-model="form.productForm">
            <Radio :label="0">主险</Radio>
            <Radio :label="1">附加险</Radio>
            <Radio :label="2">保险计划</Radio>
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

    <FormItem label="在线投保" prop="onlineType">
      <CheckboxGroup v-model="onlineType">
        <Checkbox :label="0">现保</Checkbox>
        <br>
        <Checkbox :label="1">
          APP：
          <Input class="inline-input" type="text" v-model="onlineLinkAddress[1]" placeholder="APP" @on-blur="onlineBlur(1)" />
        </Checkbox>
        <br>
        <Checkbox :label="2">
          PC端：
          <Input class="inline-input" type="text" v-model="onlineLinkAddress[2]" placeholder="PC端" @on-blur="onlineBlur(2)" />
        </Checkbox>
        <br>
        <Checkbox :label="3">
          H5：
          <Input class="inline-input" type="text" v-model="onlineLinkAddress[3]" placeholder="H5" @on-blur="onlineBlur(3)" />
        </Checkbox>
        <br>
        <Checkbox :label="4">
          小程序：
          <Input class="inline-input" type="text" v-model="onlineLinkAddress[4]" placeholder="小程序" @on-blur="onlineBlur(4)" />
        </Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem label="详情页H5链接" prop="h5Url">
      <Input class="inline-input" type="text" v-model="form.h5Url" placeholder="H5"/>
    </FormItem>

  </Form>
</template>

<script>
import { getSupplierDetail } from '@/api/supplier'
import { getTypeRulePage, getAllInsuranceSubclass } from '@/api/rulesSet/type'
import { getProductPage, getProductInfo, addProductInfo, updateProductInfo } from '@/api/product'

import selectSupplier from '@/components/selectSupplier'

const defaultForm = {
  productFullName: '',
  productAbbr: '',
  supplierId: '',
  productCode: '',
  mainClass: 0,
  subClass: [],
  name: '',
  function: [],
  ageLevel: 0,
  underwritingModel: 0,
  underwritingPeriod: 0,
  productForm: 0,
  distributionChannel: [],
  onlineAddress: [
    // {
    //   code: '',
    //   linkAddress: '',
    //   qrCode: '',
    // }
  ],
  h5Url: ''
}
let oldData = ''

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
      // distributionChannelAgency: [],
      rules: {
        productFullName: [
            { required: true, message: '不能为空', trigger: 'blur' }
        ],
        productAbbr: [
            { required: true, message: '不能为空', trigger: 'blur' }
        ],
        supplierId: [
            { required: true, message: '不能为空', trigger: 'blur' }
        ],
        mainClass: [
            { type: 'number', required: true, message: '不能为空', trigger: 'change' }
        ],
        productCode: [
            { required: true, message: '不能为空', trigger: 'blur' }
        ],
        subClass: [
            { type: 'array', required: true, message: '不能为空', trigger: 'change' }
        ],
        function: [
            { type: 'array', required: true, message: '不能为空', trigger: 'change' }
        ],
        ageLevel: [
            { type: 'number', required: true, message: '不能为空', trigger: 'change' }
        ],
        underwritingModel: [
            { type: 'number', required: true, message: '不能为空', trigger: 'change' }
        ],
        underwritingPeriod: [
            { type: 'number', required: true, message: '不能为空', trigger: 'change' }
        ],
        productForm: [
            { type: 'number', required: true, message: '不能为空', trigger: 'change' }
        ],
        distributionChannel: [
            { type: 'array', required: true, message: '不能为空', trigger: 'change' }
        ],
        // onlineAddress: [
        //     { type: 'array', required: true, message: '不能为空', trigger: 'change' }
        // ],
        // onlineType: [
        //   { type: 'array', required: true, message: '不能为空', trigger: 'change' }
        // ],
        h5Url: [
            { required: true, message: '不能为空', trigger: 'blur' }
        ],
      },
      insuranceType: [],
      subClassShow: [],
      subclass:[],
      subclassParent: [], 
      subclassChild: []
    }
  },
  mounted() {
    this.form.id = this.$route.query.id
    // this.form.id || (this.form.id = this.$route.query.id)
    this.init()
  },
  methods: {
    init() {
      // 获取险种类型
      getTypeRulePage(1).then(data => {
        this.insuranceType = data.list
        // console.log('insuranceType', data.list)
      })
      // 获取保险细类
      getAllInsuranceSubclass(1)
      .then(data => {
        // console.log('InsuranceSubclass', data)
        this.subclass = data.children
        this.subClassShow.length = this.subclass.length
        this.subClassShow.fill(true, 0, this.subclass.length)
      })
      this.getData()
    },
    getData() {
      this.form.id && getProductInfo(this.form.id)
      .then(data => {

        // 保险细类,分销渠道,保障功能 转为数组
        let trans = ['subClass', 'function', 'distributionChannel']
        for (const iterator of trans) {
          data[iterator] = data[iterator].split(',')
        }
        // 在线投保 显示转换
        data.onlineAddress = JSON.parse(data.onlineAddress)
        for (const iterator of data.onlineAddress) {
          // this.onlineType[iterator.code] = iterator.code
          this.onlineType.splice(0, iterator.code, iterator.code)
          this.onlineLinkAddress[iterator.code] = iterator.linkAddress
        }
        // this.form = data 在此赋值，会导致下面的name  无法响应，带后续研究
        // 获取供应商名称
        getSupplierDetail(data.supplierId)
        .then(_data => {
          this.form = data
          this.form.name = _data.xbSupplier.name
          // console.log('form:', this.form)
        })
      })
      
    },
    submit() {
      // console.log(this.onlineLinkAddress)
      // console.log(this.form)

      // 在线投保 提交转换和校验
      this.form.onlineAddress = []
      for (const iterator of this.onlineType) {
        if ((iterator === 0) || this.onlineLinkAddress[iterator]) {
          this.form.onlineAddress.push({
            code: iterator,
            linkAddress: this.onlineLinkAddress[iterator]
          })
        } else {
          this.$Message.error("在线投保填写不完整，请确认无误后提交")
          return new Promise((resolve, reject) => {})
        }
      }
      this.form.onlineAddress = JSON.stringify(this.form.onlineAddress)

      return this.$refs.form.validate()
      .then(data => {
        if(data) {
          
          let formData = Object.assign({}, this.form)
          // 过滤重复提交
          let isNew = oldData !== JSON.stringify(formData)
          oldData = JSON.stringify(formData)
          if (isNew) {
            // 数组字段转字符串
            let trans = ['subClass', 'function', 'distributionChannel']
            for (const key in formData) {
              if (formData.hasOwnProperty(key)) {
                const element = formData[key];
                if (trans.includes(key)) {
                  formData[key] += '' 
                }
              }
            }
            // console.log(formData)
            this.$route.query.productForm = formData.productForm
            // console.log(this.$route)
            if (formData.id) {
              // console.log(1)
              return updateProductInfo(formData)
            } else {
              return addProductInfo(formData)
            }
          } else {
            return Promise.resolve()
          }
        } else {
          return new Promise((resolve, reject) => {})
        }
      })
    },
    change(val) {
      this.form.supplierId = val.id
      this.form.name = val.name
      // console.log(val)
    },
    changeSubClassA(index) {
      // 所属细类选择交互
      let data = this.subclass[index].children || []
      if (data.length === 0) {return}

      let count = 0
      // 判断选中当前分类下的条数
      for (const iterator of data) {
        if (this.form.subClass.includes(iterator.id)) {
          count ++
        }
      }
      
      // 判断执行全选或全取消
      if (count >= data.length) {
        // 全取消
        for (const iterator of data) {
          this.form.subClass.splice(this.form.subClass.indexOf(iterator.id), 1)
        }
        this.form.subClass.splice(this.form.subClass.indexOf(this.subclass[index].id), 1)
      } else {
        // 全选
        for (const iterator of data) {
          this.form.subClass.includes(iterator.id) || this.form.subClass.push(iterator.id)
        }
        this.form.subClass.includes(this.subclass[index].id) || this.form.subClass.push(this.subclass[index].id)
      }
      
      // console.log(this.form.subClass)
    },
    changeSubClassB(index) {
      this.form.subClass.includes(this.subclass[index].id) || this.form.subClass.push(this.subclass[index].id)
    },
    showCheck(index) {
      // console.log(this.subClassShow[index])
      this.subClassShow[index] = !this.subClassShow[index]
      this.subClassShow.splice()
    },
    onlineBlur(index) {
      // 在线投保输入交互
      if (this.onlineLinkAddress[index]) {
        if (!this.onlineType.includes(index)) {
          this.onlineType.push(index)
        }
      } else if (this.onlineType.includes(index)) {
        this.onlineType.splice(this.onlineType.indexOf(index), 1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .inline-input{
    width: 200px;
  }
  .child-check{
    margin-left: 15px;
  }
  .sub-calss{
    display: inline-block;
    width: 10%;
    max-width: 150px;
    vertical-align: top;
  }
</style>
