<template>
  <div style="width: 30%;">
    <Form ref="form" :model="form" :rules="rules" :label-width="80">
      <FormItem prop="title" label="标题">
          <Input type="text" v-model="form.title" placeholder="标题">
          </Input>
      </FormItem>
      <FormItem prop="classifyId" label="分类">
          <Select v-model="form.classifyId" style="width:200px">
              <Option v-for="(item, index) in classifyList" :value="item.id" :key="index">{{ item.name }}</Option>
          </Select>
      </FormItem>
      <FormItem prop="content" label="内容">
          <Input type="textarea" v-model="form.content" placeholder="内容">
          </Input>
      </FormItem>
      <Button class="submit" type="primary" @click="handleSubmit">确定</Button>
    </Form>
  </div>
</template>

<script>
import { modifyHelp, addHelp, getHelpById, getHelpClassify } from '@/api/systemHelp'

const defaultForm = {
  title: '',
  classifyId: 0,
  content: '',
}
export default {
  components:{},
  props:{},
  data(){
    return {
      form: Object.assign({}, defaultForm),
      classifyList: [],
      rules: {
        title: [
            { required: true, message: '不能为空', trigger: 'blur' }
        ],
        classifyId: [
            {type: 'number', required: true, message: '不能为空', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
    }
  },
  computed:{},
  watch:{},
  created(){},
  mounted(){
    let id = this.$route.query.id
    if (id) {
      getHelpById(id).then(data => {
        data.classifyId = parseInt(data.classifyId)
        this.form = data
        // console.log(data)
      })
    }
    getHelpClassify().then(data => {
      this.classifyList = data
      // console.log(this.classifyList)
    })
  },
  methods:{
    handleSubmit() {
      // console.log(this.form)
      this.$refs.form.validate((valid) => {
          if (valid) {
            !this.$route.query.id
            ? addHelp(this.form).then(data => {
              this.$Message.success('添加成功')
              // this.$refs.form.resetFields()
              this.form = Object.assign({}, defaultForm)
              this.$router.back()
            })
            : modifyHelp(this.form).then(data => {
              this.$Message.success('修改成功')
              // this.$refs.form.resetFields()
              this.form = Object.assign({}, defaultForm)
              this.$router.back()
            })
          }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .submit{
    display: block;
    margin: 0 auto;
  }
</style>
