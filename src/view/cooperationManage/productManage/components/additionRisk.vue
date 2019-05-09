<template>
  <Form ref="form" :model="form" :label-width="120">
    <div>添加附加险</div>
    <Select
        v-model="model13"
        filterable
        remote
        :remote-method="remoteMethod1"
        :loading="loading1">
        <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
    </Select>
    <Row>
      <Col span="3">
      产品代码
      </Col>
      <Col span="4">
      产品名称
      </Col>
      <Col span="10">
      附加规则
      </Col>
    </Row>

    <Row>
      <Col span="3">
      产品代码
      </Col>
      <Col span="4">
      产品名称
      </Col>
      <Col span="10">
        <Form ref="form" :model="form" :label-width="120">
          <FormItem label="强制搭配险种" prop="site">
              <RadioGroup v-model="animal">
                  <Radio label="无"></Radio>
              </RadioGroup>
          </FormItem>
          <span>添加</span>
          <FormItem label="搭配比例" prop="site">
              <RadioGroup v-model="animal">
                  <Radio label="无"></Radio>
                  <Radio label="固定"></Radio>
                  <Radio label="不固定"></Radio>
              </RadioGroup>
          </FormItem>
          固定比例：<Input type="text" style="width:100px;" v-model="form.fullName" placeholder="续保年龄"/>
          最高比例：<Input type="text" style="width:100px;" v-model="form.fullName" placeholder="续保年龄"/>

          <FormItem label="保险金额限制" prop="site">
              <RadioGroup v-model="animal">
                  <Radio label="无"></Radio>
                  <Radio label="有"></Radio>
              </RadioGroup>
          </FormItem>
          最高限额：<Input type="text" style="width:100px;" v-model="form.fullName" placeholder="续保年龄"/>
        </Form>
      </Col>
    </Row>
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

