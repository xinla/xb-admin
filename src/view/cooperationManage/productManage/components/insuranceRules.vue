<template>
  <Form ref="form" :model="form" :rules="rules" :label-width="80">
    <FormItem label="年龄限制">
      <InputNumber :min="0" :max="120" v-model="form.applicationAgeStart" placeholder="年龄限制启始"></InputNumber>周岁 至
      <InputNumber
        :min="form.applicationAgeStart"
        :max="120"
        v-model="form.applicationAgeEnd"
        placeholder="年龄限制结束"
      ></InputNumber>周岁
      0岁填写
      <InputNumber :min="0" :max="366" v-model="form.applicationAgeDay" placeholder="出生多少天"></InputNumber>天
    </FormItem>

    <FormItem label="续保年龄" prop="renewalAge">
      <InputNumber :min="0" :max="120" v-model="form.renewalAge" placeholder="续保年龄"></InputNumber>周岁
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
      <span class="tip">（请输入0-6之间的数字）</span>
      <InputNumber :max="6" :min="0" v-model="form.occupationUnderwriting" placeholder="最高风险等级"></InputNumber>
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
        </div>-->
      </div>
      <Select
        v-show="!codeShow && specialOccupationUnderwriting.length"
        v-model="specialOccupationUnderwriting"
        multiple
        style="width:30%"
        :max-tag-count="3"
        @click.native="codeShow = !codeShow"
        @on-change="selectChange"
      >
        <Option
          v-for="(item, index) in specialOccupationUnderwriting"
          :value="item"
          :key="index"
        >{{item}}</Option>
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
      <Dropdown
        v-if="form.basicSumInsuredOptional === 0"
        style="margin-left: 20px"
        @on-click="addRow"
      >
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
              type="number"
              :number="true"
              v-model.trim="form.insuranceFullAmount[index].ruleIntervalValue"
              placeholder="金额"
              @on-blur="handleBlur('insuranceFullAmount', index)"
            />万
          </Checkbox>
        </CheckboxGroup>

        <!--保险计划额添加项 -->
        <CheckboxGroup v-model="insurancePlan">
          <Checkbox :label="index" v-for="(item, index) of form.insurancePlan" :key="index">
            {{character[index]}}档,
            <Input
              class="inline-input"
              type="number"
              :number="true"
              v-model.trim="form.insurancePlan[index].ruleIntervalValue"
              placeholder="计划"
              @on-blur="handleBlur('insurancePlan', index)"
            />万
          </Checkbox>
        </CheckboxGroup>
      </div>
    </FormItem>

    <FormItem label="保额限制">
      <Row v-for="(item, index) of form.minInsured" :key="index">
        <Col span="3">
          <Select v-model="form.minInsured[index].type">
            <Option v-for="(util, unique) of limitType" :value="+unique" :key="unique">{{ util }}</Option>
          </Select>
        </Col>
        <Col style="display:inline-block;text-align: left;">
          <div v-if="form.minInsured[index].type === 1">
            <Input type="text" v-model="form.minInsured[index].clientType" placeholder="金额"/>类（级）客户
          </div>
          <div v-else-if="form.minInsured[index].type === 2">
            <Input type="text" v-model="form.minInsured[index].startAge" placeholder="金额"/>周岁至
            <Input type="text" v-model="form.minInsured[index].endAge" placeholder="金额"/>周岁
          </div>
          <div v-if="form.minInsured[index].type === 3">
            职业风险等级：
            <Input type="text" v-model="form.minInsured[index].occupationalLevel" placeholder="金额"/>
          </div>
          <div v-if="form.minInsured[index].type === 4">
            职业代码：
            <Input type="text" v-model="form.minInsured[index].code" placeholder="金额"/>
          </div>
        </Col>
        <Col span="4">
          最低
          <Input
            type="text"
            style="width:50%;"
            v-model="form.minInsured[index].minInsured"
            placeholder="金额"
          />元
        </Col>
        <Col style="display:inline-block;" v-if="index === form.minInsured.length - 1">
          <Button @click="addRow('minInsured')">新增一行</Button>
        </Col>
      </Row>

      <Row v-for="(item, index) of form.maxInsured" :key="index + 'x'">
        <Col span="3">
          <Select v-model="form.maxInsured[index].type">
            <Option v-for="(util, unique) of limitType" :value="+unique" :key="unique">{{ util }}</Option>
          </Select>
        </Col>
        <Col style="display:inline-block; text-align: left;">
          <div v-if="form.maxInsured[index].type === 1">
            <Input type="text" v-model="form.maxInsured[index].clientType" placeholder="金额"/>类（级）客户
          </div>
          <div v-else-if="form.maxInsured[index].type === 2">
            <Input type="text" v-model="form.maxInsured[index].startAge" placeholder="金额"/>周岁至
            <Input type="text" v-model="form.maxInsured[index].endAge" placeholder="金额"/>周岁
          </div>
          <div v-if="form.maxInsured[index].type === 3">
            职业风险等级：
            <Input type="text" v-model="form.maxInsured[index].occupationalLevel" placeholder="金额"/>
          </div>
          <div v-if="form.maxInsured[index].type === 4">
            职业代码：
            <Input type="text" v-model="form.maxInsured[index].code" placeholder="金额"/>
          </div>
        </Col>
        <Col span="4">
          最高
          <Input
            type="text"
            style="width:50%;"
            v-model="form.maxInsured[index].maxInsured"
            placeholder="金额"
          />元
        </Col>
        <Col style="display:inline-block;" v-if="index === form.maxInsured.length - 1">
          <Button @click="addRow('maxInsured')">新增一行</Button>
        </Col>
      </Row>递增单位
      <Input type="text" v-model="form.incrementalUnit" placeholder="递增单位"/>元
    </FormItem>

    <FormItem label="保险期间">
      <!-- <CheckboxGroup v-model="policyPeriodYear">
        <Checkbox v-for="(item, index) of form.policyPeriodYear" v-if="index === 0" :label="index" :key="index">{{item.ruleIntervalName}}</Checkbox>
      </CheckboxGroup>
      <CheckboxGroup v-model="policyPeriodAge">
        <Checkbox v-for="(item, index) of form.policyPeriodAge" v-if="index === 0" :label="index" :key="index + 'x'">{{item.ruleIntervalName}}</Checkbox>
      </CheckboxGroup>-->
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
          <Checkbox v-for="(item, index) of form.policyPeriodYear" :label="index" :key="index">
            <Input
              class="inline-input"
              type="number"
              :number="true"
              v-model.trim="form.policyPeriodYear[index].ruleIntervalValue"
              placeholder="年数"
              @on-blur="handleBlur('policyPeriodYear', index)"
            />年
          </Checkbox>
        </CheckboxGroup>

        <!--保险年龄添加项 -->
        <CheckboxGroup v-model="policyPeriodAge">
          <Checkbox v-for="(item, index) of form.policyPeriodAge" :label="index" :key="index + 'x'">
            至
            <Input
              class="inline-input"
              type="number"
              :number="true"
              v-model.trim="form.policyPeriodAge[index].ruleIntervalValue"
              placeholder="年龄"
              @on-blur="handleBlur('policyPeriodAge', index)"
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
      </CheckboxGroup>-->
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
              type="number"
              :number="true"
              v-model.trim="form.paymentPeriodYear[index].ruleIntervalValue"
              placeholder="年数"
              @on-blur="handleBlur('paymentPeriodYear', index)"
            />年
          </Checkbox>
        </CheckboxGroup>

        <!--交费年龄添加项 -->
        <CheckboxGroup v-model="paymentPeriodAge">
          <Checkbox v-for="(item, index) of form.paymentPeriodAge" :label="index" :key="index">
            至
            <Input
              class="inline-input"
              type="number"
              :number="true"
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
import {
  getProductRuleByProductId,
  getProductRuleByRuleId,
  addProductRule,
  updateProductRule
} from "@/api/product/rule";
import Editor from "_c/editor";

const defaultForm = {
  productId: "",
  applicationAgeStart: 0,
  applicationAgeEnd: 0,
  applicationAgeDay: 0,
  renewalAge: 0,
  applicationSex: 0,
  occupationUnderwriting: 0,
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
    // {
    //   productId: "",
    //   ruleIntervalType: 2,
    //   ruleIntervalName: "1年",
    //   ruleIntervalValue: 1
    // }
  ],
  policyPeriodAge: [
    // {
    //   productId: "",
    //   ruleIntervalType: 6,
    //   ruleIntervalName: "终身",
    //   ruleIntervalValue: -1
    // }
  ],
  paymentPeriodYear: [],
  paymentPeriodAge: [],
  paymentMethod: [],
  underwritingRulesText: ""
};
const transToArray = [
  "insuranceFullAmount",
  "insurancePlan",
  "policyPeriodYear",
  "policyPeriodAge",
  "paymentPeriodYear",
  "paymentPeriodAge"
];

let oldData = "";

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
      rules: {
        applicationAgeStart: [
          {
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "blur"
          }
        ],
        applicationAgeEnd: [
          {
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "blur"
          }
        ],
        applicationAgeDay: [
          {
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "blur"
          }
        ],
        renewalAge: [
          {
            type: "number",
            type: "number",
            required: true,
            message: "不能为空",
            trigger: "change"
          }
        ],
        applicationSex: [
          {
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "blur"
          }
        ],
        occupationUnderwriting: [
          {
            type: "number",
            required: true,
            message: "不能为空",
            trigger: "change"
          }
        ],
        socialInsuranceLimit: [
          {
            type: "number",
            required: true,
            message: "不能为空",
            trigger: "change"
          }
        ],
        incrementalUnit: [
          {
            type: "number",
            required: true,
            message: "不能为空",
            trigger: "change"
          }
        ],
        basicSumInsuredOptional: [
          {
            type: "number",
            required: true,
            message: "不能为空",
            trigger: "change"
          }
        ],
        specialOccupationUnderwriting: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        paymentMethod: [
          {
            type: "array",
            required: true,
            message: "不能为空",
            trigger: "change"
          }
        ],
        insuranceFullAmount: [
          {
            type: "array",
            required: true,
            message: "不能为空",
            trigger: "change"
          }
        ],
        insurancePlan: [
          {
            type: "array",
            required: true,
            message: "不能为空",
            trigger: "change"
          }
        ],
        minInsured: [
          {
            type: "array",
            required: true,
            message: "不能为空",
            trigger: "change"
          }
        ],
        maxInsured: [
          {
            type: "array",
            required: true,
            message: "不能为空",
            trigger: "change"
          }
        ],
        policyPeriodYear: [
          {
            type: "array",
            required: true,
            message: "不能为空",
            trigger: "change"
          }
        ],
        policyPeriodAge: [
          {
            type: "array",
            required: true,
            message: "不能为空",
            trigger: "change"
          }
        ],
        paymentPeriodYear: [
          {
            type: "array",
            required: true,
            message: "不能为空",
            trigger: "change"
          }
        ],
        paymentPeriodAge: [
          {
            type: "array",
            required: true,
            message: "不能为空",
            trigger: "change"
          }
        ],
        underwritingRulesText: [
          { required: true, message: "不能为空", trigger: "blur" }
        ]
      },
      insuranceFullAmount: [],
      insurancePlan: [],
      policyPeriodYear: [],
      policyPeriodAge: [],
      paymentPeriodYear: [],
      paymentPeriodAge: [],
      codeShow: false,
      specialOccupationUnderwriting: [],
      disabled: true,
      character: {
        0: "一",
        1: "二",
        2: "三",
        3: "四",
        4: "五",
        5: "六",
        6: "七",
        7: "八",
        8: "九",
        9: "十"
      }
    };
  },
  mounted() {
    this.form.productId = this.$route.query.id;
    // console.log(this.form.productId)
    // this.form.productId || (this.form.productId = this.$route.query.id)
    this.init();
  },
  methods: {
    init() {
      this.$refs.editor.setHtml("");
      this.getData();
    },
    getData() {
      this.form.productId &&
        getProductRuleByProductId(this.form.productId).then(data => {
          // console.log(data);
          this.form = data;

          let del = ["minInsured", "maxInsured"];
          for (const val of del) {
            this.form[val] = JSON.parse(this.form[val]);
            if (this.disabled && !this.form[val].length) {
              this.form[val].push({});
            }
          }
          // paymentMethod字符串数组转为数组
          this.form["paymentMethod"] = this.form["paymentMethod"].split(",");

          // 特殊职业代理数组显示转换
          this["specialOccupationUnderwriting"] = this.form[
            "specialOccupationUnderwriting"
          ].split(",");

          // 多选框代理数组
          for (const iterator of transToArray) {
            this[iterator] = [];
            for (let i = 0; i < this.form[iterator].length; i++) {
              this[iterator].push(i);
            }
          }
          // 设置富文本内容
          this.$refs.editor.setHtml(this.form.underwritingRulesText);
        });
    },
    addRow(type) {
      // debugger
      let len = this.form[type].length;
      if (!len || Object.keys(this.form[type][len - 1]).length) {
        this.form[type].push({});
      }
    },
    handleChange(html, text) {
      // console.log(html, text);
      this.form.underwritingRulesText = html;
      // console.log(this.form.underwritingRulesText)
    },
    handleBlur(type, index) {
      let temp = this.form[type][index];
      if (temp.ruleIntervalValue) {
        this[type].push(index);
        // console.log(typeof temp.ruleIntervalValue)
      } else {
        if (this[type].includes(index)) {
          this[type].splice(this[type].indexOf(index), 1);
        }
        // 中间减掉，后续数据索引-1补上
        this[type].forEach((element, unique) => {
          if (element > index) {
            this[type][unique] = --element;
          }
        });
        // console.log(this[type])
        this[type].splice(); // 强制触发checkbox dom更新 不可删除
        this.form[type].splice(index, 1);
      }
      if (type === "insuranceFullAmount") {
        temp.ruleIntervalName = temp.ruleIntervalValue + "万";
        temp.ruleIntervalType = 1;
      } else if (type === "insurancePlan") {
        temp.ruleIntervalType = 5;
      } else if (type === "policyPeriodYear") {
        temp.ruleIntervalName = temp.ruleIntervalValue + "年";
        temp.ruleIntervalType = 2;
      } else if (type === "policyPeriodAge") {
        temp.ruleIntervalName = "至" + temp.ruleIntervalValue + "周岁";
        temp.ruleIntervalType = 6;
      } else if (type === "paymentPeriodYear") {
        temp.ruleIntervalName = temp.ruleIntervalValue + "年";
        temp.ruleIntervalType = 3;
      } else if (type === "paymentPeriodAge") {
        temp.ruleIntervalName = "至" + temp.ruleIntervalValue + "周岁";
        temp.ruleIntervalType = 4;
      }
    },
    submit() {
      // console.log(this.form.insuranceFullAmount)
      this.form.productId = this.$route.query.id;
      // console.log('productId', this.form.productId)
      return this.$refs.form
        .validate()
        .then(data => {
          if (data) {
            // 剔除保额限制maxInsured，minInsured中的空对象
            let del = ["minInsured", "maxInsured"];
            for (const val of del) {
              let tempArr = [...this.form[val]];
              for (const iterator of tempArr) {
                // debugger
                if (iterator.type === undefined) {
                  this.form[val].splice(this.form[val].indexOf(iterator), 1);
                }
              }
            }

            let formData = Object.assign({}, this.form);

            // checkbox和input混合的选项，提取checkbox实际选择的数据
            for (const agency of transToArray) {
              let temp = [];
              for (const index of this[agency]) {
                // debugger
                formData[agency][index].productId = formData.productId;
                if (agency === "insurancePlan") {
                  formData[agency][index].ruleIntervalName = index + 1;
                }
                temp.push(formData[agency][index]);
              }
              formData[agency] = temp;
            }

            let isNew = oldData !== JSON.stringify(formData);
            oldData = JSON.stringify(formData);
            // 过滤重复提交(暂废弃)
            if (true) {
              // 数组字段转字符串
              formData["paymentMethod"] += "";
              formData["specialOccupationUnderwriting"] = formData[
                "specialOccupationUnderwriting"
              ].replace(/ /g, ",");
              // console.log('formData', formData)
              if (formData.id) {
                // console.log(1)
                return updateProductRule(formData);
              } else {
                return addProductRule(formData);
              }
            } else {
              return Promise.resolve();
            }
          } else {
            return Promise.reject();
          }
        })
        .then(() => {
          this.getData();
          return Promise.resolve();
        });
    },
    transCode() {
      if (this.form.specialOccupationUnderwriting) {
        this.specialOccupationUnderwriting = this.form.specialOccupationUnderwriting.split(
          " "
        );
      }
      this.codeShow = false;
      // console.log(this.specialOccupationUnderwriting)
    },
    selectChange() {
      this.form.specialOccupationUnderwriting = this.specialOccupationUnderwriting.join(
        " "
      );
      // console.log(this.form.specialOccupationUnderwriting)
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-select {
  width: 80%;
}
.ivu-input-wrapper,
.ivu-input-number {
  width: 100px;
  margin: 0 10px;
}
.ivu-btn {
  margin: 0 10px;
}
.tip {
  color: #f40;
}
</style>

