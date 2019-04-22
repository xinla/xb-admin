<template>
  <div>
    <div class="title-row">核心买点</div>
    <Upload action="//jsonplaceholder.typicode.com/posts/">
        <Button icon="ios-cloud-upload-outline">上传文件</Button>
    </Upload>
    <Divider />

    <div class="title-row">投保规则</div>
    <editor ref="editor" :value="content" @on-change="handleChange"/>
    <Button type="primary" @click="">确认</Button>
    <Upload action="//jsonplaceholder.typicode.com/posts/" style="display:inline-block;">
        <Button icon="ios-cloud-upload-outline">上传文件</Button>
    </Upload>
    <Divider />

    <div class="title-row">产品条款</div>
    <Upload action="//jsonplaceholder.typicode.com/posts/">
        <Button icon="ios-cloud-upload-outline">上传文件</Button>
    </Upload>
    <Divider />
    
    <div class="title-row">产品课件</div>
    <Table 
      :columns="columns"
      :data="form.accountList">
      <template slot-scope="{ row, index }" slot="action">
          <Icon type="ios-close-circle-outline" @click="deleteRole(index)"/>
      </template>
    </Table>
    <Row>
        <Col span="4">
          <Input v-model="form.name" placeholder="请输入姓名" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="4">
          <Input v-model="form.mobile" placeholder="请输入课件标题" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="4">
          <Input v-model="form.name" placeholder="请输入副标题" style="width:73%;" />
        </Col>
        <Col span="4">
          <Select v-model="model1" style="width:73%;">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col span="4">
          <Upload action="//jsonplaceholder.typicode.com/posts/">
              <Button icon="ios-cloud-upload-outline">上传</Button>
          </Upload>
        </Col>
        <Col span="4">
          <Button type="primary" @click="add('role')">添加</Button>
        </Col>
    </Row>
    <Divider />
  </div>
</template>

<script>
import Editor from '_c/editor'

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
  components: {
    Editor
  },
  props:{},
  data(){
    return {
      form: Object.assign({}, defaultForm),
      content: '12312323',
      columns: [
        {
            title: '开发者',
            key: 'name',
        },
        {
            title: '课件标题',
            key: 'mobile',
        },
        {
            title: '副标题',
            key: 'mobile',
        },
        {
            title: '课件类型',
            key: 'mobile',
        },
        {
            title: '上传课件',
            key: 'mobile',
        },
        {
            title: '操作',
            slot: 'action',
        },
      ],
    }
  },
  watch:{},
  computed:{},
  methods:{
    handleChange (html, text) {
      console.log(html, text)
    },
  },
  created(){},
  mounted(){}
}
</script>
<style lang="less" scoped>
.ivu-btn-primary{
}
</style>
