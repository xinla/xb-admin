<template>
  <div>
    <div class="title-row">创建通知</div>
    <Form ref="form" :model="form" :label-width="120">
      <FormItem label="通知标题" prop="shortName">
          <Input type="text" v-model="form.shortName" placeholder="供应商简称"/>
      </FormItem>
      <FormItem label="跳转链接" prop="shortName">
          <Input type="text" v-model="form.shortName" placeholder="供应商简称"/>
      </FormItem>
      <FormItem label="推送时间" prop="shortName">
          <Input type="text" v-model="form.shortName" placeholder="供应商简称"/>
      </FormItem>
      <FormItem label="通知内容" prop="shortName">
          <Input type="textarea" v-model="form.shortName" placeholder="供应商简称"/>
      </FormItem>
      <div class="ac">
        <Button type="primary" ghost @click="current--">清空内容</Button>
        <Button type="primary" @click="current++">确认添加</Button>
      </div>
    </Form>

    <Divider />
    
    <div class="title-row">创建通知</div>
    <Table 
      :columns="columns"
      :data="form.accountList">
      <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
          <Button type="error" size="small" style="margin-right: 5px" @click="goPage('lesseeDetail')">删除</Button>
          <Button type="error" size="small" @click="set(index)">推送</Button>
      </template>
    </Table>
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
  components:{},
  props:{},
  data(){
    return {
      form: Object.assign({}, defaultForm),
      columns: [
        {
            title: '标题',
            key: 'name',
        },
        {
            title: '内容',
            key: 'mobile',
        },
        {
            title: '跳转链接',
            key: 'mobile',
        },
        {
            title: '推送时间',
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
  created(){},
  mounted(){},
  methods:{}
}
</script>
<style lang="less" scoped>
.ivu-btn-primary{
  margin-right: 50px;
}
</style>
