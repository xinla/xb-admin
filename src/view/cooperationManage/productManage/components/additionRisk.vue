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
    padding: 5px 20px;
    margin-right: 10px;
    border: 1px solid #ddd;
    line-height: 1;
  }
}
.button-circle {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  color: #ddd;
  border-radius: 50%;
  text-align: center;
  line-height: 14px;
  cursor: pointer;
  margin-right: 5px;
}
.table {
  border: 1px solid #ddd;
  width: 100%;
}
.title1 {
  font-weight: 600;
  padding: 10px;
  background: #eee;
}
.anchor-wrap {
  background: #fff;
  margin: 10px 10px 0 0;
  padding: 10px;
  line-height: 30px;
  li {
    padding-left: 10px;
    margin-top: 5px;
    border-radius: 4px;
  }
  .current {
    background: #ddd;
  }
}
</style>
<template>
  <div style="height: calc(100% - 62px);">
    <Row style="height: 100%;">
      <Col span="4">
        <ul class="anchor-wrap">
          <li
            v-for="(item, index) in additionRiskList"
            :class="['anchor', {current: anchor.includes(item.id)}]"
            :key="index"
          >
            <CheckboxGroup v-model="anchor">
              <Checkbox
                :label="item.id"
                style="width: 100%;"
                @click.self.native="addRisk(item)"
              >{{item.productFullName}}</Checkbox>
            </CheckboxGroup>
          </li>
        </ul>
      </Col>

      <Col
        ref="scroll"
        span="20"
        style="background: #fff; position: absolute; right: 0; height: 100%; overflow: auto; transition: all 1s;"
      >
        <!-- 产品导航 -->
        <div class="box" v-for="(item, index) of form" :Key="index">
          <div ref="nav" class="title-wrap bfc-o">
            <span class="title">{{item.additionRiskName}}</span>
            <div class="button-wrap fr">
              <button class="button" type="button" @click="submit(item)">保存</button>
              <button class="button" type="button" @click="clear(item)">清空</button>
            </div>
          </div>

          <Form ref="form" :label-width="100">
            <FormItem label="优先投保产品">
              <Checkbox v-model="item.priorityProductLimit" :true-value="0" :false-value="1">无约束</Checkbox>
              <div v-if="item.priorityProductLimit === 1">
                <Select v-model="item.priorityProductId" style="width:30%">
                  <template v-for="(unit, index) in additionRiskList">
                    <Option
                      v-if="unit.id !== item.additionRiskId"
                      :value="unit.id"
                      :key="index"
                    >{{unit.productFullName}}</Option>
                  </template>
                </Select>
              </div>
            </FormItem>

            <FormItem label="保险金额约束">
              <Checkbox v-model="item.coverageLimit" :true-value="0" :false-value="1">无约束</Checkbox>
              <div v-if="item.coverageLimit === 1">
                <div class="title1">不允许自定义，由系统生成</div>
                <RadioGroup v-model="item.coverageDefineItem">
                  <Radio :label="0">= 主险保额</Radio>
                </RadioGroup>
                <div>
                  <RadioGroup v-model="item.coverageDefineItem">
                    <Radio :label="1">主险保费推算</Radio>
                  </RadioGroup>

                  <RadioGroup
                    v-if="item.coverageDefineItem === 1"
                    v-model="item.coveragePremiumItem"
                    style="border: 1px solid #ddd; padding: 0 10px;"
                  >
                    <Radio :label="0">= 主险期交保费</Radio>
                    <Radio :label="1">= 主险及其他附加险期交保费</Radio>
                    <Radio :label="2">= （主险缴费期间-1）* 期交保费</Radio>
                  </RadioGroup>
                </div>
                <!-- <div>
                  <RadioGroup v-model="item.rateCountMethod">
                    <Radio :label="1">使用公式</Radio>
                  </RadioGroup>

                  <Input type="text" v-model="item.paymentMethodRatioYear" />
                </div>-->

                <div class="title1">允许自定义，用保费计算器设定</div>
                <Checkbox
                  v-model="item.coverageLimitCoverage"
                  :true-value="1"
                  :false-value="0"
                >保额限保额</Checkbox>
                <div v-if="item.coverageLimitCoverage === 1">
                  主险保额 ：附加险保额 <=
                  <Input type="text" v-model="item.coverageLimitCoverageMain" style="width:10%;" />：
                  <Input type="text" v-model="item.coverageLimitCoverageAdd" style="width:10%;" />
                </div>

                <Checkbox v-model="item.premiumLimitCoverage" :true-value="1" :false-value="0">保费限保额</Checkbox>
                <div v-if="item.premiumLimitCoverage === 1">
                  <Row>
                    <Col span="10">保费标准</Col>
                    <Col span="10">搭配保额</Col>
                  </Row>
                  <Row v-for="(unit, unique) of item.premiumLimitCoverageContent" :Key="unique">
                    <Col span="10">
                      <FormItem label="主险保费" prop="pcCoverPicture">
                        <Select v-model="unit.symbol" style="width:20%; margin-right: 10px;">
                          <Option :value="0">>=</Option>
                          <Option :value="1">></Option>
                          <Option :value="2"><=</Option>
                          <Option :value="3"><</Option>
                        </Select>
                        <Input
                          v-model="unit.premium"
                          placeholder="请输入内容"
                          style="width:40%; margin-right: 10px;"
                        />
                      </FormItem>
                    </Col>

                    <Col span="8">
                      <FormItem prop="pcCoverPicture">
                        <Input
                          v-model="unit.coverage"
                          placeholder="请输入内容"
                          style="width:70%; margin-right: 10px;"
                        />
                        <Select v-model="unit.unit" style="width:20%; margin-right: 10px;">
                          <Option :value="0">元</Option>
                          <Option :value="1">份</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="2">
                      <span
                        class="button-circle"
                        @click="reduce(item, 'premiumLimitCoverageContent', unique)"
                      >-</span>
                      <span
                        class="button-circle"
                        @click="addItem(item, 'premiumLimitCoverageContent')"
                      >+</span>
                    </Col>
                  </Row>
                </div>
              </div>
            </FormItem>

            <FormItem label="保险期间约束">
              <Checkbox v-model="item.insurancePeriodLimit" :true-value="0" :false-value="1">无约束</Checkbox>
              <div v-if="item.insurancePeriodLimit === 1">
                <div>
                  <RadioGroup v-model="item.insurancePeriodOption">
                    <Radio :label="0">强制</Radio>
                  </RadioGroup>

                  <RadioGroup
                    v-model="item.insurancePeriodForce"
                    style="border: 1px solid #ddd; padding: 0 10px;"
                  >
                    <Radio :label="0">= 主险保险期间</Radio>
                    <Radio :label="1">= 主险保险期间 - 1</Radio>
                  </RadioGroup>
                </div>

                <RadioGroup
                  v-model="item.insurancePeriodOption"
                  @on-change="constraintChange(item)"
                >
                  <Radio :label="1">可选</Radio>
                </RadioGroup>

                <Checkbox
                  v-model="item.insurancePeriodRate"
                  :true-value="1"
                  :false-value="0"
                  @on-change="constraintChange(item)"
                >作为费率查询条件</Checkbox>

                <table class="table ac" border>
                  <tr>
                    <th>主险保险期间</th>
                    <th>附加险保险期间</th>
                  </tr>
                  <template v-if="item.insurancePeriodRate === 1">
                    <tr v-for="(unit, unique) in item.insurancePeriodContentRate" :key="unique">
                      <td>{{unit.main}}</td>
                      <td>
                        <span v-for="(_item, _index) in unit.rider" :key="_index">
                          <Checkbox v-model="_item.checked" :true-value="1" :false-value="0"></Checkbox>
                          {{_item.rider}}
                        </span>
                      </td>
                    </tr>
                  </template>
                  <template v-else-if="item.insurancePeriodOption === 1">
                    <tr v-for="(unit, unique) in item.insurancePeriodContent" :key="unique">
                      <td>{{unit.main}}</td>
                      <td>
                        <span v-for="(_item, _index) in unit.rider" :key="_index">
                          <Checkbox v-model="_item.checked" :true-value="1" :false-value="0"></Checkbox>
                          {{_item.rider}}
                        </span>
                      </td>
                    </tr>
                  </template>
                </table>
              </div>
            </FormItem>

            <FormItem label="交费期间约束">
              <Checkbox v-model="item.payPeriodLimit" :true-value="0" :false-value="1">无约束</Checkbox>
              <div v-if="item.payPeriodLimit === 1">
                <div>
                  <RadioGroup v-model="item.payOption">
                    <Radio :label="0">强制</Radio>
                  </RadioGroup>

                  <RadioGroup
                    v-model="item.payForceContent"
                    style="border: 1px solid #ddd; padding: 0 10px;"
                  >
                    <Radio :label="0">= 主险保险期间</Radio>
                    <Radio :label="1">= 主险保险期间 - 1</Radio>
                  </RadioGroup>
                </div>
                <RadioGroup v-model="item.payOption">
                  <Radio :label="1">可选</Radio>
                </RadioGroup>
              </div>
            </FormItem>

            <FormItem label="捆绑其他产品">
              <Checkbox v-model="item.bindOtherProduct" :true-value="0" :false-value="1">无约束</Checkbox>
            </FormItem>
          </Form>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import * as Agency from "@/api/product/addition";
import { getProductPageByType } from "@/api/product";

const defaultForm = {
  id: "",
  productId: "",
  additionRiskId: "",
  additionRiskName: "",
  priorityProductLimit: 0,
  priorityProductId: "",
  coverageLimit: 0,
  coverageDefine: 0,
  coverageDefineItem: 0,
  coveragePremiumItem: 0,
  coverageLimitCoverage: 0,
  coverageLimitCoverageMain: "0",
  coverageLimitCoverageAdd: "0",
  premiumLimitCoverage: 0,
  premiumLimitCoverageContent: [
    { coverage: 0, symbol: 0, unit: 0, premium: 0 }
  ],
  insurancePeriodLimit: 0,
  insurancePeriodOption: 0,
  insurancePeriodForce: 0,
  insurancePeriodRate: 0,
  insurancePeriodContent: [{ main: "", rider: [{ rider: "", checked: 0 }] }],
  insurancePeriodContentRate: [
    { main: "", rider: [{ rider: "", checked: 0 }] }
  ],
  payPeriodLimit: 0,
  payOption: 0,
  payForceContent: 0,
  bindOtherProduct: 0
};

export default {
  data() {
    return {
      form: [],
      selectRisk: {},
      riskList: [],
      child: {
        show: false,
        index: 0
      },
      addShow: false,

      additionRiskList: [],
      anchor: []
    };
  },
  mounted() {
    // 获取附加险列表
    //  || "2252792750044872711"
    Agency.getAdditionRiskList(this.$route.query.supplierId).then(res => {
      // console.log("additionRiskList ", res);
      this.additionRiskList = res;
    });

    this.getData();
  },
  methods: {
    getData() {
      this.$route.query.id &&
        Agency.getAdditionRisk(this.$route.query.id).then(data => {
          console.log("additionRisk", data);
          this.form = [];
          this.anchor = []
          if (data) {
            this.form = data;
            for (const iterator of data) {
              this.anchor.push(iterator.additionRiskId);
              // 保费限保额内容
              iterator.premiumLimitCoverageContent = JSON.parse(
                iterator.premiumLimitCoverageContent
              );
              // 保险期间可选内容
              iterator.insurancePeriodContent = JSON.parse(
                iterator.insurancePeriodContent
              );
              // 保险期间可选内容 费率
              iterator.insurancePeriodContentRate = JSON.parse(
                iterator.insurancePeriodContentRate
              );
            }
          }
        });
    },
    addItem(form, field) {
      let data = form[field];
      if (data[data.length - 1].premium) data.push({});
      else this.$Message.error("上一条信息请填写完整，再添加下一条");
    },
    reduce(form, field, index) {
      if (index === 0) {
        this.$Message.error("最后一项不可删除！");
        return;
      }
      form[field].splice(index, 1);
    },
    submit(data) {
      Promise.resolve()
        .then(() => {
          let formData = JSON.parse(JSON.stringify(data));
          console.log("formData: ", formData);
          if (formData.id) {
            return Agency.updateAdditionRisk(formData);
          } else {
            return Agency.saveAdditionRisk(formData);
          }
        })
        .then(() => {
          this.getData();
          this.$Message.success("操作成功");
        });
    },
    clear(item) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要清空么",
        onOk: () => {
          Agency.deleteAdditionRisk(item.id).then(() => {
            this.getData();
            this.$Message.info("清空成功");
          });
        }
      });
    },
    constraintChange(data) {
      if (data.insurancePeriodOption === 1 && !data.id) {
        Agency.getInsurancePeriodConstraint(
          this.$route.query.id,
          data.additionRiskId,
          1
        ).then(res => {
          // console.log(res)
          data.insurancePeriodContent = res;
        });
      } else if (data.insurancePeriodRate === 1 && !data.id) {
        Agency.getInsurancePeriodConstraint(
          this.$route.query.id,
          data.additionRiskId,
          2
        ).then(res => {
          data.insurancePeriodContentRate = res;
        });
      }
    },
    addRisk(data) {
      if (this.anchor.includes(data.id)) {
        // 取消选中
        for (const iterator of this.form) {
          if (iterator.additionRiskId === data.id) {
            this.form.splice(this.form.indexOf(iterator), 1);
            return;
          }
        }
      } else {
        // 选中
        let obj = Object.assign({}, defaultForm, {
          productId: this.$route.query.id,
          additionRiskId: data.id,
          additionRiskName: data.productFullName
        });
        this.form.push(obj);
      }
      // this.
    }
  }
};
</script>

