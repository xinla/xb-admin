<template>
  <div>
    <Table border :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
        <Button type="error" size="small" @click="set(index)">删除</Button>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      columns: [
        {
          title: "序号",
          type: 'index',
          align: "center",
          width: 50
        },
        {
          title: "分类",
          key: "compayAccountType",
          align: "center",
          filters: [
            {
              label: "体验服务",
              value: 1
            },
            {
              label: "基础应用服务",
              value: 2
            },
            {
              label: "高级应用服务",
              value: 1
            },
            {
              label: "超级应用服务",
              value: 2
            },
            {
              label: "定制服务",
              value: 1
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 0) {
              return row.compayAccountType == 0;
            } else if (value === 1) {
              return row.compayAccountType == 1;
            }
          }
        },
        {
          title: '内容',
          key: 'title',
          align: "center",
        },
        {
          title: '图片',
          key: 'title',
          align: "center",
        },
        {
          title: '机型数据',
          key: 'title',
          align: "center",
        },
        {
          title: '时间',
          key: 'title',
          align: "center",
        },
      ]
    }
  },
  computed:{},
  watch:{},
  created(){},
  mounted(){},
  methods:{}
}
</script>
<style lang="less" scoped>
</style>
