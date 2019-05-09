<template>
  <Form ref="form" :model="form" :label-width="120">

    <FormItem label="投保单位" prop="site">
        <RadioGroup v-model="animal">
            <Radio label="元"></Radio>
            <Radio label="份"></Radio>
            <Radio label="档"></Radio>
        </RadioGroup>
    </FormItem>

    <FormItem label="费率计算方式" prop="form">
      <RadioGroup v-model="animal">
          <Radio>
            保额推保费 计算单位：<Input type="text" style="width:100px;" size="small" v-model="form.fullName"/>
          </Radio>
          <br>
          <Radio>
            保费推保额 计算单位：<Input type="text" style="width:100px;" size="small" v-model="form.fullName"/>
          </Radio>
      </RadioGroup>
    </FormItem>

    <FormItem label="交费方式计费系数" prop="site">
      年：
      <Input type="text" size="small" style="width:50px;" v-model="form.fullName"/>
      半年：
        <Input type="text" size="small" style="width:50px;" v-model="form.fullName"/>
        季： 
        <Input type="text" size="small" style="width:50px;" v-model="form.fullName"/>
        月： 
        <Input type="text" size="small" style="width:50px;" v-model="form.fullName"/>
    </FormItem>
    
    <FormItem label="是否区分性别" prop="site">
      <Switch v-model="animal" @on-change="change" />
    </FormItem>

    <FormItem label="是否区分社保" prop="site">
      <Switch v-model="animal" @on-change="change" />
    </FormItem>

     <!-- <FormItem label="费率分性别" prop="site">
        <table>
          <tr>
            <th>交费期间</th>
            <th>投保年龄</th>
            <th>保险期间</th>
          </tr>
          <tr>
            <td>1年</td>
            <td>
              <Input type="text" style="width:50px;" size="small" v-model="form.fullName"/>
              周岁-
              <Input type="text" style="width:50px;" size="small" v-model="form.fullName"/>
              周岁
            </td>
            <td>终身</td>
          </tr>
          <tr>
            <td>1年</td>
            <td>
              <Input type="text" style="width:50px;" size="small" v-model="form.fullName"/>
              周岁-
              <Input type="text" style="width:50px;" size="small" v-model="form.fullName"/>
              周岁
            </td>
            <td>终身</td>
          </tr>
          <tr>
            <td>1年</td>
            <td>
              <Input type="text" style="width:50px;" size="small" v-model="form.fullName"/>
              周岁-
              <Input type="text" style="width:50px;" size="small" v-model="form.fullName"/>
              周岁
            </td>
            <td>终身</td>
          </tr>
        </table>
    </FormItem> -->

    <FormItem label="保额限制" prop="site">
      最低
        <Input type="text" size="small" style="width:50px;" v-model="form.fullName"/>
        元 

        递增单位
        <Input type="text" size="small" style="width:50px;" v-model="form.fullName"/>
        元
    </FormItem>

    <Upload action="//jsonplaceholder.typicode.com/posts/">
        <Button icon="ios-cloud-upload-outline">上传费率表</Button>
    </Upload>

  </Form>
</template>

<script>
import Editor from '_c/editor'

const defaultForm = {
  fullName: '',
  shortName: '',
  type: '',
  logo: '',
  site: '',
  website: '',
  mobile: '',
  call: '',
}

export default {
  components: {
    Editor
  },
  data() {
    return {
      form: Object.assign({}, defaultForm)
    }
  },
}
</script>

