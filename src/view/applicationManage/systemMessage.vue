<template>
  <div>
    <div class="title-row">创建通知</div>
    <Form ref="form" :model="form" :label-width="120">
      <FormItem label="通知标题" prop="title">
          <Input type="text" v-model="form.title" placeholder="通知标题"/>
      </FormItem>
      <FormItem label="跳转链接" prop="linkUrl">
          <Input type="text" v-model="form.linkUrl" placeholder="跳转链接"/>
      </FormItem>
      <FormItem label="推送时间" prop="noticedAt">
          <Input type="text" v-model="form.noticedAt" placeholder="推送时间"/>
      </FormItem>
      <FormItem label="通知内容" prop="content">
          <Input type="textarea" v-model="form.content" placeholder="通知内容"/>
      </FormItem>
      <div class="ac">
        <Button type="primary" ghost @click="reset">清空内容</Button>
        <Button type="primary" @click="submit">确认添加</Button>
      </div>
    </Form>

    <Divider />
    
    <div class="title-row">通知列表</div>
    <Table 
      :columns="columns"
      :data="list">
      <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
          <Button type="error" size="small" style="margin-right: 5px" @click="goPage('lesseeDetail')">删除</Button>
          <Button type="error" size="small" @click="set(index)">推送</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import { getAllSystemMessage, addMessageTemplate } from '@/api/systemMessage'
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
        },
      ],
      list: []
    }
  },
  watch:{},
  computed:{},
  created(){
    getAllSystemMessage(this.query).then(data => {
      console.log(data)
      this.list = data.list
    })
  },
  mounted(){},
  methods:{
    reset() {
      this.form = Object.assign({}, defaultForm)
    },
    submit() {
      addMessageTemplate(this.form).then(data => {
        this.$Message.info('创建成功')
        this.reset()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.ivu-btn-primary{
  margin-right: 50px;
}
</style>
