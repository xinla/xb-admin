<template>
  <Form ref="form" :model="form" :label-width="120">
    <FormItem label="产品全称" prop="form">
        <Input type="text" style="width:100px;" v-model="form.fullName" placeholder="供应商名称"/>周岁 至 
        <Input type="text" style="width:100px;" v-model="form.fullName" placeholder="供应商名称"/>周岁
        0岁填写
<Input type="text" style="width:100px;" v-model="form.fullName" placeholder="供应商名称"/>天
    </FormItem>

    <FormItem label="续保年龄" prop="form">
        <Input type="text" style="width:100px;" v-model="form.fullName" placeholder="续保年龄"/>周岁
    </FormItem>

    <FormItem label="性别限制" prop="site">
        <RadioGroup v-model="animal">
            <Radio label="不限性别"></Radio>
            <Radio label="仅限男性"></Radio>
            <Radio label="仅限女性"></Radio>
        </RadioGroup>
    </FormItem>

    <FormItem label="职业限制" prop="form">
        最高职业风险等级<Input type="text" style="width:100px;" v-model="form.fullName" placeholder="续保年龄"/>
        <span>添加特殊限制职业</span>
        <div>
          限制投保职业代码
          <Input type="text" style="width:100px;" v-model="form.fullName" placeholder="续保年龄"/>
        </div>
    </FormItem>

    <FormItem label="社保限制" prop="site">
        <RadioGroup v-model="animal">
            <Radio label="不限社保"></Radio>
            <Radio label="有社保"></Radio>
            <Radio label="无社保"></Radio>
        </RadioGroup>
    </FormItem>

    <FormItem label="基本保额" prop="site">
        可自选<Switch v-model="animal" @on-change="change" />
        <Dropdown style="margin-left: 20px">
            <Button type="primary">
                添加选项
                <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
                <DropdownItem>保险金额</DropdownItem>
                <DropdownItem>保险计划</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <div>
          <!--添加项 -->
        </div>
    </FormItem>

    <FormItem label="保额限制" prop="site">
        <Row>
          <Col span="3">
            <Select v-model="model1" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="3">
          最低
          <Input type="text" style="width:100px;" v-model="form.fullName" placeholder="续保年龄"/>
          元
          </Col span="3">
          <Col>
          新增一行
          </Col>
        </Row>
        <Row>
          <Col span="3">
            <Select v-model="model1" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="3">
          最低
          <Input type="text" style="width:100px;" v-model="form.fullName" placeholder="续保年龄"/>
          元
          </Col span="3">
          <Col>
          新增一行
          </Col>
        </Row>
        递增单位
        <Input type="text" style="width:100px;" v-model="form.fullName" placeholder="续保年龄"/>
          元
    </FormItem>

    <FormItem label="保险期间" prop="form">
      <CheckboxGroup v-model="fruit">
          <Checkbox label="终身"></Checkbox>
          <Checkbox label="年"></Checkbox>
      </CheckboxGroup>
      <Dropdown style="margin-left: 20px">
            <Button type="primary">
                添加选项
                <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
                <DropdownItem>年数</DropdownItem>
                <DropdownItem>年龄</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <div>
          <!--添加项 -->
        </div>
    </FormItem>

    <FormItem label="交费期间" prop="form">
      <CheckboxGroup v-model="fruit">
          <Checkbox label="1年"></Checkbox>
      </CheckboxGroup>
      <Dropdown style="margin-left: 20px">
            <Button type="primary">
                添加选项
                <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
                <DropdownItem>年数</DropdownItem>
                <DropdownItem>年龄</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <div>
          <!--添加项 -->
        </div>
    </FormItem>

    <FormItem label="交费方式" prop="form">
      <CheckboxGroup v-model="fruit">
          <Checkbox label="年"></Checkbox>
          <Checkbox label="半年"></Checkbox>
          <Checkbox label="季"></Checkbox>
          <Checkbox label="月"></Checkbox>
      </CheckboxGroup>
    </FormItem>

    <Tabs value="name1">
        <TabPane label="风险保额" name="name1">风险保额的内容</TabPane>
        <TabPane label="体检规则" name="name2">体检规则的内容</TabPane>
        <TabPane label="财务核保" name="name3">财务核保的内容</TabPane>
    </Tabs>
    
    <div>投保规则文本</div>
    <editor ref="editor" :value="content" @on-change="handleChange"/>

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

