<template>
  <div v-show="value">
    <Form ref="formInline" :model="form" :label-width="80">
        <FormItem prop="expressCompany" label="快递公司:">
            <Select v-model="form.expressCompany" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem prop="expressNumber" label="快递单号:">
            <Input type="text" v-model="form.expressNumber" placeholder="快递单号">
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="submit">确认邮寄</Button>
        </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  components:{},
  props:{
    value: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      form: {
        expressCompany: '',
        expressNumber: ''
      }
    }
  },
  computed:{},
  watch:{},
  created(){},
  mounted(){},
  methods:{
    close() {
      this.$emit('input', false)
    },
    submit() {

    }
  }
}
</script>
<style lang="less" scoped>
</style>
