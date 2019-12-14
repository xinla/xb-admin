<style lang="less" scoped>
.box {
  border-bottom: 20px solid #f5f7f9;
}
.white {
  background: #fff;
  border-radius: 6px;
}
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
.button-right-wrap {
  margin: 15px 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .button {
    // max-width: 48%;
    width: 48%;
    // min-width: 48%;
    display: inline-block;
    text-align: center;
    border: 1px solid #ddd;
    line-height: 50px;
    margin: 10px 0;
  }
}
.current {
  background: rgba(49, 58, 195, 1);
  color: #fff;
}
</style>
<template>
  <div>
    <div class="box white">
      <div ref="applicant" class="title-wrap bfc-o">
        <span id="a1" class="title">基础规则</span>
        <div class="button-wrap fr">
          <Button class="button" @click="submit('form')">保存</Button>
        </div>
      </div>

      <Form ref="form" :model="form" :label-width="150">
        <FormItem label="费率计算模式" prop="socialInsuranceLimit">
          <RadioGroup v-model="form.rateMode">
            <Radio :label="0">保费推算保额</Radio>
            <Radio :label="1">保额推算保费</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="费率格式" prop="socialInsuranceLimit">
          <RadioGroup v-model="form.rateFormat">
            <Radio :label="0">常规</Radio>
            <Radio :label="1">主险保费的百分比</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="费率计算方式" prop="socialInsuranceLimit">
          <RadioGroup v-model="form.rateCalculation">
            <Radio :label="0">常规投保</Radio>
            <Radio :label="1">按保险计划投保</Radio>
            <Radio :label="2">按份数投保</Radio>
            <Radio :label="3">按档次投保</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="年金基本保额设计依据" prop="socialInsuranceLimit">
          <RadioGroup v-model="form.annuityInsurerGist">
            <Radio :label="0">年领</Radio>
            <Radio :label="1">月领</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </div>

    <Row>
      <Col span="8" style="border-right: 20px solid #f5f7f9;">
        <div class="white">
          <div ref="applicant" class="title-wrap bfc-o">
            <span id="a1" class="title">保费计算器项目</span>
          </div>

          <div class="button-right-wrap">
            <div
              :class="['button', {current: current === item.id}]"
              v-for="(item, index) in configTagList"
              :key="index"
              @click="switchTo(item)"
            >
              <span v-if="item.checked">√</span>
              {{item.name}}
            </div>
          </div>
        </div>
      </Col>

      <Col span="16">
        <div class="white">
          <div ref="applicant" class="title-wrap bfc-o">
            <Checkbox v-model="currentConfigInfo.checked" :true-value="1" :false-value="0"></Checkbox>
            <!-- @on-change="change" -->
            <span id="a1" class="title">{{currentConfigInfo.calItemName}}</span>
            <div class="button-wrap fr">
              <Button class="button" @click="add()">添加选项</Button>
              <Button class="button" @click="remove()">删除选项</Button>
              <Button class="button" @click="submit('currentConfigInfo')">保存</Button>
            </div>
          </div>

          <div style="padding: 0 20px; line-height: 40px;">
            <Row>
              <Col span="11">
                <div class="bfc-d">选项配置</div>
                <div
                  v-if="currentConfigInfo.calItemTag === 15"
                  class="bfc-d"
                  style="margin-left: 10px;"
                >计算系数</div>
              </Col>
              <Col span="9">
                <div>设为默认</div>
              </Col>
              <Col span="4" class="ar">是否显示</Col>
            </Row>

            <div style="position: relative; min-height: 150px;">
              <Row v-for="(item, index) in currentConfigInfo.configItems" :key="index">
                <Col span="1">
                  <CheckboxGroup v-model="selected">
                    <Checkbox :label="index">{{null}}</Checkbox>
                  </CheckboxGroup>
                </Col>
                <Col span="10" style="min-height: 1px;">
                  <!-- 领取年龄 -->
                  <template v-if="currentConfigInfo.calItemTag === 9">
                    <Select v-model="item.optionOther" style="width: 80px;">
                      <Option value="0">不限性别</Option>
                      <Option value="1">男性</Option>
                      <Option value="2">女性</Option>
                    </Select>
                  </template>

                  <!-- 交费方式 -->
                  <template v-if="currentConfigInfo.calItemTag === 15">
                    <!-- {{['年交', '半年交', '季交', '月交'][item.option]}} -->
                    <Select v-model="item.option" style="width: 80px;">
                      <Option value="0">年交</Option>
                      <Option value="1">半年交</Option>
                      <Option value="2">季交</Option>
                      <Option value="3">月交</Option>
                    </Select>
                    <Input
                      type="text"
                      style="width: 100px; margin: 0 10px;"
                      v-model="item.optionOther"
                      placeholder="请输入"
                    />
                  </template>
                  <!-- 出生日期 -->
                  <template v-if="currentConfigInfo.calItemTag === 2">
                    <DatePicker
                      type="date"
                      placeholder="选择日期"
                      style="width: 150px"
                      @on-change="changeDate($event, item)"
                    ></DatePicker>
                  </template>

                  <!-- 通用输入框 -->
                  <template v-if="show(currentConfigInfo.calItemTag)">
                    <Input
                      type="text"
                      style="width: 100px; margin: 0 10px;"
                      v-model="item.option"
                      placeholder="请输入"
                    />
                  </template>

                  <!-- 投保份数 -->
                  <template v-if="currentConfigInfo.calItemTag === 1">份</template>

                  <!-- 性别-->
                  <template v-if="currentConfigInfo.calItemTag === 4">
                    <Select v-model="item.option" style="width: 80px;">
                      <Option value="1">男</Option>
                      <Option value="2">女</Option>
                    </Select>
                  </template>

                  <!-- 社保-->
                  <!-- <template v-if="currentConfigInfo.calItemTag === 6">
                    <Select v-model="item.option" style="width: 80px;">
                      <Option value="0">无</Option>
                      <Option value="1">有</Option>
                    </Select>
                  </template> -->

                  <!-- 领取方式-->
                  <template v-if="currentConfigInfo.calItemTag === 11">
                    <Select v-model="item.option" style="width: 80px;">
                      <Option value="0">年领</Option>
                      <Option value="1">月领</Option>
                    </Select>
                  </template>
                  <!-- 保费/保险金额 -->
                  <template
                    v-if="currentConfigInfo.calItemTag === 12 || currentConfigInfo.calItemTag === 10"
                  >
                    <Select v-model="item.unit" style="width: 80px;">
                      <Option value="0">万元</Option>
                      <Option value="1">元</Option>
                      <Option value="2">元/每天</Option>
                    </Select>
                  </template>
                  <!-- 职业类别 -->
                  <template v-if="currentConfigInfo.calItemTag === 8">类</template>
                  <!-- 领取期间 -->
                  <template v-if="currentConfigInfo.calItemTag === 13">年</template>
                  <!-- 投保档次 -->
                  <template v-if="currentConfigInfo.calItemTag === 3">档</template>
                  <!-- 保险期间/交费期间 -->
                  <template
                    v-if="currentConfigInfo.calItemTag === 5 || currentConfigInfo.calItemTag === 7"
                  >
                    <Select v-model="item.optionOther" style="width: 80px;">
                      <Option value="岁">岁</Option>
                      <Option value="年">年</Option>
                    </Select>
                  </template>
                </Col>

                <Col span="9">
                  <i-switch
                    :true-value="1"
                    :false-value="0"
                    v-model="item.isDefault"
                    @on-change="changeSwitch(index)"
                  />
                </Col>
                <Col span="4" class="ar">
                  <i-switch :true-value="1" :false-value="0" v-model="item.isShow" />
                </Col>
              </Row>

              <div
                v-if="currentConfigInfo.configItems == null || currentConfigInfo.configItems.length === 0"
                class="cc"
              >暂无数据</div>
            </div>
          </div>

          <div
            style="line-height: 40px; border-top: 1px solid #ddd; margin-top: 20px; padding: 0 20px;"
          >
            <Row>
              <Col span="12">是否支持自定义</Col>
              <Col span="12" class="ar">
                <i-switch :true-value="1" :false-value="0" v-model="currentConfigInfo.define" />
              </Col>
            </Row>
            <Row>
              <Col span="12">是否费率查询因子</Col>
              <Col span="12" class="ar">
                <i-switch :true-value="1" :false-value="0" v-model="currentConfigInfo.rateFactor" />
              </Col>
            </Row>
            <Row>
              <Col span="12">是否显示</Col>
              <Col span="12" class="ar">
                <i-switch :true-value="1" :false-value="0" v-model="currentConfigInfo.isShow" />
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import * as Agency from "@/api/product/calculator";
import { getProductRule } from "@/api/product/rule";

const defaultConfigInfo = {
  checked: 0,
  isShow: 0,
  rateFactor: 0,
  define: 0
};
export default {
  data() {
    return {
      form: {
        productId: this.$route.query.id, //	number 产品基本信息表主键id
        rateMode: 0, //	number 费率计算模式  0  保费推算保额    1  保额推算保费
        rateFormat: 0, //	number 费率格式            0  常规   1 主险保费的百分比
        rateCalculation: 0, //	number 费率计算方式   0 常规投保  1 按保险计划投保 2 按份数投保 3 按档次投保
        annuityInsurerGist: 0 //	number 年金基本保额设计依据  0  年领    1 月领
      },
      configTagList: [],
      current: "",
      currentConfigInfo: Object.assign(
        { productId: this.$route.query.id, configItems: [] },
        defaultConfigInfo
      ),
      selected: [],
      insuranceRules: {}
    };
  },
  mounted() {
    this.getData();
    let id = this.$route.query.id;
    id &&
      getProductRule(id).then(res => {
        // console.log(res)
        this.insuranceRules = res;
      });
  },
  methods: {
    getData() {
      let id = this.$route.query.id;
      if (id) {
        Agency.getCalculatorBase(id).then(res => {
          // console.log("calculatorBase: ", res);
          res && (this.form = res);
        });
        Agency.getAllCalculatorItem(id).then(res => {
          // console.log("AllCalculatorItem: ", res);
          this.configTagList = res;
        });
      }
    },
    submit(form) {
      let formData = JSON.parse(JSON.stringify(this[form]));
      Promise.resolve()
        .then(() => {
          switch (form) {
            case "form":
              return formData.id
                ? Agency.updateCalculator(formData)
                : Agency.saveCalculator(formData);
              break;
            case "currentConfigInfo":
              if (formData.calItemId) {
                // 保险期间/交费期间格式转换
                if (formData.calItemTag === 5 || formData.calItemTag === 7) {
                  for (const iterator of formData.configItems) {
                    if (iterator.option) {
                      iterator.optionOther === "岁" && (iterator.option += "@");
                    } else {
                      this.$Message.warning("数值不可为空，请确认填写");
                      return;
                    }
                  }
                }
                return formData.id
                  ? Agency.updateCalculatorItemInfo(formData)
                  : Agency.saveCalculatorItemInfo(formData);
              } else {
                this.$Message.warning("请选择保费计算器项目");
                return Promise.reject();
              }
              break;
          }
        })
        .then(() => {
          this.getData();
          if (form === "currentConfigInfo") {
            Agency.getCalculatorItemInfo(
              this.$route.query.id,
              formData.calItemId
            ).then(res => {
              console.log("currentConfigInfo: ", res);
              if (res) {
                if (res.calItemTag === 5 || res.calItemTag === 7) {
                  for (const iterator of res.configItems) {
                    let temp = iterator.option.match(/\d+/g);
                    temp && (iterator.option = temp[0]);
                  }
                }
                res && (this.currentConfigInfo = res);
              }
            });
          }
          this.$Message.success("操作成功");
        });
    },
    // 配置项切换
    switchTo(data) {
      this.current = data.id;
      this.selected = [];
      Agency.getCalculatorItemInfo(this.$route.query.id, data.id).then(res => {
        // console.log("currentConfigInfo: ", res);
        if (res) {
          if (res.calItemTag === 5 || res.calItemTag === 7) {
            for (const iterator of res.configItems) {
              let temp = iterator.option.match(/\d+/g);
              temp && (iterator.option = temp[0]);
            }
          }
          this.currentConfigInfo = res;
          // data.checked = 1
        } else {
          // console.log("insuranceRules: ", this.insuranceRules);
          // 加载核保规则默认配置项
          // 0 可投保地区   1 投保份数  2  出生日期  3  投保档次  4 性别  5 保险期间  6 有无社保  7  交费期间  8  职业（风险）类别  9  领取年龄  10  保险金额  11  起领时间/领取方式  12  保费  13  领取期间  14 保险计划  15 交费方式
          let configItems = [];
          let rules = this.insuranceRules;
          switch (data.tag) {
            // 5 保险期间
            case 5:
              for (const iterator of rules.insurancePeriodRule) {
                if (iterator.type === 0) {
                  let temp5 = iterator.ruleIntevalDtoList
                    ? iterator.ruleIntevalDtoList
                    : [];
                  console.log(temp5);
                  for (const _iterator of temp5) {
                    _iterator.ruleIntervalValue &&
                      configItems.push({
                        option: (_iterator.ruleIntervalValue.match(/\d+/g) ||
                          [])[0],
                        optionOther: _iterator.ruleIntervalValue.includes("@")
                          ? "岁"
                          : "年"
                      });
                  }
                }
              }
              break;
            // 7  交费期间
            case 7:
              let temp7 = rules.payRule ? rules.payRule.ruleIntevalDtoList : [];
              for (const iterator of temp7) {
                iterator.ruleIntervalValue &&
                  configItems.push({
                    option: (iterator.ruleIntervalValue.match(/\d+/g) || [])[0],
                    optionOther: iterator.ruleIntervalValue.includes("@")
                      ? "岁"
                      : "年"
                  });
              }
              break;
            // 13  领取期间
            case 13:
              if (rules.receiveForm && rules.receiveForm.receiveAgeNum) {
                let arr = rules.receiveForm.receiveAgeNum.split(",");
                for (const iterator of arr) {
                  configItems.push({ option: iterator });
                }
              }
              break;
            // 14 保险计划
            case 14:
              let temp14 = rules.coverageForm
                ? JSON.parse(rules.coverageForm.insurancePlanContent)
                : [];
              for (const iterator of temp14) {
                configItems.push({ option: iterator.name });
              }
              break;
            // 9  领取年龄
            case 9:
              let temp9 = rules.receiveForm
                ? SON.parse(rules.receiveForm.receiveAgeContent)
                : [];
              for (const iterator of temp9) {
                configItems.push({
                  option: iterator.age,
                  optionOther: iterator.sex
                });
              }
              break;
            // 11  领取方式
            case 11:
              if (rules.receiveForm && rules.receiveForm.receiveType) {
                let arr = rules.receiveForm.receiveType.split(",");
                for (const iterator of arr) {
                  configItems.push({ option: iterator });
                }
              }
              break;
            // 15  交费方式
            case 15:
                if (rules.payRule && rules.payRule.payType) {
                let arr = rules.payRule.payType.split(",");
                for (const iterator of arr) {
                  configItems.push({ option: iterator });
                }
              }
              break;
          }
          this.currentConfigInfo = Object.assign(
            {
              productId: this.$route.query.id,
              calItemId: data.id,
              calItemName: data.name,
              calItemTag: data.tag,
              configItems
            },
            defaultConfigInfo
          );
          // console.log(this.currentConfigInfo);
          this.$Message.info("暂无该项相关规则信息");
        }
      });
    },
    // 配置项取消勾选
    // change(data) {
    //   if (!this.currentConfigInfo.id) {
    //     this.$Message.warning("请先保存该选项卡数据");
    //     return;
    //   }
    //   !data &&
    //     Agency.uncheckCalculatorItem(this.currentConfigInfo).then(res => {
    //       this.$Message.success("取消成功");
    //     });
    // },
    // 设置默认选项交互
    changeSwitch(data) {
      let array = this.currentConfigInfo.configItems;
      for (let index = 0, len = array.length; index < len; index++) {
        if (index !== data) {
          array[index].isDefault = 0;
        }
      }
    },
    changeDate($event, data) {
      data.option = $event;
      console.log(data);
    },
    // 添加配置项选项
    add() {
      let form = this.currentConfigInfo.configItems;
      if (!form) {
        this.currentConfigInfo.configItems = form = [];
      }
      form.push({
        option: "",
        unit: "0",
        optionOther:
          this.currentConfigInfo.calItemTag === 5 ||
          this.currentConfigInfo.calItemTag === 7
            ? "年"
            : "",
        isDefault: 0,
        isShow: 0
      });
    },
    // 删除配置项选项
    remove() {
      if (this.selected.length === 0) {
        this.$Message.warning("请选择需要删除的选择");
        return;
      }
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除吗",
        onOk: () => {
          for (const iterator of this.selected) {
            this.currentConfigInfo.configItems.splice(iterator, 1);
          }
          this.selected = [];
          this.submit("currentConfigInfo");
        }
      });
    },
    show(data) {
      // data !== 6 社保
      return data !== 2 && data !== 4 && data !== 11 && data !== 15;
    }
  }
};
</script>
