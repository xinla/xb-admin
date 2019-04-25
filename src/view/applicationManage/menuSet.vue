<template>
  <div>
    <Row>
      <Col span="3" >
      <div @click="tol">展开/收起</div></Col>
      <Col span="3">业务类型</Col>
      <Col span="3">菜单名称</Col>
      <Col span="3">请求地址</Col>
      <Col span="3">菜单类型</Col>
      <Col span="2">可见状态</Col>
      <Col span="3">权限标识</Col>
      <Col span="4">操作</Col>
    </Row>
    <memuRecursive :menu="list" :show="true"></memuRecursive>
    
    <Form class="org-form cc" :model="form" :rules="rules" :label-width="100">
      新建菜单

      <FormItem label="业务类型">
        <RadioGroup v-model="form.businessType">
          <Radio v-for="(value, key) in businessType" :label="value" :value="key" :key="key"></Radio>
        </RadioGroup>
      </FormItem>
      
      <FormItem label="上级菜单">
        <Select v-model="form.pid" style="width:200px">
            <Option v-for="item in menuList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>

      <FormItem label="菜单名称">
        <Input v-model="form.name" placeholder="请输入菜单名称"></Input>
      </FormItem>

      <FormItem label="菜单类型">
        <RadioGroup v-model="form.classify">
          <Radio v-for="(value, key) in menuType" :label="value" :value="key" :key="key"></Radio>
        </RadioGroup>
      </FormItem>
      
      <FormItem label="请求地址">
        <Input v-model="form.menuUrl" placeholder="请输入请求地址"></Input>
      </FormItem>

      <FormItem label="权限标识">
        <Input v-model="form.permissionIdentifying" placeholder="请输入权限标识"></Input>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="submit()">确认</Button>
        <Button @click="cancel()" style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { getAllMenu, getMenuPage, modifyMenu, deleteMenu } from "@/api/menuSet"
import memuRecursive from './components/memuRecursive'

const defautlForm = {
  name: '',
  businessType: '',
  classify: '',
  menuUrl: '',
  permissionIdentifying: '',
  pid: '',
};
export default {
  components:{ memuRecursive },
  props:{},
  data(){
    return {
      businessType: {
        0: '保险',
        1: '信贷',
        2: '基金'
      },
      menuType: {
        0: '菜单',
        1: '按钮'
      },
      menuList: [],
      form: Object.assign({}, defautlForm),
      list: [],
      rules: {
        name: [
            { required: true, message: '不能为空', trigger: 'blur' },
        ],
        businessType: [
            { required: true, message: '不能为空', trigger: 'blur' },
        ],
        classify: [
            { required: true, message: '不能为空', trigger: 'blur' },
        ],
        menuUrl: [
            { required: true, message: '不能为空', trigger: 'blur' },
        ],
        permissionIdentifying: [
            { required: true, message: '不能为空', trigger: 'blur' },
        ],
        pid: [
            { required: true, message: '不能为空', trigger: 'blur' },
        ],
      }
    }
  },
  computed:{},
  watch:{},
  mounted(){
    getAllMenu().then(data => {
      var menuList = []
      console.log(data)
      this.list = data
      this.menuList = recursiveMenu(data)
      console.log(this.menuList)

      function recursiveMenu(data) {
        for (const iterator of data) {
          menuList.push({
            id: iterator.id,
            name: iterator.name
          })
          recursiveMenu(data.childList)
        }
        return menuList
      }

    })
  },
  methods:{
    submit() {
      console.log(1)
    },
    cancel() {

    },
    tol() {
      console.log(1)
    }
  }
}
</script>
<style lang="less" scoped>
  table{ 
    border: 1px solid #ccc;
    width: 100%;
    text-align: center;
  }
  /deep/.ivu-col{
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .ivu-row{
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
</style>
