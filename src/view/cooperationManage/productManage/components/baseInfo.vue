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
    
    <FormItem label="所属大类" prop="isMain">
        <RadioGroup v-model="form.isMain">
            <Radio :label="0">人身保险</Radio>
            <Radio :label="1">财产保险</Radio>
        </RadioGroup>
    </FormItem>

    <FormItem label="所属细类" prop="distributionChannelAgency">
      <Row>
        <Col span="3" v-for="(item, index) of subclass" :key="index">
          <CheckboxGroup v-model="subclassParent">
            <Checkbox :label="item.pid">{{item.name}}</Checkbox> <span class="cp" @click="showCheck(index)">+</span>
          </CheckboxGroup>
          <CheckboxGroup class="child-check" v-model="subclassChild[index]" v-show="subClassShow[index]">
            <Checkbox v-for="(unit, unique) of item.children" :key="unique" :label="unit.id">{{unit.name}}</Checkbox>
          </CheckboxGroup>
        </Col>
      </Row>
      
    </FormItem>

    <FormItem label="保障功能" prop="distributionChannelAgency">
      <CheckboxGroup v-model="distributionChannelAgency">
        <Checkbox label="0">家庭保障</Checkbox>
        <Checkbox label="1">健康医疗</Checkbox>
        <Checkbox label="2">子女教育</Checkbox>
        <Checkbox label="3">退休养老</Checkbox>
        <Checkbox label="2">投资理财</Checkbox>
        <Checkbox label="3">财富传承</Checkbox>
      </CheckboxGroup>
    </FormItem>

    <FormItem label="适合人群" prop="isMain">
        <RadioGroup v-model="form.isMain">
            <Radio :label="0">母婴</Radio>
            <Radio :label="1">儿童</Radio>
            <Radio :label="0">青中年</Radio>
            <Radio :label="1">中老年</Radio>
            <Radio :label="0">老年</Radio>
            <Radio :label="1">全龄</Radio>
        </RadioGroup>
    </FormItem>

    <FormItem label="承保方式" prop="isMain">
        <RadioGroup v-model="form.isMain">
            <Radio :label="0">个人</Radio>
            <Radio :label="1">团体</Radio>
        </RadioGroup>
    </FormItem>

    <FormItem label="承保周期" prop="isMain">
        <RadioGroup v-model="form.isMain">
            <Radio :label="0">短期</Radio>
            <Radio :label="1">长期</Radio>
        </RadioGroup>
    </FormItem>

    <FormItem label="产品形态" prop="isMain">
        <RadioGroup v-model="form.isMain">
            <Radio :label="0">主险</Radio>
            <Radio :label="1">附加险</Radio>
            <Radio :label="1">保险计划</Radio>
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
        <Checkbox :label="0">现保</Checkbox>
        <br>
        <Checkbox :label="3">
          APP：
          <Input class="inline-input" type="text" v-model="onlineLinkAddress[3]" placeholder="APP"/>
        </Checkbox>
        <br>
        <Checkbox :label="1">
          PC端：
          <Input class="inline-input" type="text" v-model="onlineLinkAddress[1]" placeholder="PC端"/>
        </Checkbox>
        <br>
        <Checkbox :label="1">
          H5：
          <Input class="inline-input" type="text" v-model="onlineLinkAddress[4]" placeholder="H5"/>
        </Checkbox>
        <br>
        <Checkbox :label="2">
          小程序：
          <Input class="inline-input" type="text" v-model="onlineLinkAddress[2]" placeholder="小程序"/>
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
import { getTypeRulePage, getAllInsuranceSubclass } from '@/api/rulesSet/type'
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
      insuranceType: [],
      subClassShow: [],
      subclass:[],
      subclassParent: [], 
      subclassChild: []
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
        // console.log('insuranceType', data.list)
      })
      // 获取保险细类
      getAllInsuranceSubclass(1).then(data => {
        // console.log('InsuranceSubclass', data)
        this.subclass = data.children
        this.subClassShow.length = this.subclass.length
        this.subClassShow.fill(true, 0, this.subclass.length)
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
          this.form.onlineApplicfvation.push({
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
    },
    showCheck(index) {
      // console.log(this.subClassShow[index])
      this.subClassShow[index] = !this.subClassShow[index]
      this.subClassShow.splice()
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
</style>
