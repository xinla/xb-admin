<template>
  <div>
    <Row style="padding-bottom: 10px;">
      <Col span="14">
        <Button type="info" @click="addChild()">新建</Button>
        <Button type="info" @click="isfold = !isfold">折叠/展开</Button>
      </Col>
      <Col span="10">
      <Form ref="form" :model="query" inline :label-width="60">
        <!-- <FormItem prop="type" label="业务类型">
          <Select v-model="query.type" style="width:100px">
            <Option v-for="(value, key) in type" :value="+key" :key="key">{{ value }}</Option>
          </Select>
        </FormItem> -->

        <FormItem prop="classify" label="菜单类型">
        <Select v-model="query.classify" style="width:100px">
          <Option v-for="(value, key) in menuType" :value="+key" :key="key">{{ value }}</Option>
          <Option value="" :key="100">全部</Option>
        </Select>
        </FormItem>
        <!-- <FormItem prop="type" label="可见状态">
        <Select v-model="query.isVo" style="width:100px">
          <Option v-for="(value, key) in isVo" :value="+key" :key="key">{{ value }}</Option>
        </Select>
        </FormItem> -->
        <Input v-model="query.name" placeholder="搜索名称" style="width:55%; margin-right: 10px;"/>
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
    
    <dialogBox v-model="formShow">
      <template slot="title">新建菜单</template>
      <Form ref="form" class="org-form" :model="form" :rules="rules" :label-width="70">
        
        <!-- <FormItem prop="type" label="业务类型">
          <RadioGroup v-model="form.type">
            <Radio v-for="(value, key) in type" :label="+key" :key="key">{{value}}</Radio>
          </RadioGroup>
        </FormItem> -->
        
        <FormItem prop="classify" label="资源类型">
          <RadioGroup v-model="form.classify">
            <Radio v-for="(value, key) in menuType" :label="+key" :key="key">{{value}}</Radio>
          </RadioGroup>
        </FormItem>
        
        <FormItem prop="pid" label="从属关系" v-if="form.classify != 2">
          <Select v-model="form.pid">
            <!-- <OptionGroup v-for="(item) in list" :key="item.id" :label="item.name" >
                <Option v-for="(unit) in item.childList" :value="unit.id" :key="unit.id">{{ unit.name }}
                </Option>
            </OptionGroup> -->
              <!-- 菜单 -->
              <Option v-for="item in menuList" v-show="form.classify === '' || form.classify === 1" :value="item.id" :key="item.id">{{ item.name }}</Option>
              
              <!-- 目录 -->
              <Option v-for="item in catalog" v-show="form.classify === '' || form.classify === 3 || form.classify === 
              0" :value="item.id" :key="item.id">{{ item.name }}</Option>

              <!-- 应用 -->
              <Option v-for="item in applicationList" v-show="form.classify === '' || form.classify === 
              0" :value="item.id" :key="item.id">{{ item.name }}</Option>
              
          </Select>
        </FormItem>

        <FormItem prop="name" label="资源名称">
          <Input v-model="form.name" placeholder="请输入资源名称"></Input>
        </FormItem>

        <FormItem prop="menuUrl" label="请求地址">
          <Input v-model="form.menuUrl" placeholder="请输入请求地址"></Input>
        </FormItem>

        <FormItem prop="permissionIdentifying" label="权限标识">
          <Input v-model="form.permissionIdentifying" placeholder="请输入权限标识"></Input>
        </FormItem>

        <FormItem prop="imageUrl" label="图标地址">
          <Input v-model="form.imageUrl" placeholder="请输入图标地址"></Input>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="submit()">确认</Button>
          <Button @click="cancel" style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </dialogBox>
    <!-- <div v-show="formShow" class="mask" @click.self="cancel">
    </div> -->
  </div>
</template>

<script>
import { getAllMenu, getMenuPage, deleteMenu, saveMenu } from "@/api/menuSet"
import memuRecursive from './components/memuRecursive'
import dialogBox from '@/components/dialogBox'

const defautlForm = {
  name: '',
  type: '',
  classify: '',
  isVo: '',
  menuUrl: '',
  permissionIdentifying: '',
  pid: 0,
  type: '',
  imageUrl: ''
}
const menuType= {
  0: '菜单',
  1: '操作',
  2: '目录',
  3: '应用'
}
const type= {
  0: '信贷',
  1: 'SaaS',
  2: '保险',
  3: '基金'
}
let isVo = {
  0: '可见',
  1: '隐藏'
}
export default {
  components:{ memuRecursive, dialogBox },
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
  props: {
    xType: {
      type: Number,
      default: 2 // 2:保险,1:Saas,0:信贷,3:基金
    }
  },
  data(){
    return {
      menuList: [],
      catalog: [],
      applicationList: [],
      menuType: Object.assign({}, menuType),
      type: Object.assign({}, type),
      isVo: Object.assign({}, isVo),
      query: {
        page: 1,
        size: 10,
        id: '',
        type: this.xType,
        classify: '',
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
        // type: [
        //     { required: true, type: 'number', message: '类型错误或为空', trigger: 'change' },
        // ],
        classify: [
            { required: true, type: 'number', message: '不能为空', trigger: 'change' },
        ],
        pid: [
            { required: true, message: '不能为空', trigger: 'change' },
        ],
        menuUrl: [
            { required: true, message: '不能为空', trigger: 'blur' },
        ],
        permissionIdentifying: [
            { required: true, message: '不能为空', trigger: 'blur' },
        ]
      },
      formShow: false,
      isfold: false,
      total: 0
    }
  },
  watch: {
    formShow(val) {
      !val && this.$refs['form'].resetFields()
    },
    'form.classify'(val) {
      this.form.pid = 0
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData() {
      // console.log(this.query)
      getAllMenu(this.query).then(data => {
        this.menuList = []
        this.catalog = []
        this.applicationList = []
        // console.log(data)
        this.list = data
        recursiveMenu.call(this, data)
        // this.menuList = recursiveMenu(data)
        // console.log(this.menuList)

        function recursiveMenu(data) {
          
          for (const iterator of data) {
            // 提取所有菜单
            if (iterator.classify === 0) {
              this.menuList.push({
                id: iterator.id,
                name: iterator.name
              })
            } else if (iterator.classify === 2) {
              this.catalog.push({
                id: iterator.id,
                name: iterator.name
              })
            } else if (iterator.classify === 3) {
              this.applicationList.push({
                id: iterator.id,
                name: iterator.name
              })
            }
            recursiveMenu.call(this, iterator.childList)
          }
          // return menuList
        }
      })
    },
    search() {
        // console.log(this.query)
      getMenuPage(this.query).then(data => {
        // console.log(data)
         this.list = data.list
      })
    },
    handleReset() {
      this.$refs['form'].resetFields();
      this.formShow = false
    },
    edit(mes) {
      // console.log(mes)
      this.form = Object.assign({}, mes) 
      this.formShow = true
    },
    submit() {
      // console.log(this.form)
      this.form.type = this.xType
      this.$refs['form'].validate((valid) => {
          if (valid) {
            saveMenu(this.form).then(data => {
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
      this.formShow = true
    },
    deleteMenu(data) {
      // console.log(data)
      if (data.childList && data.childList.length) {
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
  .ivu-btn{
    margin-right: 10px;
  }

</style>
