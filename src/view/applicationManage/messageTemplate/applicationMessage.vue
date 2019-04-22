<template>
  <div>
    <xNav/>
    
    <div class="title-row">产品变更
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
    </table>

    <Divider />

    <div class="title-row">供应商变更
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
    </table>

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
