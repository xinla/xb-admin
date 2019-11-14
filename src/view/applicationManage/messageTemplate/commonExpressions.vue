<template>
  <div>
    <xNav/>

    <div class="title-row">邀请用语</div>
    <Table 
      :columns="columns"
      :data="listInvite">
      <template slot-scope="{ row, index }" slot="action">
          <Icon type="ios-close-circle-outline" @click="deleteInvite(index)"/>
      </template>
    </Table>
    <Row>
        <Col span="8">
          <Input v-model="formInvite.title" placeholder="请输入标题" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="8">
          <Input v-model="formInvite.content" placeholder="请输入内容" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="8">
          <Button type="primary" @click="addInvite('role')">添加</Button>
        </Col>
    </Row>
    <Divider />

    <div class="title-row">入群欢迎语</div>
    <Table 
      :columns="columns"
      :data="listJoin">
      <template slot-scope="{ row, index }" slot="action">
          <Icon type="ios-close-circle-outline" @click="deleteJoin(index)"/>
      </template>
    </Table>
    <Row>
        <Col span="8">
          <Input v-model="formJion.title" placeholder="请输入标题" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="8">
          <Input v-model="formJion.content" placeholder="请输入内容" style="width:73%; margin-right: 10px;" />
        </Col>
        <Col span="8">
          <Button type="primary" @click="addJoin('role')">添加</Button>
        </Col>
    </Row>
  </div>
</template>

<script>
import xNav from '../components/nav'
const defaultForm = {
  title: '',
  content: ''
}
export default {
  components:{
    xNav
  },
  props:{},
  data(){
    return {
      columns: [
        {
            title: '标题',
            key: 'title',
        },
        {
            title: '内容',
            key: 'content',
        },
        {
            title: '操作',
            slot: 'action',
        },
      ],
      formInvite: Object.assign({}, defaultForm),
      formJion: Object.assign({}, defaultForm),
      listInvite: [],
      listJoin: []
    }
  },
  watch:{},
  computed:{},
  created(){},
  mounted(){},
  methods:{
    addInvite() {
      this.listInvite.push(this.formInvite)
      this.formInvite = Object.assign({}, defaultForm)
    },
    deleteInvite(index) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定要删除吗',
        onOk: () => {
           this.listInvite.splice(index, 1)
            this.$Message.success('删除成功')
        },
      });
    }
  }
}
</script>
<style lang="less" scoped>
</style>
