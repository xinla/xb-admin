<template>
  <div>
    <Button type="primary" size="small" style="display:block; margin:0 5px 5px auto;" @click="$router.push({name: 'createHelp'})">新建</Button>
    <Table border :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row, index }" slot="time">
        {{row.updateTime | transTime}}
      </template>
      <template slot-scope="{ row, index }" slot="classify">
        {{classifyList[row.classifyId - 1].name}}
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row.id)">编辑</Button>
        <Button type="error" size="small" @click="deleteHelp(row.id, index)">删除</Button>
      </template>
    </Table>

    <Page :total="total" show-elevator show-total style="text-align:center;margin-top:20px;" @on-change="getHelpPage"/>
  </div>
</template>

<script>
import { getHelpPage, modifyHelp, getHelpClassify, deleteHelpById } from '@/api/systemHelp'
import { formatDate } from '@/libs/tools'
export default {
  components:{},
  filters:{
    transTime(time) {
      return formatDate(time, 'year')
    }
  },
  props:{},
  data(){
    return {
      query: {
        page: 1,
        size: 10
      },
      loading: false,
      columns: [
        {
          title: '序号',
          type: 'index',
          align: "center",
          width: 80
        },
        {
          title: "分类",
          slot: "classify",
          align: "center",
          filters: [],
          filterMultiple: false,
          filterMethod(value, row) {
            return row.classifyId == value;
          }
        },
        {
          title: '标题',
          key: 'title',
          align: "center",
        },
        {
          title: '内容',
          key: 'content',
          align: "center",
        },
        {
          title: '时间',
          key: 'updateTime',
          slot: "time",
          align: "center",
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      list: [],
      classifyList: [],
      total: 0
    }
  },
  computed:{},
  watch:{},
  created(){},
  mounted(){
    this.getHelpPage()
    getHelpClassify().then(data => {
      // console.log(data)
      this.classifyList = data
      for (const iterator of data) {
        this.columns[1].filters.push({
          label: iterator.name,
          value: iterator.id
        })
      }
    })
  },
  methods:{
    getHelpPage(page) {
      this.query.page = (page || 1)
      this.loading = true
      getHelpPage(this.query).then(data => {
        this.loading = false
        // console.log(data)
        this.list = data.list
        this.total = data.total
      })
    },
    deleteHelp(id, index){
      this.$Modal.confirm({
          title: '提示',
          content: '确定要删除吗',
          onOk: () => {
              deleteHelpById(id).then(data => {
                this.list.splice(index, 1)
                this.total --
              })
          },
      })
    },
    edit(id){
      this.$router.push({name:'createHelp', query:{id}})
    },
    
  }
}
</script>
<style lang="less" scoped>
</style>
