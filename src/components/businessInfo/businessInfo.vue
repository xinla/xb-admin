<template>
  <div>

    <div>
      <img class="logo" :src="$Tool.transLogo(form.logo)" alt="logo">
      <div class="company-name">{{form.name}}</div>
      <div class="time">更新时间：{{form.updateTime}}</div>
    </div>

    <table>
      <tr>
        <th>统一社会信用代码</th>
        <td>{{form.socialCreditCode}}</td>
        <th>组织机构代码</th>
        <td>{{form.organizationCode}}</td>
      </tr>
      <tr>
        <th>注册号</th>
        <td>{{form.registerCode}}</td>
        <th>经营状态</th>
        <td>{{form.managementStatus}}</td>
      </tr>
      <tr>
        <th>所属行业</th>
        <td>{{form.industryInvoled}}</td>
        <th>成立日期</th>
        <td>{{form.establishTime}}</td>
      </tr>
      <tr>
        <th>公司类型</th>
        <td>{{form.companyType}}</td>
        <th>营业期限</th>
        <td>{{form.busnissTerm}}</td>
      </tr>
      <tr>
        <th>法定代表人</th>
        <td>{{form.enterpriseLegalPerson}}
        <a :href="form.enterpriseUrl">法人对外投资</a>
        </td>
        <th>发照日期</th>
        <td>{{form.issueDate}}</td>
      </tr>
      <tr>
        <th>注册资本</th>
        <td>{{form.registerCapital}}</td>
        <th>登记机关</th>
        <td>{{form.registerAuthority}}</td>
      </tr>
      <tr>
        <th>企业地址</th>
        <td colspan="3">{{form.companyAddress}}</td>
      </tr>
      <tr>
        <th>经营范围</th>
        <td colspan="3">{{form.businessScope}}</td>
      </tr>
    </table>
    
  </div>
</template>

<script>
import { getLesseeBusinessInfoById, getCompanyBusinessInformation } from "@/api/lessee";
import { getSupplierBusinessInformation } from "@/api/supplier";
import { transLogo } from "@/libs/tools";

export default {
  name: 'businessInfo',
  props: {
    // id: {
    //   type: [Number, String],
    //   default: ''
    // },
    type: {
      type: String,
      default: 'lessee'
    }
  },
  data() {
    return {
      form: {
        name: '',
        logo: '',
        updateTime: '',
        socialCreditCode: '',
        organizationCode: '',
        registerCode: '',
        managementStatus: '',
        industryInvoled: '',
        establishTime: '',
        companyType: '',
        busnissTerm: '',
        enterpriseLegalPerson: '',
        issueDate: '',
        registerCapital: '',
        registerAuthority: '',
        companyAddress: '',
        businessScope: '',
        enterpriseUrl: '',
      }
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  mounted() {
    // this.id || (this.id = this.$route.query.id)
    this.init()
  },
  methods: {
    init() {
      // debugger
      this.id || this.$Message.error('没有参数或参数错误')
      if (!this.type || this.type === 'lessee') {
        getLesseeBusinessInfoById(this.id).then(data => {
          data[0] ? (this.form = data[0]) : this.$Message.error('没有记录')
          // console.log('LesseeBusinessInformation', data)
        })
      } else if (this.type === 'supplier') {
        getSupplierBusinessInformation(this.id).then(data => {
          data[0] ? (this.form = data[0]) : this.$Message.error('没有记录')
          // console.log('SupplierBusinessInformation ', data)
        })
      } else if (this.type === 'company') {
        getCompanyBusinessInformation(this.id).then(data => {
          data ? (this.form = data) : this.$Message.error('没有记录')
          // console.log('CompanyBusinessInfo ', data)
        })
      }
      
    }
  }
}
</script>

<style lang='less' scoped>
@import url('./index.less');
</style>

