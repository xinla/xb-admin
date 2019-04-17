<template>
  <div>
    <Table 
    border
    :loading="loading"
    :columns="columns"
    :data="list">
    </Table>
  </div>
</template>

<script>
import { getTableData } from '@/api/data'
export default {
  name: "home",
  data() {
    return {
      loading: true,
      columns: [
        {
            type: 'index',
            width: 60,
            align: 'center'
        },
        {
            title: 'Name',
            key: 'name'
        },
        {
            title: 'Age',
            key: 'age'
        },
        {
            title: 'CreateTime',
            key: 'createTime'
        },
        {
            title: 'Email',
            key: 'email'
        },
        {
            title: 'Text',
            key: 'text'
        }
      ],
      list: [],
    }
  },
  mounted() {
    //
    getTableData().then(data => {
      // debugger
      this.loading = false
      this.list = data
    })
  }
};
</script>

<style lang="less">
</style>
