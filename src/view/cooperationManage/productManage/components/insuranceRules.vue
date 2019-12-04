<style lang="less" scoped>
.title-wrap {
  padding: 15px 20px;
  background: #e0effd;
  line-height: 25px;
  .title {
    font-size: 16px;
    font-weight: 600;
    margin-right: 30px;
  }
  .button {
    margin-right: 10px;
    line-height: 1;
  }
}
.anchor {
  display: block;
  padding: 15px 0;
  color: #fff;
  margin: 0 30px 10px 0;
  cursor: pointer;
  background: #fff;
  color: #444;
}
.current {
  background: #2d8cf0;
  color: #fff;
}
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

.box {
  border-bottom: 20px solid #f5f7f9;
}

/deep/.ivu-form-item .ivu-form-item-label {
  font-size: 15px;
  // font-weight: 600;
}
/deep/.ivu-form-item .ivu-form-item .ivu-form-item-label {
  width: 125px !important;
  text-align: left;
  color: #aaa;
  font-size: 14px;
}
/deep/.ivu-form-item .ivu-form-item .ivu-form-item-content {
  line-height: 35px;
  margin-left: 125px !important;
}
/deep/.ivu-form-item .ivu-form-item {
  margin-right: 50px;
  // display: flex;
}
</style>
<template>
  <div>
    <Row style="height: 100%;">
      <Col span="4">
        <div class="anchor-wrap ac">
          <span
            :class="['anchor', {current: anchor == 'applicant'}]"
            @click="goPosition('applicant')"
          >投保人规则</span>
          <span
            :class="['anchor', {current: anchor == 'insurance'}]"
            @click="goPosition('insurance')"
          >被保人规则</span>
          <span
            :class="['anchor', {current: anchor == 'coverage'}]"
            @click="goPosition('coverage')"
          >保额规则</span>
          <span
            :class="['anchor', {current: anchor == 'period'}]"
            @click="goPosition('period')"
          >保险期间规则</span>
          <span
            :class="['anchor', {current: anchor == 'payment'}]"
            @click="goPosition('payment')"
          >交费规则</span>
          <span
            :class="['anchor', {current: anchor == 'receive'}]"
            @click="goPosition('receive')"
          >领取规则</span>
        </div>
      </Col>

      <Col
        ref="scroll"
        span="20"
        style="background: #fff; position: absolute; right: 0; height: 100%; overflow: auto; transition: all 1s;"
      >
        <!-- 投保人规则 -->
        <div class="box">
          <Form ref="applicationForm" :model="applicationForm" :label-width="100">
            <div ref="applicant" class="title-wrap bfc-o">
              <span class="title">投保人规则</span>
              <Checkbox v-model="applicationForm.confine" :true-value="0" :false-value="1">无限制</Checkbox>
              <div class="button-wrap fr">
                <Button class="button" @click="submit('applicationForm')">保存</Button>
                <Button class="button" @click="clear('applicationForm')">清空</Button>
              </div>
            </div>

            <div class="form-wrap" v-show="applicationForm.confine">
              <FormItem label="年龄限制">
                <div v-if="true">
                  <Row>
                    <Col span="12">
                      <FormItem label="投保年龄限制">
                        <InputNumber
                          :min="0"
                          :max="120"
                          v-model="applicationForm.applicationAgeStart"
                          placeholder="启始年龄限制"
                        ></InputNumber>周岁 至
                        <InputNumber
                          :min="0"
                          :max="120"
                          v-model="applicationForm.applicationAgeEnd"
                          placeholder="结束年龄限制"
                        ></InputNumber>周岁
                      </FormItem>
                    </Col>
                    <Col span="10">
                      <FormItem label="新生儿限制">
                        出生天数不低于
                        <InputNumber
                          :min="0"
                          :max="366"
                          v-model="applicationForm.applicationAgeDay"
                          placeholder="出生多少天"
                        ></InputNumber>天
                      </FormItem>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col span="10">
                      <FormItem label="续保年龄限制" prop="renewalAge">
                        最大可续保至
                        <InputNumber
                          :min="0"
                          :max="120"
                          v-model="applicationForm.renewalAge"
                          placeholder="输入年龄"
                        ></InputNumber>周岁
                      </FormItem>
                    </Col>
                    <Col span="10">
                      <FormItem label="交费期满年龄限制">
                        最大年龄至
                        <InputNumber
                          :min="0"
                          :max="120"
                          v-model="applicationForm.payAgeMax"
                          placeholder="输入年龄"
                        ></InputNumber>周岁
                      </FormItem>
                    </Col>
                  </Row>
                </div>
              </FormItem>

              <FormItem label="性别限制" prop="sexLimit">
                <!-- <input type="checkbox" id="jack" value="0" v-model="applicationForm.sexLimit">
                <label for="jack">无限制</label>-->
                <Checkbox v-model="applicationForm.sexLimit" :true-value="0" :false-value="1">无限制</Checkbox>
                <br />
                <RadioGroup v-model="applicationForm.sexLimit" v-show="applicationForm.sexLimit">
                  <Radio :label="1">仅限男性</Radio>
                  <Radio :label="2">仅限女性</Radio>
                </RadioGroup>
              </FormItem>

              <FormItem label="职业限制">
                <Checkbox
                  v-model="applicationForm.professionalLimit"
                  :true-value="0"
                  :false-value="1"
                >无限制</Checkbox>

                <template v-if="applicationForm.professionalLimit">
                  <FormItem label="最高可投保职业">
                    <RadioGroup v-model="applicationForm.professionalGradeLimit">
                      <Radio v-for="(item, index) in 7" :label="item" :key="index">{{item}}类</Radio>
                    </RadioGroup>
                  </FormItem>

                  <FormItem label="特殊职业禁止">
                    <Input
                      type="text"
                      v-show="codeShow.applicationForm || !specialProfessionalLimit.applicationForm.length"
                      v-model="applicationForm.specialProfessionalLimit"
                      placeholder="限制投保职业代码，多个以英文逗号（,）分开"
                      style="width:50%"
                      @on-blur="transCode('applicationForm')"
                    />
                    <Select
                      v-show="!codeShow.applicationForm && specialProfessionalLimit.applicationForm.length"
                      v-model="specialProfessionalLimit.applicationForm"
                      multiple
                      style="width:50%"
                      :max-tag-count="3"
                      @click.native="codeShow.applicationForm = !codeShow.applicationForm"
                      @on-change="selectChange('applicationForm')"
                    >
                      <Option
                        v-for="(item, index) in specialProfessionalLimit.applicationForm"
                        :value="item"
                        :key="index"
                      >{{item}}</Option>
                    </Select>
                  </FormItem>
                </template>
              </FormItem>

              <FormItem label="社保限制" prop="socialInsuranceLimit">
                <Checkbox
                  v-model="applicationForm.socialInsuranceLimit"
                  :true-value="2"
                  :false-value="1"
                >无限制</Checkbox>
                <br />
                <RadioGroup
                  v-model="applicationForm.socialInsuranceLimit"
                  v-show="applicationForm.socialInsuranceLimit"
                >
                  <Radio :label="1">限制有社保</Radio>
                  <Radio :label="0">限制无社保</Radio>
                </RadioGroup>
              </FormItem>

              <FormItem label="支持多被保人" prop="multipleInsurer">
                <Checkbox
                  v-model="applicationForm.multipleInsurer"
                  :true-value="0"
                  :false-value="1"
                >不支持</Checkbox>

                <Row v-show="applicationForm.multipleInsurer">
                  <Col span="10">
                    <FormItem label="被保人数量" prop="insurerNum">
                      <InputNumber
                        :min="0"
                        :max="120"
                        v-model="applicationForm.insurerNum"
                        placeholder="输入数量"
                      ></InputNumber>位
                    </FormItem>
                  </Col>
                  <Col span="10">
                    <FormItem label="关系限制" prop="relationLimit">
                      <CheckboxGroup v-model="applicationForm.relationLimit">
                        <Checkbox
                          v-for="(item, index) in relationClass"
                          :label="String(index)"
                          :key="index"
                        >{{item}}</Checkbox>
                      </CheckboxGroup>
                    </FormItem>
                  </Col>
                </Row>
              </FormItem>
            </div>
          </Form>
        </div>

        <!-- 被保人规则 -->
        <div class="box">
          <Form ref="insuranceForm" :model="insuranceForm" :label-width="100">
            <div ref="insurance" class="title-wrap bfc-o">
              <span class="title">被保人规则</span>
              <Checkbox v-model="insuranceForm.confine" :true-value="0" :false-value="1">无限制</Checkbox>
              <div class="button-wrap fr">
                <Button class="button" @click="submit('insuranceForm')">保存</Button>
                <Button class="button" @click="clear('insuranceForm')">清空</Button>
              </div>
            </div>

            <div class="form-wrap" v-show="insuranceForm.confine">
              <FormItem label="年龄限制">
                <div v-if="true">
                  <Row>
                    <Col span="12">
                      <FormItem label="投保年龄限制">
                        <InputNumber
                          :min="0"
                          :max="120"
                          v-model="insuranceForm.applicationAgeStart"
                          placeholder="启始年龄限制"
                        ></InputNumber>周岁 至
                        <InputNumber
                          :min="0"
                          :max="120"
                          v-model="insuranceForm.applicationAgeEnd"
                          placeholder="结束年龄限制"
                        ></InputNumber>周岁
                      </FormItem>
                    </Col>
                    <Col span="10">
                      <FormItem label="新生儿限制">
                        出生天数不低于
                        <InputNumber
                          :min="0"
                          :max="366"
                          v-model="insuranceForm.applicationAgeDay"
                          placeholder="出生多少天"
                        ></InputNumber>天
                      </FormItem>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col span="10">
                      <FormItem label="续保年龄限制" prop="renewalAge">
                        最大可续保至
                        <InputNumber
                          :min="0"
                          :max="120"
                          v-model="insuranceForm.renewalAge"
                          placeholder="输入年龄"
                        ></InputNumber>周岁
                      </FormItem>
                    </Col>
                    <Col span="10">
                      <FormItem label="交费期满年龄限制">
                        最大年龄至
                        <InputNumber
                          :min="0"
                          :max="120"
                          v-model="insuranceForm.payAgeMax"
                          placeholder="输入年龄"
                        ></InputNumber>周岁
                      </FormItem>
                    </Col>
                  </Row>
                </div>
              </FormItem>

              <FormItem label="性别限制" prop="sexLimit">
                <Checkbox v-model="insuranceForm.sexLimit" :true-value="0" :false-value="1">无限制</Checkbox>
                <br />
                <RadioGroup v-model="insuranceForm.sexLimit" v-show="insuranceForm.sexLimit">
                  <Radio :label="1">仅限男性</Radio>
                  <Radio :label="2">仅限女性</Radio>
                </RadioGroup>
              </FormItem>

              <FormItem label="职业限制">
                <Checkbox
                  v-model="insuranceForm.professionalLimit"
                  :true-value="0"
                  :false-value="1"
                >无限制</Checkbox>

                <template v-if="insuranceForm.professionalLimit">
                  <FormItem label="最高可投保职业">
                    <RadioGroup v-model="insuranceForm.professionalGradeLimit">
                      <Radio v-for="(item, index) in 7" :label="item" :key="index">{{item}}类</Radio>
                    </RadioGroup>
                  </FormItem>

                  <FormItem label="特殊职业禁止">
                    <Input
                      type="text"
                      v-show="codeShow.insuranceForm || !specialProfessionalLimit.insuranceForm.length"
                      v-model="insuranceForm.specialProfessionalLimit"
                      placeholder="限制投保职业代码，多个以英文逗号','分开"
                      style="width:50%"
                      @on-blur="transCode('insuranceForm')"
                    />
                  </FormItem>
                  <Select
                    v-show="!codeShow.insuranceForm && specialProfessionalLimit.insuranceForm.length"
                    v-model="specialProfessionalLimit.insuranceForm"
                    multiple
                    style="width:30%"
                    :max-tag-count="3"
                    @click.native="codeShow.insuranceForm = !codeShow.insuranceForm"
                    @on-change="selectChange('insuranceForm')"
                  >
                    <Option
                      v-for="(item, index) in specialProfessionalLimit.insuranceForm"
                      :value="item"
                      :key="index"
                    >{{item}}</Option>
                  </Select>
                </template>
              </FormItem>

              <FormItem label="社保限制" prop="socialInsuranceLimit">
                <Checkbox
                  v-model="insuranceForm.socialInsuranceLimit"
                  :true-value="2"
                  :false-value="1"
                >无限制</Checkbox>
                <br />
                <RadioGroup
                  v-model="insuranceForm.socialInsuranceLimit"
                  v-show="insuranceForm.socialInsuranceLimit"
                >
                  <Radio :label="1">限制有社保</Radio>
                  <Radio :label="0">限制无社保</Radio>
                </RadioGroup>
              </FormItem>

              <FormItem label="支持多被保人" prop="multipleInsurer">
                <Checkbox
                  v-model="insuranceForm.multipleInsurer"
                  :true-value="0"
                  :false-value="1"
                >不支持</Checkbox>

                <Row v-show="insuranceForm.multipleInsurer">
                  <Col span="10">
                    <FormItem label="被保人数量" prop="insurerNum">
                      <InputNumber
                        :min="0"
                        :max="120"
                        v-model="insuranceForm.insurerNum"
                        placeholder="输入数量"
                      ></InputNumber>位
                    </FormItem>
                  </Col>
                  <Col span="10">
                    <FormItem label="关系限制" prop="relationLimit">
                      <CheckboxGroup v-model="insuranceForm.relationLimit">
                        <Checkbox
                          v-for="(item, index) in relationClass"
                          :label="String(index)"
                          :key="index"
                        >{{item}}</Checkbox>
                      </CheckboxGroup>
                    </FormItem>
                  </Col>
                </Row>
              </FormItem>
            </div>
          </Form>
        </div>

        <!-- 保额规则 -->
        <div class="box">
          <div ref="coverage" class="title-wrap bfc-o">
            <span class="title">保额规则</span>
            <div class="button-wrap fr">
              <Button class="button" @click="submit('coverageForm')">保存</Button>
              <Button class="button" @click="clear('coverageForm')">清空</Button>
            </div>
          </div>

          <Form ref="coverageForm" :model="coverageForm" :label-width="100">
            <FormItem label="一般限制" prop="sexLimit">
              <Checkbox v-model="coverageForm.generalLimit" :true-value="0" :false-value="1">无限制</Checkbox>
              <Row v-if="coverageForm.generalLimit">
                <Col span="8">
                  <FormItem label="最低保额">
                    <InputNumber v-model="coverageForm.minAmount" placeholder="请输入金额"></InputNumber>元
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="最高保额">
                    <InputNumber v-model="coverageForm.maxAmount" placeholder="请输入金额"></InputNumber>元
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="递增单位">
                    <InputNumber v-model="coverageForm.increaseUnit" placeholder="请输入金额"></InputNumber>元
                  </FormItem>
                </Col>
              </Row>
            </FormItem>

            <FormItem label="年龄保额限制">
              <Checkbox v-model="coverageForm.ageLimit" :true-value="0" :false-value="1">无限制</Checkbox>
              <div v-show="coverageForm.ageLimit">
                <Row>
                  <Col span="10" offset="1">
                    <FormItem label="年龄区间"></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="最高保额"></FormItem>
                  </Col>
                </Row>
                <Row v-for="(item, index) in coverageForm.ageContent" :key="index">
                  <Col span="10">
                    <Input type="text" v-model="item.ageBegin" placeholder="请输入" />周岁至
                    <Input type="text" v-model="item.ageEnd" placeholder="请输入" />周岁
                  </Col>
                  <Col span="6">
                    <Input v-model="item.maxAmount" placeholder="请输入金额" />元
                  </Col>
                  <Col span="8">
                    <span
                      class="button-circle"
                      @click="reduce('coverageForm', 'ageContent', index)"
                    >-</span>
                    <span
                      v-if="index == 0"
                      class="button-circle"
                      @click="add('coverageForm', 'ageContent')"
                    >+</span>
                  </Col>
                </Row>
              </div>
            </FormItem>

            <FormItem label="职业类别保额限制">
              <Checkbox
                v-model="coverageForm.professionaltLimit"
                :true-value="0"
                :false-value="1"
              >无限制</Checkbox>
              <div v-show="coverageForm.professionaltLimit">
                <Row>
                  <Col span="6" offset="1">
                    <FormItem label="职业类别"></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="最高保额"></FormItem>
                  </Col>
                </Row>
                <Row v-for="(item, index) in coverageForm.professionalLimitContent" :key="index">
                  <Col span="6">
                    <Input type="text" v-model="item.grade" placeholder="数字" />类
                  </Col>
                  <Col span="6">
                    <InputNumber v-model="item.maxAmount" placeholder="请输入金额"></InputNumber>元
                  </Col>
                  <Col span="8">
                    <span
                      class="button-circle"
                      @click="reduce('coverageForm', 'professionalLimitContent', index)"
                    >-</span>
                    <span
                      v-if="index == 0"
                      class="button-circle"
                      @click="add('coverageForm', 'professionalLimitContent')"
                    >+</span>
                  </Col>
                </Row>
              </div>
            </FormItem>

            <FormItem label="特殊职业保额限制">
              <Checkbox
                v-model="coverageForm.specialProfessionalLimit"
                :true-value="0"
                :false-value="1"
              >无限制</Checkbox>
              <div v-show="coverageForm.specialProfessionalLimit">
                <Row>
                  <Col span="6" offset="1">
                    <FormItem label="职业代码"></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="最高保额"></FormItem>
                  </Col>
                </Row>
                <Row
                  v-for="(item, index) in coverageForm.specialProfessionalLimitContent"
                  :key="index"
                >
                  <Col span="6">
                    <Input type="text" v-model="item.jobCode" placeholder="请输入职业代码" />
                  </Col>
                  <Col span="6">
                    <InputNumber v-model="item.maxAmount" placeholder="请输入金额"></InputNumber>元
                  </Col>
                  <Col span="8">
                    <span
                      class="button-circle"
                      @click="reduce('coverageForm', 'specialProfessionalLimitContent', index)"
                    >-</span>
                    <span
                      v-if="index == 0"
                      class="button-circle"
                      @click="add('coverageForm', 'specialProfessionalLimitContent')"
                    >+</span>
                  </Col>
                </Row>
              </div>
            </FormItem>

            <FormItem label="地区保额限制">
              <Checkbox v-model="coverageForm.areaLimit" :true-value="0" :false-value="1">无限制</Checkbox>
              <div v-show="coverageForm.areaLimit">
                <Row>
                  <Col span="6" offset="1">
                    <FormItem label="地区类型"></FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="最高保额"></FormItem>
                  </Col>
                </Row>
                <Row v-for="(item, index) in coverageForm.areaLimitContent" :key="index">
                  <Col span="6">
                    <Input type="text" v-model="item.areaType" placeholder="请输入地区类型" />
                  </Col>
                  <Col span="8">
                    <Input v-model="item.maxAmount" style="width: 170px;" placeholder="请输入金额">
                      <Select v-model="item.unit" slot="append" style="width: 70px">
                        <Option :value="0">万元</Option>
                        <Option :value="1">元</Option>
                        <Option :value="2">元/天</Option>
                      </Select>
                    </Input>
                  </Col>
                  <Col span="8">
                    <span
                      class="button-circle"
                      @click="reduce('coverageForm', 'areaLimitContent', index)"
                    >-</span>
                    <span
                      v-if="index == 0"
                      class="button-circle"
                      @click="add('coverageForm', 'areaLimitContent')"
                    >+</span>
                  </Col>
                </Row>
              </div>
            </FormItem>

            <FormItem label="保险计划">
              <Checkbox v-model="coverageForm.insurancePlan" :true-value="0" :false-value="1">无</Checkbox>
              <div v-show="coverageForm.insurancePlan">
                <Row>
                  <Col span="4" offset="1">
                    <FormItem label="计划编码"></FormItem>
                  </Col>
                  <Col span="5">
                    <FormItem label="计划名称"></FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="关连"></FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="对应保额"></FormItem>
                  </Col>
                </Row>
                <Row v-for="(item, index) in coverageForm.insurancePlanContent" :key="index">
                  <Col span="4">
                    <Input type="text" v-model="item.code" placeholder="请输入计划编码" />
                  </Col>
                  <Col span="5">
                    <Input type="text" v-model="item.name" placeholder="请输入名称" />
                  </Col>
                  <Col span="6">
                    <Select v-model="item.option" multiple :max-tag-count="1">
                        <Option v-for="(value, key) in planOptionList" :value="key" :key="key">{{value}}</Option>
                      </Select>
                  </Col>
                  <Col span="6">
                    <Input v-model="item.amount" style="width: 170px;" placeholder="请输入金额">
                      <Select v-model="item.unit" slot="append" style="width: 70px">
                        <Option :value="0">万元</Option>
                        <Option :value="1">元</Option>
                        <Option :value="2">元/天</Option>
                      </Select>
                    </Input>
                  </Col>
                  <Col span="3">
                    <span
                      class="button-circle"
                      @click="reduce('coverageForm', 'insurancePlanContent', index)"
                    >-</span>
                    <span
                      v-if="index == 0"
                      class="button-circle"
                      @click="add('coverageForm', 'insurancePlanContent')"
                    >+</span>
                  </Col>
                </Row>
              </div>
            </FormItem>
          </Form>
        </div>

        <!-- 保险期间规则 -->
        <div class="box">
          <div ref="period" class="title-wrap bfc-o">
            <span class="title">保险期间规则</span>

            <Button
              :class="['button', {current: periodType === 0}]"
              @click="periodType = 0"
            >按年</Button>
            <Button
              :class="['button', {current: periodType === 1}]"
              @click="periodType = 1"
            >按天</Button>

            <div class="button-wrap fr" v-show="periodType === 0">
              <Button class="button" @click="submit('periodFormYear')">保存</Button>
              <Button class="button" @click="clear('periodFormYear')">清空</Button>
            </div>
            <div class="button-wrap fr" v-show="periodType === 1">
              <Button class="button" @click="submit('periodFormDay')">保存</Button>
              <Button class="button" @click="clear('periodFormDay')">清空</Button>
            </div>
          </div>

          <Form
            ref="periodFormYear"
            v-show="periodType === 0"
            :model="periodFormYear"
            :label-width="100"
          >
            <FormItem label="保险期间" prop="sexLimit">
              <Checkbox
                v-model="periodFormYear.insurancePeriodYear"
                :true-value="1"
                :false-value="0"
              >年满型</Checkbox>
              <Checkbox
                v-model="periodFormYear.insurancePeriodAge"
                :true-value="1"
                :false-value="0"
              >岁满型</Checkbox>
              <FormItem label="年满型" v-if="periodFormYear.insurancePeriodYear">
                <div
                  class="bfc-d"
                  v-for="(item, index) in periodFormYear.ruleIntevalDtoList"
                  :key="index"
                >
                  <template v-if="item.ruleIntervalType === 1">
                    <Input type="text" v-model="item.ruleIntervalValue" placeholder="输入年数" />年
                    <span class="button-circle" @click="reduce('periodFormYear', 'ruleIntevalDtoList', index)">-</span>
                  </template>
                </div>
                <span
                  class="button-circle"
                  @click="periodFormYear.ruleIntevalDtoList.push({ruleIntervalType: 1})"
                >+</span>
              </FormItem>

              <FormItem label="岁满型" v-if="periodFormYear.insurancePeriodAge">
                <div
                  class="bfc-d"
                  v-for="(item, index) in periodFormYear.ruleIntevalDtoList"
                  :key="index"
                >
                  <template v-if="item.ruleIntervalType === 0">
                    <Input type="text" v-model="item.ruleIntervalValue" placeholder="输入岁数" />岁
                    <span
                      class="button-circle"
                      @click="reduce('periodFormYear', 'ruleIntevalDtoList', index)"
                    >-</span>
                  </template>
                </div>
                <span
                  class="button-circle"
                  @click="periodFormYear.ruleIntevalDtoList.push({ruleIntervalType: 0})"
                >+</span>
              </FormItem>
            </FormItem>

            <FormItem label="保证续保" v-show="periodType === 0">
              <Checkbox v-model="periodFormYear.renewal" :true-value="0" :false-value="1">不支持</Checkbox>
              <FormItem v-if="periodFormYear.renewal" label="保证续保周期" prop="renewalCycle">
                <Input type="text" v-model="periodFormYear.renewalCycle" placeholder="输入年数" />年
              </FormItem>
            </FormItem>
          </Form>

          <Form
            ref="periodFormDay"
            v-show="periodType === 1"
            :model="periodFormDay"
            :label-width="100"
          >
            <FormItem label="保险期间" prop="fixedDay">
              <FormItem label="固定天数">
                <div class="bfc-d" v-for="(item, index) in periodFormDay.fixedDay" :key="index">
                  <Input type="text" v-model.trim="periodFormDay.fixedDay[index]" placeholder="输入天数" />天
                  <span class="button-circle" @click="reduce('periodFormDay', 'fixedDay', index)">-</span>
                </div>
                <span class="button-circle" @click="periodFormDay.fixedDay.push('')">+</span>
              </FormItem>
              <FormItem label="弹性天数">
                <div class="bfc-d" v-for="(item, index) in periodFormDay.elasticDay" :key="index">
                  <Input type="text" v-model.trim="item.begin" placeholder="输入天数" />-
                  <Input type="text" v-model.trim="item.end" placeholder="输入天数" />天
                  <span
                    class="button-circle"
                    @click="reduce('periodFormDay', 'elasticDay', index)"
                  >-</span>
                </div>
                <span class="button-circle" @click="add('periodFormDay', 'elasticDay')">+</span>
              </FormItem>
            </FormItem>
          </Form>
        </div>
        <!-- 交费规则 -->
        <div class="box">
          <div ref="payment" class="title-wrap bfc-o">
            <span class="title">交费规则</span>
            <div class="button-wrap fr">
              <Button class="button" @click="submit('paymentForm')">保存</Button>
              <Button class="button" @click="clear('paymentForm')">清空</Button>
            </div>
          </div>

          <Form ref="paymentForm" :model="paymentForm" :label-width="100">
            <FormItem label="交费方式" prop="payType">
              <CheckboxGroup v-model="paymentForm.payType">
                <Checkbox label="0">年</Checkbox>
                <Checkbox label="1">半年</Checkbox>
                <Checkbox label="2">季</Checkbox>
                <Checkbox label="3">月</Checkbox>
              </CheckboxGroup>
            </FormItem>

            <FormItem label="交费期间">
              <Checkbox v-model="paymentForm.payPeriodYear" :true-value="1" :false-value="0">年满型</Checkbox>
              <Checkbox v-model="paymentForm.payPeriodAge" :true-value="1" :false-value="0">岁满型</Checkbox>
              <FormItem label="年满型" v-if="paymentForm.payPeriodYear">
                <div
                  class="bfc-d"
                  v-for="(item, index) in paymentForm.ruleIntevalDtoList"
                  :key="index"
                >
                  <template v-if="item.ruleIntervalType === 2">
                    <Input type="text" v-model="item.ruleIntervalValue" placeholder="输入年数" />年
                    <span
                      class="button-circle"
                      @click="reduce('paymentForm', 'ruleIntevalDtoList', index)"
                    >-</span>
                  </template>
                </div>
                <span
                  class="button-circle"
                  @click="paymentForm.ruleIntevalDtoList.push({ruleIntervalType: 2})"
                >+</span>
              </FormItem>

              <FormItem label="岁满型" v-if="paymentForm.payPeriodAge">
                <div
                  class="bfc-d"
                  v-for="(item, index) in paymentForm.ruleIntevalDtoList"
                  :key="index"
                >
                  <template v-if="item.ruleIntervalType === 3">
                    <Input type="text" v-model="item.ruleIntervalValue" placeholder="输入岁数" />岁
                    <span
                      class="button-circle"
                      @click="reduce('paymentForm', 'ruleIntevalDtoList', index)"
                    >-</span>
                  </template>
                </div>
                <span
                  class="button-circle"
                  @click="paymentForm.ruleIntevalDtoList.push({ruleIntervalType: 3})"
                >+</span>
              </FormItem>
            </FormItem>

            <FormItem label="保费限制">
              <Checkbox
                v-model="paymentForm.premiumLimitAmount"
                :true-value="1"
                :false-value="0"
              >按金额限制</Checkbox>
              <div v-if="paymentForm.premiumLimitAmount">
                <Row>
                  <Col span="5" offset="1">
                    <FormItem label="交费类型"></FormItem>
                  </Col>
                  <Col span="5">
                    <FormItem label="最低"></FormItem>
                  </Col>
                  <Col span="5">
                    <FormItem label="最高"></FormItem>
                  </Col>
                  <Col span="5">
                    <FormItem label="递增单位"></FormItem>
                  </Col>
                  <Col span="3">
                    <span
                      class="button-circle"
                      @click="add('paymentForm', 'premiumLimitAmountContent')"
                    >+</span>
                  </Col>
                </Row>
                <Row v-for="(item, index) in paymentForm.premiumLimitAmountContent" :key="index">
                  <Col span="5">
                    <Select v-model="item.payType">
                      <Option :value="0">不限制交费类型</Option>
                      <Option :value="1">趸交</Option>
                      <Option :value="2">期间</Option>
                    </Select>
                  </Col>
                  <Col span="5">
                    <Input type="text" v-model="item.min" placeholder="请输入金额" />元
                  </Col>
                  <Col span="5">
                    <Input type="text" v-model="item.max" placeholder="请输入金额" />元
                  </Col>
                  <Col span="5">
                    <Input v-model="item.increaseUnit" placeholder="请输入金额" />元
                  </Col>
                  <Col span="4">
                    <span
                      class="button-circle"
                      @click="reduce('paymentForm', 'premiumLimitAmountContent', index)"
                    >-</span>
                    <!-- <span
                      v-if="index == 0"
                      class="button-circle"
                      @click="add('paymentForm', 'premiumLimitAmountContent')"
                    >+</span>-->
                  </Col>
                </Row>
              </div>

              <Checkbox
                v-model="paymentForm.premiumLimitCopy"
                :true-value="1"
                :false-value="0"
              >按份数限制</Checkbox>
              <div v-if="paymentForm.premiumLimitCopy">
                <Row>
                  <Col span="5" offset="1">
                    <FormItem label="交费类型"></FormItem>
                  </Col>
                  <Col span="5">
                    <FormItem label="最低"></FormItem>
                  </Col>
                  <Col span="5">
                    <FormItem label="最高"></FormItem>
                  </Col>
                  <Col span="5">
                    <FormItem label="递增单位"></FormItem>
                  </Col>
                  <Col span="3">
                    <span
                      class="button-circle"
                      @click="add('paymentForm', 'premiumLimitCopyAmount')"
                    >+</span>
                  </Col>
                </Row>
                <Row v-for="(item, index) in paymentForm.premiumLimitCopyAmount" :key="index">
                  <Col span="5">
                    <Select v-model="item.payType">
                      <Option :value="0">不限制交费类型</Option>
                      <Option :value="1">趸交</Option>
                      <Option :value="2">期间</Option>
                    </Select>
                  </Col>
                  <Col span="5">
                    <Input type="text" v-model="item.min" placeholder="请输入金额" />份
                  </Col>
                  <Col span="5">
                    <Input type="text" v-model="item.max" placeholder="请输入金额" />份
                  </Col>
                  <Col span="5">
                    <Input v-model="item.increaseUnit" placeholder="请输入金额" />份
                  </Col>
                  <Col span="4">
                    <span
                      class="button-circle"
                      @click="reduce('paymentForm', 'premiumLimitCopyAmount', index)"
                    >-</span>
                    <!-- <span
                      v-if="index == 0"
                      class="button-circle"
                      @click="add('paymentForm', 'premiumLimitCopyAmount')"
                    >+</span>-->
                  </Col>
                </Row>
              </div>
            </FormItem>
          </Form>
        </div>
        <!-- 领取规则 -->
        <div class="box">
          <div ref="receive" class="title-wrap bfc-o">
            <span class="title">领取规则</span>
            <div class="button-wrap fr">
              <Button class="button" @click="submit('receiveForm')">保存</Button>
              <Button class="button" @click="clear('receiveForm')">清空</Button>
            </div>
          </div>

          <Form ref="receiveForm" :model="receiveForm" :label-width="100">
            <FormItem label="年金领取年龄" prop="receiveAge">
              <Checkbox v-model="receiveForm.receiveAge" :true-value="0" :false-value="1">不支持</Checkbox>
              <div v-show="receiveForm.receiveAge">
                <Row>
                  <Col span="5" offset="1">
                    <FormItem label="性别"></FormItem>
                  </Col>
                  <Col span="5">
                    <FormItem label="年龄"></FormItem>
                  </Col>
                </Row>
                <Row v-for="(item, index) in receiveForm.receiveAgeContent" :key="index">
                  <Col span="5">
                    <Select v-model="item.sex">
                      <Option :value="0">不限性别</Option>
                      <Option :value="1">男性</Option>
                      <Option :value="2">女性</Option>
                    </Select>
                  </Col>
                  <Col span="5">
                    <Input type="text" v-model="item.age" placeholder="请输入岁" />岁
                  </Col>
                  <Col span="4">
                    <span
                      class="button-circle"
                      @click="reduce('receiveForm', 'receiveAgeContent', index)"
                    >-</span>
                    <span
                      v-if="index == 0"
                      class="button-circle"
                      @click="add('receiveForm', 'receiveAgeContent')"
                    >+</span>
                  </Col>
                </Row>
              </div>
            </FormItem>

            <FormItem label="起领时间">
              <Checkbox v-model="receiveForm.startReceiveAge" :true-value="0" :false-value="1">不支持</Checkbox>
              <div v-show="receiveForm.startReceiveAge">
                <Row v-for="(item, index) in receiveForm.receiveAgeNum" :key="index">
                  <Col span="5">
                    <Input
                      type="text"
                      v-model="receiveForm.receiveAgeNum[index]"
                      placeholder="请输入年数"
                    />年
                  </Col>
                  <Col span="4">
                    <span
                      class="button-circle"
                      @click="reduce('receiveForm', 'receiveAgeNum', index)"
                    >-</span>
                    <span
                      v-if="index == 0"
                      class="button-circle"
                      @click="receiveForm.receiveAgeNum.push('')"
                    >+</span>
                  </Col>
                </Row>
              </div>
            </FormItem>

            <FormItem label="领取期间">
              <Checkbox v-model="receiveForm.receivePeriod" :true-value="0" :false-value="1">不支持</Checkbox>
            </FormItem>

            <FormItem label="领取方式">
              <CheckboxGroup v-model="receiveForm.receiveType">
                <Checkbox label="0">年领</Checkbox>
                <Checkbox label="1">月领</Checkbox>
              </CheckboxGroup>
            </FormItem>
          </Form>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import * as Agency from "@/api/product/rule";

const defaultPeopleForm = {
  productId: "",
  applicationAgeStart: 0,
  applicationAgeEnd: 0,
  applicationAgeDay: 0,
  renewalAge: 0,
  payAgeMax: 0,
  sexLimit: 0,
  professionalLimit: 0,
  professionalGradeLimit: 0,
  specialProfessionalLimit: "",
  socialInsuranceLimit: 0,
  multipleInsurer: 0,
  insurerNum: 0,
  relationLimit: [],
  confine: 0,
  type: 0
};
const defaultCoverageForm = {
  productId: "", //	number产品基本信息表主键
  generalLimit: 0, //	number一般限制        0  无限制   1  有限制
  minAmount: 0, //	number最低保额(单位:元)
  maxAmount: 0, //	number最高保额(单位:元)
  increaseUnit: 0, //	number递增单位(单位:元)
  ageLimit: 0, //	number年龄保额限制    0 无限制  1 有限制
  ageContent: [{ ageBegin: 0, ageEnd: 0, maxAmount: 0 }], //	object []年龄保额限制内容
  professionaltLimit: 0, //	number职业保额限制    0无限制  1 有限制
  professionalLimitContent: [{ grade: 0, maxAmount: 0 }], //,	object []职业保额限制内容
  specialProfessionalLimit: 0, //	number特殊职业限制   0无限制  1 有限制
  specialProfessionalLimitContent: [{ jobCode: 0, maxAmount: 0 }], //,	object []特殊职业限制内容
  areaLimit: 0, //	number地区保额限制   0无限制  1 有限制
  areaLimitContent: [{ areaType: "", maxAmount: 0, unit: 0 }], //,	object []地区保额限制内容  unit  单位  0  万元  1 元  2  元/天
  insurancePlan: 0, //	number保险计划   0 无  1 有
  insurancePlanContent: [{ code: 1, name: "", option: [], amount: 0, unit: 0 }] //,	object []保险计划内容
};
const defaultPeriodFormYear = {
  productId: "", //	number	产品基本信息表主键id
  insurancePeriodYear: 0, //	number	保险期间类型   年满型   存1代表年满型存在
  insurancePeriodAge: 0, //	number	保险期间类型   岁满型   存1代表岁满型存在
  renewal: 0, //	number	保证续保   0  不支持  1  支持
  renewalCycle: 0, //	number	续保周期    多少年
  ruleIntevalDtoList: [
    {
      productId: "", //	number 产品基本信息表主键id
      ruleIntervalName: "", //	string 投保规则区间名称
      ruleIntervalValue: "", //	string 投保规则区间值
      ruleIntervalType: 0 //	number 2  (交费期间年满型)   3(交费期间岁满型)
    },
    {
      productId: "", //	number 产品基本信息表主键id
      ruleIntervalName: "", //	string 投保规则区间名称
      ruleIntervalValue: "", //	string 投保规则区间值
      ruleIntervalType: 1 //	number  0 (保险期间岁满型)      1 (保险期间年满型)
    }
  ], //	object []item 类型: object
  type: 0 //	number	保险期间分类   0  按年  1 按天
};
const defaultPeriodFormDay = {
  type: 1, //	number	保险期间分类   0  按年  1 按天
  fixedDay: [""], //	string	固定天数   多个用逗号隔开
  elasticDay: [{ begin: 0, end: 0 }] //	object []弹性天数
};
const defaultPaymentForm = {
  productId: 0, //	number	产品基本信息表主键id
  payType: [], //	 1,2,3	交费方式   0  年   1 半年  2  季   3  月
  payPeriodAge: 0, //	number	交费期间    岁满型   存1表示年满型有值
  payPeriodYear: 0, //	number	交费期间    年满型   存1表示年满型有值
  premiumLimitAmount: 0, //	number	保费限制    按金额限制  0  不按金额限制     1  按金额限制
  premiumLimitAmountContent: [{ payType: 0, min: 0, max: 0, increaseUnit: 0 }], //	object []
  premiumLimitCopy: 0, //	number	保费限制   按份数限制    0  不按份数限制     1  按份数限制
  premiumLimitCopyAmount: [{ payType: 0, min: 0, max: 0, increaseUnit: 0 }], //	object []
  ruleIntevalDtoList: [
    {
      productId: "", //	number 产品基本信息表主键id
      ruleIntervalName: "", //	string 投保规则区间名称
      ruleIntervalValue: "", //	string 投保规则区间值
      ruleIntervalType: 2 //	number 2  (交费期间年满型)   3(交费期间岁满型)
    },
    {
      productId: "", //	number 产品基本信息表主键id
      ruleIntervalName: "", //	string 投保规则区间名称
      ruleIntervalValue: "", //	string 投保规则区间值
      ruleIntervalType: 3 //	number 2  (交费期间年满型)   3(交费期间岁满型)
    }
  ] //	object []
};
const defaultReceiveForm = {
  productId: "", //	string
  receiveAge: 0, //	number	年金领取年龄  0  不支持   1  支持
  receiveAgeContent: [{ sex: 0, age: 0 }], //	object []年金领取年龄内容        sex  0  不限制  1 男 2 女
  startReceiveAge: 0, //	number	起领时间  0   不支持   1  支持
  receiveAgeNum: [""], //	string	起领时间多少年    多个逗号分隔
  receivePeriod: 0, //	number	领取期间   0  不支持   1  支持
  receiveType: [] //		领取方式   0  年领取   1  月领取
};
export default {
  data() {
    return {
      anchor: "applicant",
      applicationForm: JSON.parse(JSON.stringify(defaultPeopleForm)),
      insuranceForm: JSON.parse(JSON.stringify(defaultPeopleForm)),
      coverageForm: JSON.parse(JSON.stringify(defaultCoverageForm)),
      periodFormYear: JSON.parse(JSON.stringify(defaultPeriodFormYear)),
      periodFormDay: JSON.parse(JSON.stringify(defaultPeriodFormDay)),
      paymentForm: JSON.parse(JSON.stringify(defaultPaymentForm)),
      receiveForm: JSON.parse(JSON.stringify(defaultReceiveForm)),
      relationClass: Object.freeze({
        0: "配偶",
        1: "父亲",
        2: "母亲",
        3: "子女"
      }),
      // rules: {
      //   applicationAgeStart: [
      //     {
      //       required: true,
      //       type: "number",
      //       message: "不能为空",
      //       trigger: "blur"
      //     }
      //   ],

      //   specialProfessionalLimit: [
      //     { required: true, message: "不能为空", trigger: "change" }
      //   ],
      //   insurancePlan: [
      //     {
      //       type: "array",
      //       required: true,
      //       message: "不能为空",
      //       trigger: "change"
      //     }
      //   ],

      //   underwritingRulesText: [
      //     { required: true, message: "不能为空", trigger: "blur" }
      //   ]
      // },
      codeShow: {
        applicationForm: true,
        insuranceForm: true
      },
      specialProfessionalLimit: {
        applicationForm: [],
        insuranceForm: []
      },
      periodType: 0,
      planOptionList: Object.freeze({
        0: '无关连',
        1: '有社保',
        2: '无社保',
        3: '男性',
        4: '女性'
      })
    };
  },
  mounted() {
    // console.log(this.form.productId)
    this.getData();
  },
  methods: {
    getData(form) {
      let id = this.$route.query.id;
      console.log(id);
      id &&
        Agency.getProductRule(id).then(data => {
          if (data) {
            // 投保人规则
            if (data.applicantRule && (form === "applicationForm" || !form)) {
              let temp = (this.applicationForm = data.applicantRule);
              temp.relationLimit = temp.relationLimit
                ? temp.relationLimit.split(",")
                : [];
            }
            // 被保人规则
            if (data.insuredRule && (form === "insuranceForm" || !form)) {
              let temp = (this.insuranceForm = data.insuredRule);
              temp.relationLimit = temp.relationLimit
                ? temp.relationLimit.split(",")
                : [];
            }
            // 保额规则
            if (data.coverageRule && (form === "coverageForm" || !form)) {
              let temp = (this.coverageForm = data.coverageRule);

              temp.ageContent = temp.ageContent
                ? JSON.parse(temp.ageContent)
                : [];

              temp.professionalLimitContent = temp.professionalLimitContent
                ? JSON.parse(temp.professionalLimitContent)
                : [];

              temp.areaLimitContent = temp.areaLimitContent
                ? JSON.parse(temp.areaLimitContent)
                : [];

              temp.specialProfessionalLimitContent = temp.specialProfessionalLimitContent
                ? JSON.parse(temp.specialProfessionalLimitContent)
                : [];

              temp.insurancePlanContent = temp.insurancePlanContent
                ? JSON.parse(temp.insurancePlanContent)
                : [];
            }

            // 保险期间规则
            if (data.insurancePeriodRule) {
              for (const iterator of data.insurancePeriodRule) {
                // 0  按年  1 按天
                if (
                  iterator.type === 0 &&
                  (form === "periodFormYear" || !form)
                ) {
                  this.periodFormYear = iterator;
                  iterator.ruleIntevalDtoList ||
                    (iterator.ruleIntevalDtoList = []);

                    if (iterator.ruleIntevalDtoList.length) {
                      for (const _iterator of iterator.ruleIntevalDtoList) {
                        _iterator.ruleIntervalValue && _iterator.ruleIntervalValue.includes("@") && (_iterator.ruleIntervalValue = _iterator.ruleIntervalValue.replace("@", ''))
                      }
                    }
                } else if (form === "periodFormDay" || !form) {
                  this.periodFormDay = iterator;

                  this.periodFormDay.fixedDay = iterator.fixedDay
                    ? JSON.parse(iterator.fixedDay)
                    : [""];

                  this.periodFormDay.elasticDay = iterator.elasticDay
                    ? JSON.parse(iterator.elasticDay)
                    : [];
                }
              }
            }
            // 交费规则
            if (data.payRule && (form === "paymentForm" || !form)) {
              let temp = (this.paymentForm = data.payRule);

              temp.payType = temp.payType
                    ? temp.payType.split(",")
                    : [];

              temp.premiumLimitAmountContent = temp.premiumLimitAmountContent
                ? JSON.parse(temp.premiumLimitAmountContent)
                : [];

              temp.premiumLimitCopyAmount = temp.premiumLimitCopyAmount
                ? JSON.parse(temp.premiumLimitCopyAmount)
                : [];

              temp.ruleIntevalDtoList || (temp.ruleIntevalDtoList = []);

              if (temp.ruleIntevalDtoList.length) {
                      for (const _iterator of temp.ruleIntevalDtoList) {
                        // console.log(_iterator.ruleIntervalValue.includes("@"))
                        _iterator.ruleIntervalValue && _iterator.ruleIntervalValue.includes("@") && (_iterator.ruleIntervalValue = _iterator.ruleIntervalValue.replace("@", ''))
                      }
                    }
            }
            // 领取规则
            if (
              data.vitProductReceiveRule &&
              (form === "receiveForm" || !form)
            ) {
              let temp = (this.receiveForm = data.vitProductReceiveRule);

              temp.receiveAgeNum = temp.receiveAgeNum
                ? String(temp.receiveAgeNum).split(",")
                : [''];

                temp.receiveType = temp.receiveType
                ? String(temp.receiveType).split(",")
                : [];

              temp.receiveAgeContent = temp.receiveAgeContent
                ? JSON.parse(temp.receiveAgeContent)
                : [];
            }

            console.log("applicationForm: ", this.applicationForm);
            console.log("insuranceForm: ", this.insuranceForm);
            console.log("coverageForm: ", this.coverageForm);
            console.log("periodFormYear: ", this.periodFormYear);
            console.log("periodFormDay: ", this.periodFormDay);
            console.log("paymentForm: ", this.paymentForm);
            console.log("receiveForm: ", this.receiveForm);
            // console.log("relationClass: ", this.relationClass);
          }
        });

      // 查询投保人或者被保人规则
      // getAppntInsuredRule(id).then(data => {
      //   // console.log(data);
      //   data ? (this.applicationForm = data);
      // });

      // // 查询投保人或者被保人规则
      // getCoverageRule(id).then(data =>  : []{
      //   // console.log(data);
      //   data && (this.coverageForm = data);
      // });
    },
    // addRow(type) {
    //   let len = this.form[type].length;
    //   if (!len || Object.keys(this.form[type][len - 1]).length) {
    //     this.form[type].push({});
    //   }
    // },
    submit(type) {
      // debugger
      this[type].productId = this.$route.query.id;

      let formData = JSON.parse(JSON.stringify(this[type]));
      // console.log('formData: ', formData);
      this.$refs[type]
        .validate()
        .then(data => {
          if (data) {
            switch (type) {
              case "applicationForm":
                formData.type = 0;
                // 关系限制数组转换字符串
                formData.relationLimit += "";
                return formData.id
                  ? Agency.updateAppntInsuredRule(formData)
                  : Agency.saveAppntInsuredRule(formData);
                break;
              case "insuranceForm":
                formData.type = 1;
                formData.relationLimit += "";
                return formData.id
                  ? Agency.updateAppntInsuredRule(formData)
                  : Agency.saveAppntInsuredRule(formData);
                break;
              case "coverageForm":
                return formData.id
                  ? Agency.updateCoverageRule(formData)
                  : Agency.saveCoverageRule(formData);
                break;
              case "periodFormYear":
                for (const iterator of formData.ruleIntevalDtoList) {
                  if (
                    iterator.ruleIntervalType === 1 ||
                    iterator.ruleIntervalType === 2
                  ) {
                    iterator.ruleIntervalName =
                      iterator.ruleIntervalValue + "年";
                  } else if (
                    iterator.ruleIntervalType === 0 ||
                    iterator.ruleIntervalType === 3
                  ) {
                    iterator.ruleIntervalName =
                      iterator.ruleIntervalValue + "岁";
                      iterator.ruleIntervalValue += '@'
                  }
                }
                return formData.id
                  ? Agency.updateInPeriodRule([formData])
                  : Agency.saveInPeriodRule([formData]);
                break;
              case "periodFormDay":
                return formData.id
                  ? Agency.updateInPeriodRule([formData])
                  : Agency.saveInPeriodRule([formData]);
                break;
              case "paymentForm":
                formData.payType += ''
                for (const iterator of formData.ruleIntevalDtoList) {
                  // 年满型
                  if (
                    iterator.ruleIntervalType === 1 ||
                    iterator.ruleIntervalType === 2
                  ) {
                    iterator.ruleIntervalName =
                      iterator.ruleIntervalValue + "年";
                  } else if (
                    iterator.ruleIntervalType === 0 ||
                    iterator.ruleIntervalType === 3
                  ) {
                    // 岁满型
                    iterator.ruleIntervalName =
                      iterator.ruleIntervalValue + "岁";
                      iterator.ruleIntervalValue += '@'
                  }
                }
                return formData.id
                  ? Agency.updatePayRule(formData)
                  : Agency.savePayRule(formData);
                break;
              case "receiveForm":
                formData.receiveAgeNum += "";
                formData.receiveType += "";
                return formData.id
                  ? Agency.updateReceiveRule(formData)
                  : Agency.saveReceiveRule(formData);
                break;
              default:
                break;
            }
          } else {
            return Promise.reject();
          }
        })
        .then(() => {
          this.getData(type);
          this.$Message.success("操作成功");
        });
    },
    clear(form) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要清空吗",
        onOk: () => {
          Promise.resolve()
            .then(() => {
              switch (form) {
                case "applicationForm":
                  return Agency.clearAppntInsuredRule(this[form].id).then(
                    res => {
                      this.applicationForm = JSON.parse(
                        JSON.stringify(defaultPeopleForm)
                      );
                    }
                  );
                  break;
                case "insuranceForm":
                  return Agency.clearAppntInsuredRule(this[form].id).then(
                    res => {
                      this.insuranceForm = JSON.parse(
                        JSON.stringify(defaultPeopleForm)
                      );
                    }
                  );
                  break;
                case "coverageForm":
                  return Agency.clearCoverageRule(this[form].id).then(res => {
                    this.coverageForm = JSON.parse(
                      JSON.stringify(defaultCoverageForm)
                    );
                  });
                  break;
                case "periodFormYear":
                  return Agency.clearInPeriodRule([this[form].id]).then(res => {
                    this.periodFormYear = JSON.parse(
                      JSON.stringify(defaultPeriodFormYear)
                    );
                  });
                  break;
                case "periodFormDay":
                  return Agency.clearInPeriodRule([this[form].id]).then(res => {
                    this.periodFormDay = JSON.parse(
                      JSON.stringify(defaultPeriodFormDay)
                    );
                  });
                  break;
                case "paymentForm":
                  return Agency.clearPayRule(this[form].id).then(res => {
                    this.paymentForm = JSON.parse(
                      JSON.stringify(defaultPaymentForm)
                    );
                  });
                  break;
                case "receiveForm":
                  return Agency.clearReceiveRule(this[form].id).then(res => {
                    this.receiveForm = JSON.parse(
                      JSON.stringify(defaultReceiveForm)
                    );
                  });
                  break;
                default:
                  break;
              }
            })
            .then(() => {
              this.getData();
              this.$Message.success("操作成功");
            });
        }
      });
    },
    transCode(type) {
      if (this[type].specialProfessionalLimit) {
        this.specialProfessionalLimit[type] = this[
          type
        ].specialProfessionalLimit.split(",");
      }
      this.codeShow[type] = false;
    },
    selectChange(type) {
      this[type].specialProfessionalLimit = this.specialProfessionalLimit[
        type
      ].join(",");
      // console.log(this.form.specialProfessionalLimit)
    },
    goPosition(data) {
      console.log(this.$refs.scroll.$el.scrollTop);
      this.$refs.scroll.$el.scrollTop = this.$refs[data].offsetTop;
      this.anchor = data;
    },
    add(form, field) {
      this[form][field].push({});
    },
    reduce(form, field, index) {
      if (index === 0) {
        this.$Message.error("最后一项不可删除！");
        return;
      }
      this[form][field].splice(index, 1);
    }
  }
};
</script>
