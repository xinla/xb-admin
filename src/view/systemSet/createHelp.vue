<template>
  <div>
    <Form ref="form" :model="form" :label-width="80">
      <FormItem prop="name" label="标题">
          <Input type="text" v-model="form.user" placeholder="标题">
          </Input>
      </FormItem>
      <FormItem prop="slogan" label="分类">
          <Select v-model="model1" style="width:200px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
      </FormItem>
      <FormItem prop="version" label="内容">
          <Input type="textarea" v-model="form.version" placeholder="内容">
          </Input>
      </FormItem>
      <Button class="submit" type="primary">确定</Button>
    </Form>
  </div>
</template>

<script>
const defaultForm = {
  name: '',
  slogan: '',
  version: '',
  logo: '',
}
export default {
  components:{},
  props:{},
  data(){
    return {
      form: Object.assign({}, defaultForm)
    }
  },
  computed:{},
  watch:{},
  created(){},
  mounted(){},
  methods:{}
}
</script>
<style lang="less" scoped>
  .submit{
    display: block;
    margin: 0 auto;
  }
</style>
