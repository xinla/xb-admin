<template>
  <div>
    <xNav/>

    <div class="title-row">邀请用语</div>
    <Table 
      :columns="resColumns"
      :data="form.accountList">
      <template slot-scope="{ row, index }" slot="action">
          <Icon type="ios-close-circle-outline" @click="deleteRole(index)"/>
      </template>
    </Table>
    <Row>
        <Col span="8">
          <Input v-model="resForm.name" placeholder="请输入标题" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="8">
          <Input v-model="resForm.mobile" placeholder="请输入内容" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="8">
          <Button type="primary" @click="add('role')">添加</Button>
        </Col>
    </Row>
    <Divider />

    <div class="title-row">入群欢迎语</div>
    <Table 
      :columns="resColumns"
      :data="form.accountList">
      <template slot-scope="{ row, index }" slot="action">
          <Icon type="ios-close-circle-outline" @click="deleteRole(index)"/>
      </template>
    </Table>
    <Row>
        <Col span="8">
          <Input v-model="resForm.name" placeholder="请输入标题" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="8">
          <Input v-model="resForm.mobile" placeholder="请输入内容" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="8">
          <Button type="primary" @click="add('role')">添加</Button>
        </Col>
    </Row>
    <Divider />
  </div>
</template>

<script>
import xNav from '../components/nav'
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
export default {
  components:{
    xNav
  },
  props:{},
  data(){
    return {
      form: Object.assign({}, defaultForm),
      resColumns: [
        {
            title: '标题',
            key: 'name',
        },
        {
            title: '内容',
            key: 'mobile',
        },
        {
            title: '操作',
            slot: 'action',
        },
      ],
      resForm: Object.assign({}, defaultResForm),
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
