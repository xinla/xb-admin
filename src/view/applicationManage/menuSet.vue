<template>
  <div>
    <Row style="padding-bottom: 10px;">
      <Col span="6">
        <Button type="info" @click="addChild()">新建</Button>
        <Button type="info" @click="isfold = !isfold">折叠/展开</Button>
      </Col>
      <Col span="18">
      <Form ref="form" :model="query" inline :label-width="60">
        <FormItem prop="type" label="业务类型">
          <Select v-model="query.type" style="width:100px">
            <Option v-for="(value, key) in type" :value="+key" :key="key">{{ value }}</Option>
          </Select>
        </FormItem>

        <FormItem prop="type" label="菜单类型">
        <Select v-model="query.classify" style="width:100px">
          <Option v-for="(value, key) in menuType" :value="+key" :key="key">{{ value }}</Option>
        </Select>
        </FormItem>
        <FormItem prop="type" label="可见状态">
        <Select v-model="query.isVo" style="width:100px">
          <Option v-for="(value, key) in isVo" :value="+key" :key="key">{{ value }}</Option>
        </Select>
        </FormItem>
        <Input v-model="query.name" placeholder="搜索公司" style="width:30%; margin-right: 10px;"/>
        <Button type="info" @click="search()">搜索</Button>
        </Form>
      </Col>
    </Row>

  <tree-table :expand-type="false" :columns="columns" 
    :selectable="true"
    children-prop="childList"
    select-type="radio"
    :is-fold="isfold"
    :data="list" >
      <template slot="classify" slot-scope="scope">
        {{scope.row.classify | menuTypeFilter}}
      </template>
      <template slot="type" slot-scope="scope">
        {{scope.row.type | typeFilter}}
      </template>
      <template slot="isVo" slot-scope="scope">
        {{scope.row.isVo | isVoFilter}}
      </template>
      <template slot="action" slot-scope="scope">
        <Button type="info" size="small" @click="edit(scope.row)">编辑</Button>
        <Button type="success" size="small" @click="addChild(scope.row)">添加下级</Button>
        <Button type="error" size="small" @click="deleteMenu(scope.row)">删除</Button>
      </template>
    </tree-table>
    
    <Form v-show="formShow" ref="form" class="org-form cc" :model="form" :rules="rules" :label-width="100">
      新建菜单

      <FormItem prop="type" label="业务类型">
        <RadioGroup v-model="form.type">
          <Radio v-for="(value, key) in type" :label="+key" :key="key">{{value}}</Radio>
        </RadioGroup>
      </FormItem>
      
      <FormItem prop="pid" label="上级菜单">
        <Select v-model="form.pid" style="width:200px">
          <!-- <OptionGroup v-for="(item) in list" :key="item.id" :label="item.name" >
              <Option v-for="(unit) in item.childList" :value="unit.id" :key="unit.id">{{ unit.name }}
              </Option>
          </OptionGroup> -->
            <Option v-for="item in menuList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>

      <FormItem prop="name" label="菜单名称">
        <Input v-model="form.name" placeholder="请输入菜单名称"></Input>
      </FormItem>

      <FormItem prop="classify" label="菜单类型">
        <RadioGroup v-model="form.classify">
          <Radio v-for="(value, key) in menuType" :label="+key" :key="key">{{value}}</Radio>
        </RadioGroup>
      </FormItem>
      
      <FormItem prop="menuUrl" label="请求地址">
        <Input v-model="form.menuUrl" placeholder="请输入请求地址"></Input>
      </FormItem>

      <FormItem prop="permissionIdentifying" label="权限标识">
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
import { getAllMenu, getMenuPage, modifyMenu, deleteMenu, addMenu } from "@/api/menuSet"
import memuRecursive from './components/memuRecursive'

const defautlForm = {
  name: '',
  type: '',
  classify: '',
  isVo: '',
  menuUrl: '',
  permissionIdentifying: '',
  pid: 0,
  type: ''
}
const menuType= {
  0: '菜单',
  1: '按钮'
}
const type= {
  0: '信贷',
  1: '总后台',
  2: '保险',
  3: '基金'
}
let isVo = {
  0: '可见',
  1: '隐藏'
}
export default {
  components:{ memuRecursive },
  filters: {
    menuTypeFilter(val) {
      return menuType[val]
    },
    typeFilter(val) {
      return type[val]
    },
    isVoFilter(val) {
      return isVo[val]
    },
  },
  data(){
    return {
      menuList: [],
      menuType: Object.assign({}, menuType),
      type: Object.assign({}, type),
      isVo: Object.assign({}, isVo),
      query: {
        page: 1,
        size: 10,
        id: '',
        type: '',
        classify: '',
        isVo: '',
        name: ''
      },
      form: Object.assign({}, defautlForm),
      columns: [
        {
          title: '菜单名称',
          key: 'name',
          minWidth: '130px',
        },
        {
          title: '业务类型',
          key: 'type',
          type: 'template',
          template: 'type',
          headerAlign: 'center',
          align: 'center',
        },
        {
          title: '请求地址',
          key: 'menuUrl',
          headerAlign: 'center',
          align: 'center'
        },
        {
          title: '菜单类型',
          key: 'classify',
          type: 'template',
          template: 'classify',
          headerAlign: 'center',
          align: 'center'
        },
        {
          title: '可见状态',
          key: 'isVo',
          type: 'template',
          template: 'isVo',
          headerAlign: 'center',
          align: 'center'
        },
        {
          title: '权限标识',
          key: 'permissionIdentifying',
          headerAlign: 'center',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          minWidth: '150px',
          type: 'template',
          template: 'action',
          headerAlign: 'center',
          align: 'center'
        },
      ],
      list: [],
      rules: {
        name: [
            { required: true, message: '不能为空', trigger: 'blur' },
        ],
        type: [
            { required: true, type: 'number', message: '类型错误或为空', trigger: 'change' },
        ],
        classify: [
            { required: true, type: 'number', message: '不能为空', trigger: 'change' },
        ],
        menuUrl: [
            { required: true, message: '不能为空', trigger: 'blur' },
        ],
        permissionIdentifying: [
            { required: true, message: '不能为空', trigger: 'blur' },
        ]
      },
      isEdit: false,
      formShow: false,
      isfold: false,
      total: 0
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData() {
      getAllMenu().then(data => {
        let menuList = []
        console.log(data)
        this.list = data
        this.menuList = recursiveMenu(data)
        // console.log(this.menuList)

        function recursiveMenu(data) {
          
          for (const iterator of data) {
            // 提取所有菜单
            menuList.push({
              id: iterator.id,
              name: iterator.name
            })
            recursiveMenu(iterator.childList)
          }
          return menuList
        }
      })
    },
    search() {
      getMenuPage(this.query).then(data => {
        // console.log(data)
         this.list = data.list
      })
    },
    handleReset() {
      this.$refs['form'].resetFields();
      this.isEdit = false
      this.formShow = false
    },
    edit(mes) {
      console.log(mes)
      this.form = Object.assign({}, mes) 
      this.isEdit = true
      this.formShow = true
    },
    submit() {
      // console.log(this.form)
      this.$refs['form'].validate((valid) => {
          if (valid) {
            this.isEdit 
            ? modifyMenu(this.form).then(data => {
              this.$Message.success('修改成功')
              this.handleReset()
              this.getData()
            })
            : addMenu(this.form).then(data => {
              this.$Message.success('创建成功')
              this.handleReset()
              this.getData()
            })
          }
      })
    },
    cancel() {
      this.handleReset()
    },
    addChild(data) {
      this.form = Object.assign({}, defautlForm),
      this.form.pid = data && data.id || 0
      this.isEdit = false
      this.formShow = true
    },
    deleteMenu(data) {
      console.log(data)
      if (data.childList.length) {
        this.$Message.warning({
          content: '此项含有子项，不可直接删除！',
          closable: true,
          // duration: 0
        })
      } else {
        this.$Modal.confirm({
            title: '提示',
            content: '确定要删除吗',
            onOk: () => {
                deleteMenu(data.id).then(_data => {
                this.$Message.success('删除成功')
                this.getData()
              })
            },
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
  // table{ 
  //   border: 1px solid #ccc;
  //   width: 100%;
  //   text-align: center;
  // }
  // /deep/.ivu-col{
  //   height: 30px;
  //   line-height: 30px;
  //   text-align: center;
  //   border-right: 1px solid #ccc;
  //   border-bottom: 1px solid #ccc;
  // }
  // .ivu-row{
  //   border-top: 1px solid #ccc;
  //   border-left: 1px solid #ccc;
  // }
</style>
