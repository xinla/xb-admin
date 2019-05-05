<template>
  <Select
    v-model="val"
    filterable
    remote
    :remote-method="search"
    :loading="loading"
    :disabled="disabled">
      <!-- <Option :value="defaultValue" key="10000">{{defaultValue}}</Option> -->
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
import { getSupplierPage } from '@/api/supplier'

export default {
  name: 'selectSupplier',
  props:{
    val: '',
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'lessee'
    },
    defaultValue: ''
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
  methods:{
    search(query) {
      this.query.name = query
      this.loading = true
      new Promise((resolve, reject) => {
        resolve()
      })
      .then(() => {
        if (this.type === 'lessee') {
          return getLesseePageByJB(this.query)
        } else if (this.type === 'supplier') {
          return getSupplierPage(this.query)
        }
      })
      .then(data => {
        console.log(data)
        this.loading = false
        this.lesseeList = data.list
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
