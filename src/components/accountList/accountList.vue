<template>
  <div>

    <div class="title-row">超级管理员
    </div>
    <Table 
    :columns="columnsRole"
    :data="roleList">
      <template slot-scope="{ row, index }" slot="action">
        <img :src="row.img" alt="" @click="zoom(index)">
        <img class="zoom" v-if="zoomIndex === index" :src="row.img" alt="">
      </template>
    </Table>

    <Divider />

    <div class="title-row">体验账号
    </div>
    <Table 
    :columns="columnsAccount"
    :data="accountList">
      <template slot-scope="{ row, index }" slot="action">
        <img :src="row.img" alt="" @click="zoom(index)">
        <img class="zoom" v-if="zoomIndex === index" :src="row.img" alt="">
      </template>
    </Table>

  </div>
</template>

<script>
export default {
  name: 'accountList',
  data() {
    return {
      columnsRole: [
        {
            title: '姓名',
            key: 'name',
        },
        {
            title: '手机号',
            key: 'name',
        },
        {
            title: '职务',
            key: 'name',
        },
      ],
      columnsAccount: [
        {
            title: '姓名',
            key: 'name',
        },
        {
            title: '手机号',
            key: 'name',
        },
        {
            title: '职务',
            key: 'name',
        },
        {
            title: '应用权限',
            key: 'name',
        },
        {
            title: '有效期',
            key: 'name',
        }
      ],
      roleList: [],
      accountList: [],
    }
  }
}
</script>

<style lang='less' scoped>
  @import url('./index.less');
</style>

