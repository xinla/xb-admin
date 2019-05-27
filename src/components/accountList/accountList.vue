<template>
  <div>

    <div class="title-row">超级管理员
    </div>
    <Table 
    :columns="columnsRole"
    :data="listRole">
    </Table>

    <Divider />

    <div class="title-row">体验账号
    </div>
    <Table 
    :columns="columnsAccount"
    :data="listAccount">
      <template slot-scope="{ row }" slot="time">
        {{row.invaTimeStart}} 至 {{row.invaTimeEnd}}
      </template>
    </Table>

  </div>
</template>

<script>
import { getRoles, getInvaNumber } from "@/api/lessee";

export default {
  name: 'accountList',
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      query: {
        page: 1,
        size: 10,
        companyId: 0
      },
      columnsRole: [
        {
            title: '姓名',
            key: 'uname',
        },
        {
            title: '手机号',
            key: 'mobile',
        },
        {
            title: '职务',
            key: 'rname',
        },
      ],
      columnsAccount: [
        {
            title: '姓名',
            key: 'uname',
        },
        {
            title: '手机号',
            key: 'mobile',
        },
        {
            title: '职务',
            key: 'rname',
        },
        {
            title: '应用权限',
            key: 'mname',
        },
        {
            title: '有效期',
            slot: 'time'
        }
      ],
      listRole: [],
      listAccount: [],
    }
  },
  mounted() {
    this.query.companyId = this.id
    this.init()
  },
  methods: {
    init() {
      getRoles(this.query).then(data => {
        // console.log(data)
        this.listRole = data.list
      })
      getInvaNumber(this.query).then(data => {
        // console.log(data)
        this.listAccount = data
      })
    }
  }
}
</script>

<style lang='less' scoped>
  @import url('./index.less');
</style>

