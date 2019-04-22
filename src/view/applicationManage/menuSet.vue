<template>
  <div>
    
    <Table border :columns="columns" :data="NemberList"></Table>
    
    <Form class="org-form cc" :model="orgForm" :rules="ruleValidate" :label-width="100">
      添加下级组织
      <FormItem label="组织名称">
        <Input v-model="orgForm.name" placeholder="親輸入组织名称"></Input>
      </FormItem>
      <FormItem label="组织类型">
        <RadioGroup v-model="orgForm.type">
          <Radio label="分公司"></Radio>
          <Radio label="机构"></Radio>
          <Radio label="部门"></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="组织简介">
        <Input type="textarea" v-model="orgForm.des" placeholder="親輸入组织简介"></Input>
      </FormItem>
      <FormItem label="组织地址">
        <Input v-model="orgForm.site" placeholder="親輸入组织地址"></Input>
      </FormItem>
      <FormItem label="组织电话">
        <Input v-model="orgForm.call" placeholder="親輸入组织电话"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submit()">确认添加</Button>
        <Button @click="cancel()" style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
const defautlOrgForm = {
  name: "",
  type: "",
  des: "",
  site: "",
  call: ""
};
export default {
  components:{},
  props:{},
  data(){
    return {
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          align: "center"
        },
        {
          title: "部门",
          key: "age",
          align: "center"
        },
        {
          title: "职务",
          key: "address",
          align: "center"
        },
        {
          title: "工号",
          key: "address",
          align: "center"
        },
        {
          title: "手机号",
          key: "address",
          align: "center"
        },
        {
          title: "邮箱",
          key: "address",
          align: "center"
        }
      ],
      orgForm: Object.assign({}, defautlOrgForm)
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
