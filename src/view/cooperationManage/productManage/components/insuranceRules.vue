<template>
  <Form ref="form" :model="form" :label-width="80">
    <FormItem label="年龄限制">
      <InputNumber v-model="form.applicationAgeStart" placeholder="年龄限制启始"></InputNumber>周岁 至
      <InputNumber v-model="form.applicationAgeEnd" placeholder="年龄限制结束"></InputNumber>周岁
      0岁填写
      <InputNumber v-model="form.applicationAgeDay" placeholder="出生多少天"></InputNumber>天
    </FormItem>

    <FormItem label="续保年龄" prop="renewalAge">
      <InputNumber v-model="form.renewalAge" placeholder="续保年龄"></InputNumber>周岁
    </FormItem>

    <FormItem label="性别限制" prop="applicationSex">
      <RadioGroup v-model="form.applicationSex">
        <Radio :label="0">不限性别</Radio>
        <Radio :label="1">仅限男性</Radio>
        <Radio :label="2">仅限女性</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem label="职业限制">
      最高职业风险等级
      <InputNumber v-model="form.occupationUnderwriting" placeholder="最高风险等级"></InputNumber>
      <Button @click="codeShow = !codeShow">添加特殊限制职业</Button>
      <div v-show="codeShow">
        限制投保职业代码（多个以空格分开）
        <Input
          type="text"
          v-model="form.specialOccupationUnderwriting"
          placeholder="限制投保职业代码，多个以空格分开"
          style="width:30%"
          @on-blur="transCode"
        />
        <!-- <div>
          <Tag color="cyan">cyan</Tag>
        </div> -->
      </div>
      <Select v-show="!codeShow && specialOccupationUnderwriting.length" v-model="specialOccupationUnderwriting" multiple style="width:30%" :max-tag-count="3" @click.native="codeShow = !codeShow">
        <Option v-for="(item, index) in specialOccupationUnderwriting" :value="item" :key="index">{{item}}</Option>
      </Select>
    </FormItem>

    <FormItem label="社保限制" prop="socialInsuranceLimit">
      <RadioGroup v-model="form.socialInsuranceLimit">
        <Radio :label="0">不限社保</Radio>
        <Radio :label="1">有社保</Radio>
        <Radio :label="2">无社保</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem label="基本保额" prop="basicSumInsuredOptional">
      <RadioGroup v-model="form.basicSumInsuredOptional">
        <Radio :label="0">可自选</Radio>
        <Radio :label="1">不可自选</Radio>
      </RadioGroup>
      <Dropdown style="margin-left: 20px" @on-click="addRow">
        <Button type="primary">
          添加选项
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="insuranceFullAmount">保险金额</DropdownItem>
          <DropdownItem name="insurancePlan">保险计划</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div>
        <!--保险金额添加项 -->
        <CheckboxGroup v-model="insuranceFullAmount">
          <Checkbox v-for="(item, index) of form.insuranceFullAmount" :label="index" :key="index">
            <Input
              class="inline-input"
              type="text"
              v-model.trim="form.insuranceFullAmount[index].ruleIntervalValue"
              placeholder="金额"
              @on-blur="handleBlur('insuranceFullAmount', index)"
            />万
          </Checkbox>
        </CheckboxGroup>

        <!--保险计划额添加项 -->
        <CheckboxGroup v-model="insurancePlan">
          <Checkbox :label="index" v-for="(item, index) of form.insurancePlan" :key="index">
            <Input
              class="inline-input"
              type="text"
              v-model.trim="form.insurancePlan[index].ruleIntervalValue"
              placeholder="计划"
              @on-blur="handleBlur('insurancePlan', index)"
            />
          </Checkbox>
        </CheckboxGroup>
      </div>
    </FormItem>

    <FormItem label="保额限制">
      <Row v-for="(item, index) of form.minInsured" :key="index">
        <Col span="4">
          <Select v-model="form.minInsured[index].type">
            <Option v-for="(item, index) in limitType" :value="+index" :key="index">{{ item }}</Option>
          </Select>
        </Col>
        <Col span="4">
          最低
          <Input type="text" style="width:50%;" v-model="form.minInsured[index].minInsured" placeholder="金额"/>元
        </Col>
        <Col span="3">
          <Button @click="addRow('minInsured')">新增一行</Button>
        </Col>
      </Row>

      <Row v-for="(item, index) of form.maxInsured" :key="index + 'x'">
        <Col span="4">
          <Select v-model="form.maxInsured[index].type">
            <Option v-for="(item, index) in limitType" :value="+index" :key="index">{{ item }}</Option>
          </Select>
        </Col>
        <Col span="4">
          最高
          <Input type="text" style="width:50%;" v-model="form.maxInsured[index].maxInsured" placeholder="金额"/>元
        </Col>
        <Col span="3">
          <Button @click="addRow('maxInsured')">新增一行</Button>
        </Col>
      </Row>递增单位
      <Input type="text" v-model="form.incrementalUnit" placeholder="递增单位"/>元
    </FormItem>

    <FormItem label="保险期间">
      <CheckboxGroup v-model="policyPeriodYear">
        <Checkbox v-for="(item, index) of form.policyPeriodYear" v-if="index === 0" :label="index" :key="index">{{item.ruleIntervalName}}</Checkbox>
      </CheckboxGroup>
      <CheckboxGroup v-model="policyPeriodAge">
        <Checkbox v-for="(item, index) of form.policyPeriodAge" v-if="index === 0" :label="index" :key="index + 'x'">{{item.ruleIntervalName}}</Checkbox>
      </CheckboxGroup>
      <Dropdown style="margin-left: 20px" @on-click="addRow">
        <Button type="primary">
          添加选项
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="policyPeriodYear">年数</DropdownItem>
          <DropdownItem name="policyPeriodAge">年龄</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div>
        <!--保险年数添加项 -->
        <CheckboxGroup v-model="policyPeriodYear">
          <Checkbox v-for="(item, index) of form.policyPeriodYear" v-if="index > 0" :label="index" :key="index">
            <Input
              class="inline-input"
              type="text"
              v-model.trim="form.policyPeriodYear[index].ruleIntervalValue"
              placeholder="年数"
              @on-blur="handleBlur('policyPeriodYear', index)"
            />年
          </Checkbox>
        </CheckboxGroup>

        <!--保险年龄添加项 -->
        <CheckboxGroup v-model="policyPeriodAge">
          <Checkbox v-for="(item, index) of form.policyPeriodAge" v-if="index > 0" :label="index + 1" :key="index + 'x'">
            至<Input
              class="inline-input"
              type="text"
              v-model.trim="form.policyPeriodAge[index + 1].ruleIntervalValue"
              placeholder="年龄"
              @on-blur="handleBlur('policyPeriodAge', index + 1)"
            />周岁
          </Checkbox>
        </CheckboxGroup>
      </div>
    </FormItem>

    <FormItem label="交费期间">
      <!-- <CheckboxGroup v-model="paymentPeriodYear">
        <Checkbox v-for="(item, index) of form.paymentPeriodYear" :label="item.ruleIntervalValue" :key="index">{{item.ruleIntervalName}}</Checkbox>
      </CheckboxGroup>
      <CheckboxGroup v-model="paymentPeriodAge">
        <Checkbox v-for="(item, index) of form.paymentPeriodAge" :label="item.ruleIntervalValue" :key="index">{{item.ruleIntervalName}}</Checkbox>
      </CheckboxGroup> -->
      <Dropdown style="margin-left: 20px" @on-click="addRow">
        <Button type="primary">
          添加选项
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="paymentPeriodYear">年数</DropdownItem>
          <DropdownItem name="paymentPeriodAge">年龄</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div>
        <!--交费年数添加项 -->
        <CheckboxGroup v-model="paymentPeriodYear">
          <Checkbox v-for="(item, index) of form.paymentPeriodYear" :label="index" :key="index">
            <Input
              class="inline-input"
              type="text"
              v-model.trim="form.paymentPeriodYear[index].ruleIntervalValue"
              placeholder="年数"
              @on-blur="handleBlur('paymentPeriodYear', index)"
            />年
          </Checkbox>
        </CheckboxGroup>

        <!--交费年龄添加项 -->
        <CheckboxGroup v-model="paymentPeriodAge">
          <Checkbox v-for="(item, index) of form.paymentPeriodAge" :label="index" :key="index">
            至<Input
              class="inline-input"
              type="text"
              v-model.trim="form.paymentPeriodAge[index].ruleIntervalValue"
              placeholder="年龄"
              @on-blur="handleBlur('paymentPeriodAge', index)"
            />周岁
          </Checkbox>
        </CheckboxGroup>
      </div>
    </FormItem>

    <FormItem label="交费方式" prop="paymentMethod">
      <CheckboxGroup v-model="form.paymentMethod">
        <Checkbox label="年交"></Checkbox>
        <Checkbox label="半年交"></Checkbox>
        <Checkbox label="季交"></Checkbox>
        <Checkbox label="月交"></Checkbox>
      </CheckboxGroup>
    </FormItem>

    <Tabs value="name1">
      <TabPane label="风险保额" name="name1">风险保额的内容</TabPane>
      <TabPane label="体检规则" name="name2">体检规则的内容</TabPane>
      <TabPane label="财务核保" name="name3">财务核保的内容</TabPane>
    </Tabs>

    <div>投保规则文本</div>
    <editor ref="editor" :value="form.underwritingRulesText" @on-change="handleChange"/>
  </Form>
</template>

<script>
import Editor from "_c/editor";

const defaultForm = {
  productId: "",
  applicationAgeStart: undefined,
  applicationAgeEnd: undefined,
  applicationAgeDay: undefined,
  renewalAge: undefined,
  applicationSex: 0,
  occupationUnderwriting: undefined,
  specialOccupationUnderwriting: "",
  socialInsuranceLimit: 0,
  basicSumInsuredOptional: 0,
  insuranceFullAmount: [],
  insurancePlan: [],
  minInsured: [
    {
      type: 0,
      minInsured: 0
    }
  ],
  maxInsured: [
    {
      type: 0,
      maxInsured: 0
    }
  ],
  incrementalUnit: "",
  policyPeriodYear: [
    {
      ruleIntervalType: 2,
      ruleIntervalName: '1年',
      ruleIntervalValue: 1,
    }
  ],
  policyPeriodAge: [
    {
      ruleIntervalType: 6,
      ruleIntervalName: '终身',
      ruleIntervalValue: -1,
    }
  ],
  paymentPeriodYear: [],
  paymentPeriodAge: [],
  paymentMethod: [],
  underwritingRulesText: "",
};

export default {
  components: {
    Editor
  },
  data() {
    return {
      form: Object.assign({}, defaultForm),
      limitType: Object.freeze({
        0: "无条件限制",
        1: "按客户类型",
        2: "按年龄",
        3: "按职业风险等级",
        4: "按职业内容"
      }),
      insuranceFullAmount: [],
      insurancePlan: [],
      policyPeriodYear: [],
      policyPeriodAge: [],
      paymentPeriodYear: [],
      paymentPeriodAge: [],
      codeShow: false,
      specialOccupationUnderwriting: []
    };
  },
  methods: {
    addRow(type) {
      this.form[type].push({});
    },
    change() {},
    handleChange() {},
    handleBlur(type, index) {
      let temp = this.form[type][index]
      if (temp.ruleIntervalValue) {
        this[type].push(index)
      } else if (this[type].includes(index)) {
        this[type].splice(this[type].indexOf(index), 1)
        this.form[type].splice(index, 1)
      }
      if (type === 'insuranceFullAmount') {
        temp.ruleIntervalName = temp.ruleIntervalValue + '万'
        temp.ruleIntervalType = 1
      } else if (type === 'insurancePlan') {
        temp.ruleIntervalName = temp.ruleIntervalValue + '万'
        temp.ruleIntervalType = 5
      } else if (type === 'policyPeriodYear') {
        temp.ruleIntervalName = temp.ruleIntervalValue + '年'
        temp.ruleIntervalType = 2
      } else if (type === 'policyPeriodAge') {
        temp.ruleIntervalName = '至' + temp.ruleIntervalValue + '周岁'
        temp.ruleIntervalType = 6
      } else if (type === 'paymentPeriodYear') {
        temp.ruleIntervalName = temp.ruleIntervalValue + '年'
        temp.ruleIntervalType = 3
      } else if (type === 'paymentPeriodAge') {
        temp.ruleIntervalName = '至' + temp.ruleIntervalValue + '周岁'
        temp.ruleIntervalType = 4
      }
    },
    submit() {
      console.log(this.form.insuranceFullAmount)
      return;
    },
    transCode() {
      this.specialOccupationUnderwriting = this.form.specialOccupationUnderwriting.split(' ')
      this.codeShow = false
      // console.log(this.specialOccupationUnderwriting)
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-select {
  width: 70%;
}
.ivu-input-wrapper, .ivu-input-number {
  width: 100px;
  margin: 0 10px;
}
</style>

