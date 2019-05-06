<template>
  <div>
    <xNav/>
    
    <Form ref="form" :model="form">
      <div class="title-row">基本信息
      <!-- <div class="fr">
        <Button size="small" type="primary" @click="edit">编辑</Button>
        <Button size="small" type="primary" @click="save">保存</Button>
      </div> -->
    </div>
    
    <table>
      <tr>
        <th>供应商名称</th>
        <td>
          <!-- <Input type="text" :disabled="disabled" v-model="form.name"/> -->
          {{form.name}}
        </td>
        <th>供应商logo</th>
        <td>
          <img :src="form.logo" alt="logo">
        </td>
      </tr>
      <tr>
        <th>供应商简称</th>
        <td colspan="3">
          {{form.nameForShort}}
        </td>
      </tr>
      <tr>
        <th>供应商类型</th>
        <td colspan="3">
          {{form.typeRule | typeRule }}
        </td>
      </tr>
    </table>

    <Divider />
    
    <div class="title-row">公司简介</div>
    <div>
      {{form.supplierDescription}}
    </div>

    <Divider />

    <div class="title-row">联系方式</div>
    <table>
      <tr>
        <th>公司地址</th>
        <td>
          {{form.companyAddress}}
        </td>
        <th>公司网址</th>
        <td>
          {{form.companyWebsite}}
        </td>
      </tr>
      <tr>
        <th>公司电话</th>
        <td>
          {{form.contactPhone}}
        </td>
        <th>全国统一电话</th>
        <td>
          {{form.nationalServicePhone}}
        </td>
      </tr>
    </table>

    <Divider />

    <div class="title-row">分公司</div>
    <Table 
    border
    :columns="columns"
    :data="form.supplierAndOrganizationVoList">
    </Table>
    </Form>

  </div>
</template>

<script>
import { getSupplierBrandInformation } from '@/api/supplier'
import xNav from '@/view/components/nav'

const typeRule = {
  0: '寿险',
  1: '财险',
}
export default {
  components: {
    xNav
  },
  filters: {
    typeRule(val) {
      return typeRule[val]
    }
  },
  data() {
    return {
      form: {
        id: '', //  供应商id	
        name: '', //  供应商名字	
        logo: '', //  logo
        nameForShort: '', //  供应商简称	
        companyAddress: '', //  公司地址	
        companyWebsite: '', //  公司网址	
        contactPhone: '', //  公司电话	
        nationalServicePhone: '', //  全国统一电话	
        supplierDescription: '',  //  供应商简介	
        professionUrl: '',  //  职业代码表	
        createTime: '', //  创建时间	
        updateTime: '', //  修改时间	
        typeRule: '', //  供应商类型:0寿险,1财险	
        supplierAndOrganizationVoList: []	//  子公司集合
      },
      columns: [
        {
            title: '名称',
            key: 'organizationName',
        },
        {
            title: '地址',
            key: 'organizationAddress',
        },
        {
            title: '电话',
            key: 'organizationPhone',
        },
      ],
    }
  },
  mounted() {
    this.form.id = this.$route.query.id
    this.getData()
  },
  methods: {
    getData() {
      getSupplierBrandInformation(this.form.id).then(data => {
        console.log('SupplierBrandInformation:', data)
        this.form = data
      }) 
    }
  }
}
</script>

<style lang="less" scoped>
@import url(./index.less);
  .title{
    padding: 0px 0px 20px 10px;
    font-size: 20px;
  }
</style>
