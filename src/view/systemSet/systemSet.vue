<template>
  <div>
    <Form ref="form" :model="form" :label-width="80">
        <Row>
            <Col span="12">
              <FormItem prop="name" label="系统名称">
                  <Input type="text" v-model="form.user" placeholder="系统名称">
                  </Input>
              </FormItem>
              <FormItem prop="slogan" label="系统标语">
                  <Input type="text" v-model="form.slogan" placeholder="系统标语">
                  </Input>
              </FormItem>
              <FormItem prop="version" label="系统版本">
                  <Input type="text" v-model="form.version" placeholder="系统版本">
                  </Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="系统名称">
                  <Upload action="//jsonplaceholder.typicode.com/posts/">
                      <Button icon="ios-cloud-upload-outline">Upload files</Button>
                  </Upload>
              </FormItem>
            </Col>
        </Row>
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
