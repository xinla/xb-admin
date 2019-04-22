<template>
  <div>
    <xNav/>
    
    <Row>
        <Col span="12">
          <div class="title-row">续费提醒
            <div class="fr">
              <Button size="small" type="primary" @click="edit">编辑</Button>
              <Button size="small" type="primary" @click="save">保存</Button>
            </div>
          </div>
          <table>
            <tr>
              <th>标题</th>
              <td>
                <Input type="text" :disabled="disabled" v-model="form.fullName"/>
              </td>
            </tr>
            <tr>
              <th>内容</th>
              <td>
                <Input type="text" :disabled="disabled" v-model="form.fullName"/>
              </td>
            </tr>
            <tr>
              <th>提示语</th>
              <td>
                <Input type="text" :disabled="disabled" v-model="form.fullName"/>
              </td>
            </tr>
          </table>
        </Col>
        <Col span="12">
          <div class="title-row">续保提醒</div>
          <table>
            <tr>
              <th>标题</th>
              <td>
                <Input type="text" :disabled="disabled" v-model="form.fullName"/>
              </td>
            </tr>
            <tr>
              <th>内容</th>
              <td>
                <Input type="text" :disabled="disabled" v-model="form.fullName"/>
              </td>
            </tr>
            <tr>
              <th>提示语</th>
              <td>
                <Input type="text" :disabled="disabled" v-model="form.fullName"/>
              </td>
            </tr>
          </table>
        </Col>
    </Row>

    <Divider />
    
    <Row>
        <Col span="12">
          <div class="title-row">纪念日提醒</div>
          <table>
            <tr>
              <th>标题</th>
              <td>
                <Input type="text" :disabled="disabled" v-model="form.fullName"/>
              </td>
            </tr>
            <tr>
              <th>内容</th>
              <td>
                <Input type="text" :disabled="disabled" v-model="form.fullName"/>
              </td>
            </tr>
            <tr>
              <th>提示语</th>
              <td>
                <Input type="text" :disabled="disabled" v-model="form.fullName"/>
              </td>
            </tr>
          </table>
        </Col>
        <Col span="12">
          <div class="title-row">会议提醒</div>
          <table>
            <tr>
              <th>标题</th>
              <td>
                <Input type="text" :disabled="disabled" v-model="form.fullName"/>
              </td>
            </tr>
            <tr>
              <th>内容</th>
              <td>
                <Input type="text" :disabled="disabled" v-model="form.fullName"/>
              </td>
            </tr>
            <tr>
              <th>提示语</th>
              <td>
                <Input type="text" :disabled="disabled" v-model="form.fullName"/>
              </td>
            </tr>
          </table>
        </Col>
    </Row>

    <Divider />
    <Row>
        <Col span="12">
          <div class="title-row">培训提醒</div>
          <table>
            <tr>
              <th>标题</th>
              <td>
                <Input type="text" :disabled="disabled" v-model="form.fullName"/>
              </td>
            </tr>
            <tr>
              <th>内容</th>
              <td>
                <Input type="text" :disabled="disabled" v-model="form.fullName"/>
              </td>
            </tr>
            <tr>
              <th>提示语</th>
              <td>
                <Input type="text" :disabled="disabled" v-model="form.fullName"/>
              </td>
            </tr>
          </table>
        </Col>
    </Row>

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
import xNav from '../components/nav'
export default {
  components:{
    xNav
  },
  props:{},
  data(){
    return {
      form: Object.assign({}, defaultForm),
      resForm: Object.assign({}, defaultResForm),
      disabled: true,
    }
  },
  watch:{},
  computed:{},
  created(){},
  mounted(){},
  methods:{
    edit() {
      this.disabled = false
    },
    save() {
      this.disabled = true
    }
  }
}
</script>
<style lang="less" scoped>
  /deep/ .ivu-input[disabled]{
    background:none;
    color: #000;
    border: 0;
    cursor: auto;
  }
</style>
