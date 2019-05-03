<template>
  <Select
    v-model="id"
    filterable
    remote
    placeholder="输入供应商进行选择"
    :remote-method="search"
    :loading="loading"
    :disabled="disabled">
      <Option v-for="(option, index) in lesseeList" 
      :value="option.id"
      :key="index"
      @click.native="$emit('change', option)">
      {{option.name}}
      </Option>
  </Select>
</template>

<script>
import { getLesseePageByJB } from '@/api/lessee'

export default {
  name: 'selectSupplier',
  props:{
    id: '',
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      loading: false,
      lesseeList: [],
      query: {
        page: 1,
        size: 10,
        type: 1,
        name: ''
      },
    }
  },
  // computed: {
  //   supplier() {
  //     return this.name
  //   }
  // },
  methods:{
    search(query) {
      this.query.name = query
      this.loading = true
      getLesseePageByJB(this.query).then(data => {
        // console.log(data)
        this.loading = false
        this.lesseeList = data.list
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
