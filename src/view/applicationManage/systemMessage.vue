<template>
  <div>
    <div class="title-row">创建通知</div>
    <Form ref="form" :model="form" :rules="rules" :label-width="120">
      <FormItem label="通知标题" prop="title">
          <Input type="text" v-model="form.title" placeholder="通知标题"/>
      </FormItem>
      <FormItem label="跳转链接" prop="linkUrl">
          <Input type="text" v-model="form.linkUrl" placeholder="格式如: www.xbkj.com"/>
      </FormItem>
      <FormItem label="推送时间" prop="noticedAt">
        <DatePicker v-model="form.noticedAt" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="推送时间" style="width: 200px"></DatePicker>
      </FormItem>
      <FormItem label="通知内容" prop="content">
          <Input type="textarea" v-model="form.content" placeholder="通知内容"/>
      </FormItem>
      <div class="ac">
        <Button type="primary" ghost @click="handleReset('form')">清空内容</Button>
        <Button type="primary" @click="submit">{{isEdit ? '确认修改' : '确认添加'}}</Button>
      </div>
    </Form>

    <Divider />
    
    <div class="title-row">通知列表</div>
    <Table 
      :columns="columns"
      :data="list">
      <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small"  @click="edit(row)">编辑</Button>
          <Button type="error" size="small" @click="deleteMessage(row)">删除</Button>
          <Button type="primary" size="small" @click="row.status && send(row)">{{row.status == 0 ? '已推送' : '推送'}}</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import { getSystemMessagePage, addMessageTemplate ,deleteMessageTemplateById, updateMessageTemplateById, sendMessage } from '@/api/systemMessage'
import { validateURL } from '@/libs/tools'
const defaultForm = {
  title: '',
  linkUrl: '',
  content: '',
  noticedAt: ''
}
export default {
  components:{},
  props:{},
  data(){
    const validateUrl = (rule, value, callback) => {
      if (value && !validateURL(value)) {
        callback(new Error('链接格式有误，请确认，格式如: www.xbkj.com'));
      }
      callback()
    }
    return {
      query: {
        page: 1,
        size: 20
      },
      form: Object.assign({}, defaultForm),
      columns: [
        {
            title: '标题',
            key: 'title',
        },
        {
            title: '内容',
            key: 'content',
        },
        {
            title: '跳转链接',
            key: 'linkUrl',
        },
        {
            title: '推送时间',
            key: 'noticedAt',
        },
        {
            title: '操作',
            slot: 'action',
            width: 200,
            align: 'center'
        },
      ],
      list: [],
      rules: {
        title: [
            { required: true, message: '不能为空', trigger: 'blur' }
        ],
        linkUrl: [
            { validator: validateUrl, trigger: 'blur' }
        ],
        content: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        noticedAt: [
          { required: true, type: 'date', message: '不能为空', trigger: 'blur' }
        ]
      },
      isEdit: false
    }
  },
  watch:{},
  computed:{},
  created(){
    this.getSystemMessagePage()
  },
  mounted(){},
  methods:{
    getSystemMessagePage() {
      getSystemMessagePage(this.query).then(data => {
        // console.log(data)
        this.list = data.list
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.isEdit = false
    },
    submit() {
      this.isEdit 
      ? updateMessageTemplateById(this.form).then(data => {
        this.$Message.success('修改成功')
        this.handleReset('form')
        this.getSystemMessagePage()
      })
      : addMessageTemplate(this.form).then(data => {
        this.$Message.success('创建成功')
        this.handleReset('form')
        this.getSystemMessagePage()
      })
      this.isEdit = false
    },
    edit(mes) {
      // console.log(mes)
      this.form = Object.assign({}, mes) 
      this.isEdit = true
    },
    deleteMessage(mes) {
      this.$Modal.confirm({
          title: '提示',
          content: '确定要删除吗',
          onOk: () => {
              deleteMessageTemplateById(mes).then(data => {
              this.$Message.success('删除成功')
              this.getSystemMessagePage()
            })
          },
      });
    },
    send(mes) {
      sendMessage(mes).then(data => {
        mes.status = 0
        this.$Message.success('推送成功')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.ivu-btn{
  margin-right: 5px;
}
.ivu-btn-ghost.ivu-btn-primary{
  margin-right: 50px;
}
</style>
