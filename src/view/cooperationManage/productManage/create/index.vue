<template>
<div>
  
  <Form ref="form" :model="form" :label-width="120" inline>
    <div class="title-row">基本信息</div>
    <FormItem label="供应商名称" prop="form">
        <Input type="text" v-model="form.form" placeholder="供应商名称"/>
    </FormItem>
    <FormItem label="供应商Logo" prop="logo">
      <Upload action="//jsonplaceholder.typicode.com/posts/">
          <div class="upload-icon cp">+</div>
      </Upload>
    </FormItem>
    <FormItem label="供应商简称" prop="shortName">
        <Input type="text" v-model="form.shortName" placeholder="供应商简称"/>
    </FormItem>
    <FormItem label="供应商类型" prop="type">
      <RadioGroup v-model="form.type">
          <Radio label="寿险"></Radio>
          <Radio label="财险"></Radio>
      </RadioGroup>
    </FormItem>

    <Divider />
    
    <div class="title-row">基本信息</div>
    <FormItem label="公司地址" prop="site">
        <Input type="text" v-model="form.site" placeholder="公司地址"/>
    </FormItem>
    <FormItem label="公司网址" prop="website">
        <Input type="text" v-model="form.website" placeholder="公司网址"/>
    </FormItem>
    <FormItem label="联系电话" prop="mobile">
        <Input type="text" v-model="form.mobile" placeholder="联系电话"/>
    </FormItem>
    <FormItem label="全国统一服务电话" prop="shortName">
        <Input type="text" v-model="form.call" placeholder="全国统一服务电话"/>
    </FormItem>

    <Button type="primary" @click="submit">确认创建</Button>

  </Form>

</div>
</template>

<script>
const defaultForm = {
  fullName: '',
  shortName: '',
  type: '',
  logo: '',
  site: '',
  website: '',
  mobile: '',
  call: '',
}
export default {
  data() {
    return {
      form: Object.assign({}, defaultForm)
    }
  },
  methods: {
    submit() {
      this.$router.push({name: 'supplierManage'})
    }
  }
}
</script>

<style lang="less" scoped>
 @import url('./index.less');
</style>


