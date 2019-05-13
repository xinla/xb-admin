<template>
  <div>
    <Row>
      <Col span="12">
        <Form class="org-form" :model="orgForm" :rules="ruleValidate" :label-width="100">
          <FormItem label="接口名称">
            <Input v-model="orgForm.name" placeholder="请输入接口名称"></Input>
          </FormItem>
          <FormItem label="供应商名称">
            <Input v-model="orgForm.name" placeholder="请输入供应商名称"></Input>
          </FormItem>
          <FormItem label="产品名称">
            <Input v-model="orgForm.name" placeholder="请输入产品名称"></Input>
          </FormItem>
          <FormItem label="接口地址">
            <Input v-model="orgForm.name" placeholder="请输入接口地址"></Input>
          </FormItem>
          <FormItem label="职业代码表">
            <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button icon="ios-cloud-upload-outline">Upload files</Button>
            </Upload>
          </FormItem>
          <FormItem label="投保规则">
            <CheckboxGroup v-model="disabledGroup">
                <Checkbox label="香蕉"></Checkbox>
                <Checkbox label="苹果"></Checkbox>
                <Checkbox label="西瓜"></Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Form>
      </Col>

        <Col span="12">
        </Col>
    </Row>
  </div>
</template>

<script>
const defautlOrgForm = {
  name: "",
  type: "",
  des: "",
  site: "",
  call: ""
};
export default {
  components:{},
  props:{},
  data(){
    return {
      orgForm: Object.assign({}, defautlOrgForm),
      supplierColumns: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '类型名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        },
      ],
      supplierList: [],
      supplierType: '',
      productColumns: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '分类',
          key: 'name',
          align: 'center'
        },
        {
          title: '类型名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        },
      ],
      productList: [],
      productType: '',
    }
  },
  watch:{},
  computed:{},
  created(){},
  mounted(){},
  methods:{}
}
</script>
<style lang="less" scoped>
</style>
