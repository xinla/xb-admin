<template>
  <div>
    <Row>
      <div class="title-row">供应商类型</div>
        <Col span="12">
        <Button type="primary" size="small" style="dispaly:block; margin:0 5px 5px auto;" @click="goPage('lesseeDetail')">新建</Button>
          <Table 
          border
          :loading="loading"
          :columns="supplierColumns"
          :data="supplierList">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
                <Button type="error" size="small" style="margin-right: 5px" @click="goPage('lesseeDetail')">删除</Button>
            </template>
          </Table>
        </Col>
        <Col span="12">
        <div>
          添加类型
          <Input type="text" v-model="supplierType" placeholder="親輸入类型"></Input>
          <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">确定</Button>
        </div>
        </Col>
    </Row>

     <Divider />
    
    <Row>
      <div class="title-row">产品类型</div>
        <Col span="12">
        <Button type="primary" size="small" style="dispaly:block; margin:0 5px 5px auto;" @click="goPage('lesseeDetail')">新建</Button>
          <Table 
          border
          :loading="loading"
          :columns="productColumns"
          :data="productList">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
                <Button type="error" size="small" style="margin-right: 5px" @click="goPage('lesseeDetail')">删除</Button>
            </template>
          </Table>
        </Col>
        <Col span="12">
        <div>
          添加类型
          <Select v-model="model1" style="width:200px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Input type="text" v-model="supplierType" placeholder="親輸入类型"></Input>
          <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">确定</Button>
        </div>
        </Col>
    </Row>
  </div>
</template>

<script>
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
      supplierType: '',
      productColumns: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '分类',
          key: 'name',
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
      productType: '',
    }
  },
  watch:{},
  computed:{},
  created(){},
  mounted(){},
  methods:{}
}
</script>
<style lang="less" scoped>
</style>
