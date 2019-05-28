<template>
  <div>
    <Row>
      <Col span='12'>
        <Form ref="form" :model="form" :rules="rules" inline>
          <FormItem label="供应商">
            
          </FormItem>
        </Form>
      </Col>
      <Col span='12'>
        <div class="fr">
          <Button size="small" type="primary" @click="download">下载模板</Button>
          <Upload :action="action"
          :data="body"
          :format="['xls','xlsx']" 
          :show-upload-list="false" :before-upload="upload">
              <Button icon="ios-cloud-upload-outline"
              >上传表格</Button>
          </Upload>
        </div>
      </Col>
    </Row>
    
  </div>
</template>

<script>
import { importProfessionTable, exportProfessionTable, downloadProfessionTable } from "@/api/rulesSet/profession"

export default {
  components:{},
  props:{},
  data(){
    return {
      form: {

      },
      rules: {},
      body: {
        path: ''
      },
      action: this.$config.baseUrl.dev + this.$config.services.profession + '/import'
    }
  },
  computed:{},
  watch:{},
  mounted(){},
  methods:{
    download() {
      downloadProfessionTable()
    },
    upload(file) {
      // console.log(file)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
