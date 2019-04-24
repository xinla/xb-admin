<template>
  <div>
    <Form ref="form" :model="form" :label-width="80">
        <Row>
            <Col span="12">
              <FormItem prop="name" label="系统名称">
                  <Input type="text" v-model="form.user" placeholder="系统名称">
                  </Input>
              </FormItem>
              <FormItem prop="sign" label="系统标语">
                  <Input type="text" v-model="form.sign" placeholder="系统标语">
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
import { getSystemSetPage } from '@/api/systemSet'
const defaultForm = {
  name: '',
  sign: '',
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
  mounted(){
    getSystemSetPage({page: 1, size: 10}).then(data => {
      console.log(data)
    })
  },
  methods:{}
}
</script>
<style lang="less" scoped>
  .submit{
    display: block;
    margin: 0 auto;
  }
</style>
