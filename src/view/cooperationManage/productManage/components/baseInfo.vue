<template>
  <Form ref="form" :model="form" :label-width="120">
    <Row>
        <Col span="12">
          <FormItem label="产品全称" prop="form">
              <Input type="text" v-model="form.fullName" placeholder="供应商名称"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="产品简称" prop="shortName">
              <Input type="text" v-model="form.shortName" placeholder="供应商简称"/>
          </FormItem>
        </Col>
    </Row>
    <Row>
        <Col span="12">
          <FormItem label="产品代码" prop="form">
              <Input type="text" v-model="form.fullName" placeholder="产品代码"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="所属供应商" prop="shortName">
            <Select v-model="model1" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
    </Row>
    
    <FormItem label="主附险" prop="site">
        <RadioGroup v-model="animal">
            <Radio label="金斑蝶"></Radio>
            <Radio label="爪哇犀牛"></Radio>
            <Radio label="印度黑羚"></Radio>
        </RadioGroup>
    </FormItem>
    <FormItem label="分销渠道" prop="website">
        <CheckboxGroup v-model="fruit">
        <Checkbox label="香蕉"></Checkbox>
        <Checkbox label="苹果"></Checkbox>
        <Checkbox label="西瓜"></Checkbox>
    </CheckboxGroup>
    </FormItem>
    <FormItem label="在线投保" prop="mobile">
        <CheckboxGroup v-model="fruit">
        <Checkbox label="现保科技 APP"></Checkbox>
        <br>
        <Checkbox label="Web 网址：">
          Web 网址：
          <Input type="text" v-model="form.fullName" placeholder="供应商名称"/>
        </Checkbox>
        <br>
        <Checkbox label="小程序：">
          小程序：
          <Input type="text" v-model="form.fullName" placeholder="供应商名称"/>
        </Checkbox>
        <br>
        <Checkbox label="供应商 APP：">
          供应商 APP：
          <Input type="text" v-model="form.fullName" placeholder="供应商名称"/>
        </Checkbox>
    </CheckboxGroup>
    </FormItem>
    <FormItem label="险种类型" prop="shortName">
        <CheckboxGroup v-model="fruit">
            <Checkbox label="香蕉"></Checkbox>
            <Checkbox label="苹果"></Checkbox>
            <Checkbox label="西瓜"></Checkbox>
        </CheckboxGroup>
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
      form: Object.assign({}, defaultForm),
      animal: '',
      fruit: ''
    }
  },
  methods: {
    submit() {
      this.$router.push({name: 'supplierManage'})
    }
  }
}
</script>

<style lang="less" scoped>

</style>
