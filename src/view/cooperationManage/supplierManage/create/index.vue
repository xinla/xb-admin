<template>
<div>
  
  <Form ref="form" :model="form" :rules="rules" :label-width="120">
    <div class="title-row">基本信息</div>

    <Row>
        <Col span="10">
          <FormItem label="供应商名称" prop="name">
            <selectSupplier :val="form.name" :defaultValue="form.name" @change="change" />
          </FormItem>

          <FormItem label="供应商简称" prop="nameForShort">
              <Input type="text" v-model="form.nameForShort" placeholder="供应商简称"/>
          </FormItem>

          <FormItem label="供应商类型" prop="typeRule">
            <RadioGroup v-model="form.typeRule">
                <Radio :label="0">寿险</Radio>
                <Radio :label="1">财险</Radio>
            </RadioGroup>
          </FormItem>
      </Col>

    <Col span="8">
    <FormItem label="供应商Logo" prop="logo">
      <img class="logo" v-if="form.logo" :src="form.logo" alt="logo">
      <Upload 
      v-else
      :action="$config.baseUrl.dev + '/upload'"
      :show-upload-list="false"
      :format="['jpg','jpeg','png']"
      accept="image/*"
      :on-success="upFile">
          <div class="upload-icon cp">+</div>
      </Upload>
    </FormItem>

    <FormItem label="可投保地区" prop="vitDictProvinceId">
      <Select v-model="form.vitDictProvinceId" multiple :max-tag-count="3">
        <Option v-for="(item, index) in cityList" :value="item.id" :key="index">{{ item.province }}</Option>
      </Select>
    </FormItem>
    </Col>
    </Row>
    <Divider />
    
    <div class="title-row">联系方式</div>
    <Row>
        <Col span="10">
          <FormItem label="公司地址" prop="companyAddress">
              <Input type="text" v-model="form.companyAddress" placeholder="公司地址"/>
          </FormItem>
          <FormItem label="公司网址" prop="companyWebsite">
              <Input type="text" v-model="form.companyWebsite" placeholder="公司网址"/>
          </FormItem>
          <FormItem label="联系电话" prop="contactPhone">
              <Input type="text" v-model="form.contactPhone" placeholder="联系电话"/>
          </FormItem>
          <FormItem label="全国统一服务电话" prop="nationalServicePhone">
              <Input type="text" v-model="form.nationalServicePhone" placeholder="全国统一服务电话"/>
          </FormItem>
      </Col>
    </Row>

    <Button type="primary" @click="submit">确认</Button>

  </Form>

</div>
</template>

<script>
import { addSupplier, updateSupplier, getSupplierDetail, getInsureAllProvice } from '@/api/supplier'
import selectSupplier from '@/components/selectSupplier'

const defaultForm = {
  name: '',
  nameForShort: '',
  typeRule: '', // 0寿险,1财险	
  logo: '',
  companyAddress: '',
  companyWebsite: '',
  contactPhone: '',
  nationalServicePhone: '',
  vitDictProvinceId: []
}
export default {
  components: {
    selectSupplier,
  },
  data() {
    return {
      insuranceId: 0, // 保险公司id
      form: Object.assign({}, defaultForm),
      rules: {
        name: [
            { required: true, message: '不能为空', trigger: 'blur' }
        ],
        nameForShort: [
            { required: true, message: '不能为空', trigger: 'blur' }
        ],
        typeRule: [
            { type: 'number', required: true, message: '不能为空', trigger: 'blur' }
        ],
        companyAddress: [
            { required: true, message: '不能为空', trigger: 'blur' }
        ],
        companyWebsite: [
            { required: true, message: '不能为空', trigger: 'blur' }
        ],
        contactPhone: [
            { required: true, message: '不能为空', trigger: 'blur' }
        ],
        nationalServicePhone: [
            { required: true, message: '不能为空', trigger: 'blur' }
        ],
      },
      cityList: []
    }
  },
  mounted() {
    this.$route.query.id && (this.form.id = this.$route.query.id)
    this.init()
  },
  methods: {
    init() {
      this.getData()
      getInsureAllProvice().then(data => {
        this.cityList = data
        // console.log(data)
      })
    },
    getData() {
      if (this.form.id) {
        getSupplierDetail(this.form.id).then(data => {
          // console.log(data)
          if (data) {
            this.form = data.xbSupplier
            let vitDictProvinceId = data.xbSupplier.vitDictProvinceId
            if (vitDictProvinceId) {
              vitDictProvinceId = vitDictProvinceId.split(',')
              vitDictProvinceId = vitDictProvinceId.map(item => parseInt(item))
              this.$set(this.form, 'vitDictProvinceId', vitDictProvinceId)
            }
            // console.log('form:', this.form)
          } else {
            this.$Message.error("暂无此记录，请稍后重试")
          }
        })
      }
    },
    submit() {
      this.$refs.form.validate()
      .then(data => {
        if(data) {
          // console.log('form:', this.form) 
          // this.form.vitDictProvinceId = this.form.vitDictProvinceId.join()
          if (this.form.id) {
            return updateSupplier(this.form)
          } else {
            return addSupplier(this.insuranceId, this.form)
          }
        } else {
          return new Promise((resolve, reject) => {})
        }
      })
      .then(data => {
        this.$Message.success("操作成功")
        this.$router.push({name: 'supplierManage'}) 
      })
      // .catch(err => {
      //   this.$Message.success("服务器忙，请稍后重试")
      // })
    },
    upFile(response, file, fileList) {
      // console.log(response, file, fileList)
      // console.log(response.result.fileUrl)
      this.form.logo = response.result.fileUrl
    },
    change(val) {
      this.form.name = val.name
      this.insuranceId = val.id
      // console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>
 @import url('./index.less');
</style>


