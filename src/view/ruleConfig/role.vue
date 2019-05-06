<template>
  <div>
    <Row>
      <div class="title-row">供应商类型</div>
        <Col span="12">
        <Button type="primary" size="small" style="dispaly:block; margin:0 5px 5px auto;" @click="edit(0)">新建</Button>
          <Table 
          border
          :columns="supplierColumns"
          :data="supplierList">
            <template slot-scope="{ row }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="edit(0, row)">编辑</Button>
                <Button type="error" size="small" style="margin-right: 5px" @click="handleDelete(0)">删除</Button>
            </template>
          </Table>
        </Col>
        <Col span="12">
        <div v-show="supplierShow">
          添加类型
          <div class="fr cp" @click="cancel(0)">x</div>
          <Input type="text" v-model="supplierForm.name" placeholder="親輸入类型"></Input>
          <Button type="primary" size="small" style="margin-right: 5px" @click="submit(0, supplierForm)">确定</Button>
        </div>
        </Col>
    </Row>

     <Divider />
    
    <Row>
      <div class="title-row">产品类型</div>
        <Col span="12">
        <Button type="primary" size="small" style="dispaly:block; margin:0 5px 5px auto;" @click="edit(1)">新建</Button>
          <Table 
          border
          :columns="productColumns"
          :data="productList">
          <template slot-scope="{ row }" slot="type">
            {{getProductType(row.type)}}
          </template>
            <template slot-scope="{ row }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="edit(1, row)">编辑</Button>
                <Button type="error" size="small" style="margin-right: 5px" @click="handleDelete(1)">删除</Button>
            </template>
          </Table>
        </Col>
        <Col span="12">
        <div v-show="productShow">
          添加类型
          <div class="fr cp" @click="cancel(1)">x</div>
          <Select v-model="productForm.type" style="width:200px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Input type="text" v-model="productForm.name" placeholder="親輸入类型"></Input>
          <Button type="primary" size="small" style="margin-right: 5px" @click="submit(1, productForm)">确定</Button>
        </div>
        </Col>
    </Row>
  </div>
</template>

<script>
import { getRoleRulePage, getRoleRuleRuleById, deleteRoleRule, updateRoleRule, addRoleRule } from "@/api/rulesSet/role";
import { getRoleGroupRulePage, getRoleGroupRuleRuleById, deleteRoleGroupRule, updateRoleGroupRule, addRoleGroupRule } from "@/api/rulesSet/roleGroup";

export default {
  components:{},
  props:{},
  data(){
    return {
      supplierColumns: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '类型名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        },
      ],
      supplierList: [],
      supplierForm: {
        type: 0,
        name: '',
        pid: '0'
      },
      supplierShow: false,
      productColumns: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '分类',
          key: 'pid',
          align: 'center'
        },
        {
          title: '类型名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        },
      ],
      productList: [],
      productForm: {
        type: 1,
        name: '',
        pid: '0'
      },
      productShow: false
    }
  },
  watch:{},
  computed:{},
  mounted(){
    this.init()
  },
  methods:{
    init() {
      this.getData(0)
      this.getData(1)
    },
    getData(type){
      getTypeRulePage(type).then(data => {
        console.log(data);
        type === 0
        ? this.supplierList = data.list
        : this.productList = data.list
      })
    },
    edit(_type, item) {
      let { id, name, pid, type } = item
      if (_type === 0) {
        this.supplierShow = true
        id && (this.supplierForm = { id, name, pid, type })
      } else {
        this.productShow = true
        id && (this.productForm = { id, name, pid, type })
      }
    },
    handleDelete(id) {
      this.$Modal.confirm({
          title: '提示',
          content: '确定要删除吗',
          onOk: () => {
            deleteTypeRule(id)
            .then(data => {
              this.getData(type)
              this.$Message.success("操作成功")
            })
          },
      })
    },
    submit(type, item) {
      console.log(this.supplierForm)
      console.log(this.productForm)
      Promise.resolve()
      .then(() => {
        if (item.id) {
          return updateTypeRule(item)
        } else {
          return addTypeRule(item)
        }
      })
      .then(data => {
        this.$Message.success("操作成功")
        this.cancel(type)
      })
    },
    cancel(type) {
      type === 0 ? this.supplierShow = false : this.productShow = false
    },
    async getProductType(id) {
      let res = await getTypeRuleRuleById(id)
      console.log(res)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
