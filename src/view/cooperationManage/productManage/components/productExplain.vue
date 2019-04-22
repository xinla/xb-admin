<template>
<div>

  <Form ref="form" :model="form" :label-width="80" inline>
    <div class="title-row">核心买点</div>
    <Input type="textarea" v-model="form.fullName" placeholder="请输入产品主要特色，不超过30字"/>

    <Divider />
    
    <div class="title-row">保险责任</div>
    等待期<Input type="text" size="small" style="width:100px;" v-model="form.fullName" placeholder="供应商名称"/>天
    <Table 
      :columns="resColumns"
      :data="form.accountList">
      <template slot-scope="{ row, index }" slot="action">
          <Icon type="ios-close-circle-outline" @click="deleteRole(index)"/>
      </template>
    </Table>
    <Row>
        <Col span="6">
          <Input v-model="resForm.name" placeholder="请输入标题" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="6">
          <Input v-model="resForm.mobile" placeholder="请输入内容" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="6">
          <Input v-model="resForm.name" placeholder="计算公式" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="6">
          <Button type="primary" @click="add('role')">添加</Button>
        </Col>
    </Row>
    <Divider />

    <div class="title-row">免除责任</div>
    <Input type="textarea" v-model="form.fullName" placeholder="请输入产品主要特色，不超过30字"/>
    <Divider />

    <div class="title-row">利益演示</div>
    <Table 
      :columns="resColumns"
      :data="form.accountList">
      <template slot-scope="{ row, index }" slot="action">
          <Icon type="ios-close-circle-outline" @click="deleteRole(index)"/>
      </template>
    </Table>
    <Row>
        <Col span="8">
          <Input v-model="resForm.name" placeholder="请输入标题" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="8">
          <Input v-model="resForm.mobile" placeholder="请输入内容" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="8">
          <Button type="info" @click="add('role')">添加</Button>
        </Col>
    </Row>
    <Divider />

    <div class="title-row">Banner 图</div>
    <FormItem label="APP" prop="mobile">
        <Upload class="upload" action="//jsonplaceholder.typicode.com/posts/">
            <div class="upload-icon cp">+</div>
        </Upload>
    </FormItem>
    
    <FormItem label="Web" prop="mobile">
        <Upload action="//jsonplaceholder.typicode.com/posts/">
            <div class="upload-icon cp">+</div>
        </Upload>
    </FormItem>
    <Divider />
    
    <div class="title-row">导航图</div>
    <FormItem label="APP" prop="mobile">
        <Upload class="upload" action="//jsonplaceholder.typicode.com/posts/">
            <div class="upload-icon cp">+</div>
        </Upload>
    </FormItem>
    
    <FormItem label="Web" prop="mobile">
        <Upload action="//jsonplaceholder.typicode.com/posts/">
            <div class="upload-icon cp">+</div>
        </Upload>
    </FormItem>
    <Divider />

    <div class="title-row">封面图</div>
    <FormItem label="APP" prop="mobile">
        <Upload class="upload" action="//jsonplaceholder.typicode.com/posts/">
            <div class="upload-icon cp">+</div>
        </Upload>
    </FormItem>
    
    <FormItem label="Web" prop="mobile">
        <Upload action="//jsonplaceholder.typicode.com/posts/">
            <div class="upload-icon cp">+</div>
        </Upload>
    </FormItem>
    <Divider />
    
    <div class="title-row">图片描述</div>
    <Upload action="//jsonplaceholder.typicode.com/posts/">
        <Button icon="ios-cloud-upload-outline">上传文件</Button>
    </Upload>
    <Divider />
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
const defaultResForm = {

}
export default {
  data() {
    return {
      form: Object.assign({}, defaultForm),
      resColumns: [
        {
            title: '标题',
            key: 'name',
        },
        {
            title: '说明',
            key: 'mobile',
        },
        {
            title: '操作',
            slot: 'action',
        },
      ],
      resForm: Object.assign({}, defaultResForm),
    }
  },
}
</script>

<style lang="less" scoped>
 .upload{
   width: 30%;
   display: inline-block;
 }
 .upload-icon{
  border: 1px dashed #000;
  font-size: 36px;
  padding: 30px;
  line-height: 21px;
}
</style>


