<template>
  <Form ref="form" :model="form" :label-width="120">
    <FormItem label="产品全称" prop="form">
        <Input type="text" style="width:100px;" v-model="form.fullName" placeholder="供应商名称"/>周岁 - 
        <Input type="text" style="width:100px;" v-model="form.fullName" placeholder="供应商名称"/>周岁
    </FormItem>
    <FormItem label="产品全称" prop="form">
      <CheckboxGroup v-model="fruit">
          <Checkbox label="10万"></Checkbox>
          <Checkbox label="20万"></Checkbox>
          <Checkbox label="10万"></Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem label="保险期间" prop="fullName">
      <CheckboxGroup v-model="fruit">
          <Checkbox label="终身"></Checkbox>
          <Checkbox label="1年"></Checkbox>
          <Checkbox label="至___周岁">
            至
            <Input type="text" style="width:50px;" v-model="form.fullName"/>
            周岁
          </Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem label="交费频率" prop="form">
      <CheckboxGroup v-model="fruit">
          <Checkbox label="年"></Checkbox>
          <Checkbox label="半年"></Checkbox>
          <Checkbox label="季"></Checkbox>
          <Checkbox label="月"></Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem label="非年交费率系数" prop="site">
      半年：
        <Input type="text" size="small" style="width:50px;" v-model="form.fullName"/>
        季： 
        <Input type="text" size="small" style="width:50px;" v-model="form.fullName"/>
        月： 
        <Input type="text" size="small" style="width:50px;" v-model="form.fullName"/>
    </FormItem>
    <FormItem label="投保单位" prop="site">
        <RadioGroup v-model="animal">
            <Radio label="元"></Radio>
            <Radio label="份"></Radio>
            <Radio label="档"></Radio>
        </RadioGroup>
    </FormItem>
    
    <FormItem label="费率计算基础" prop="form">
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
    <FormItem label="费率分性别" prop="site">
        <RadioGroup v-model="animal">
            <Radio label="分性别"></Radio>
            <Radio label="不分性别"></Radio>
        </RadioGroup>
    </FormItem>
     <FormItem label="费率分性别" prop="site">
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
    </FormItem>
    <FormItem label="保额限制" prop="site">
      最低
        <Input type="text" size="small" style="width:50px;" v-model="form.fullName"/>
        元 
        最高
        <Input type="text" size="small" style="width:50px;" v-model="form.fullName"/>
        元 
        递增单位
        <Input type="text" size="small" style="width:50px;" v-model="form.fullName"/>
        元
    </FormItem>
    
    <FormItem label="保额限制" prop="site">
      <table>
          <tr>
            <th>交费期间</th>
            <th>最低</th>
            <th>最高</th>
            <th>递增单位</th>
          </tr>
          <tr>
            <td>
              <Radio label="分性别"></Radio>
              <Input type="text" size="small" style="width:50px;" v-model="form.fullName"/>元
              <Input type="text" size="small" style="width:50px;" v-model="form.fullName"/>元
              <Input type="text" size="small" style="width:50px;" v-model="form.fullName"/>元
            </td>
          </tr>
          <tr>
            <td>
              <Radio label="分性别"></Radio>
              <Input type="text" size="small" style="width:50px;" v-model="form.fullName"/>元
              <Input type="text" size="small" style="width:50px;" v-model="form.fullName"/>元
              <Input type="text" size="small" style="width:50px;" v-model="form.fullName"/>元
            </td>
          </tr>
          <tr>
            <td>
              <Radio label="分性别"></Radio>
              <Input type="text" size="small" style="width:50px;" v-model="form.fullName"/>元
              <Input type="text" size="small" style="width:50px;" v-model="form.fullName"/>元
              <Input type="text" size="small" style="width:50px;" v-model="form.fullName"/>元
            </td>
          </tr>
      </table>
    </FormItem>
    <FormItem label="职业限制" prop="form">
      <CheckboxGroup v-model="fruit">
          <Checkbox label="年"></Checkbox>
          <Checkbox label="半年"></Checkbox>
          <Checkbox label="季"></Checkbox>
          <Checkbox label="月"></Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem label="附加险" prop="shortName">
      <Select v-model="model1" style="width:200px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </FormItem>
    <FormItem label="附加规则" prop="shortName">
    </FormItem>
  </Form>
</template>

<script>
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
  data() {
    return {
      form: Object.assign({}, defaultForm)
    }
  },
}
</script>

