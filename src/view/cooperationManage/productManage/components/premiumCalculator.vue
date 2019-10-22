<style lang="less" scoped>
.box {
  border-bottom: 20px solid #f5f7f9;
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
}
</style>
<template>
  <div style="background: #fff; margin-top: 20px;">
    <div class="box">
      <div ref="applicant" class="title-wrap bfc-o">
        <span id="a1" class="title">基础规则</span>
        <div class="button-wrap fr">
          <button class="button" type="button" @click="submit('form')">保存</button>
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
        <div class="box">
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
        <div class="box">
          <div ref="applicant" class="title-wrap bfc-o">
            <Checkbox
              v-model="currentConfigInfo.checked"
              :true-value="1"
              :false-value="0"
              @on-change="change()"
            ></Checkbox>
            <span id="a1" class="title">{{currentConfigInfo.calItemName}}</span>
            <div class="button-wrap fr">
              <button class="button" type="button" @click="add()">添加选项</button>
              <button class="button" type="button" @click="remove()">删除选项</button>
              <button class="button" type="button" @click="submit('currentConfigInfo')">保存</button>
            </div>
          </div>

          <div style="padding: 0 20px; line-height: 40px;">
            <Row>
              <Col span="11">
                <div>选项配置</div>
              </Col>
              <Col span="9">
                <div>设为默认</div>
              </Col>
              <Col span="4" class="ar">是否显示</Col>
            </Row>

            <div style="position: relative; max-height: 300px; min-height: 150px; overflow: auto;">
              <Row v-for="(item, index) in currentConfigInfo.configItems" :key="index">
                <Col span="1">
                  <CheckboxGroup v-model="selected">
                    <Checkbox :label="index">{{null}}</Checkbox>
                  </CheckboxGroup>
                </Col>
                <Col span="10">
                  <!-- 领取年龄 -->
                  <template v-if="currentConfigInfo.calItemTag === 9">
                    <Select v-model="item.unit">
                      <Option :value="0">不限性别</Option>
                      <Option :value="1">男性</Option>
                      <Option :value="2">女性</Option>
                    </Select>
                  </template>
                  <!-- 交费方式 -->
                  <template v-if="currentConfigInfo.calItemTag === 15">{{item.unit}}</template>

                  <template v-if="show(currentConfigInfo.calItemTag)">
                    <Input
                      type="text"
                      style="width: 150px;"
                      v-model="item.option"
                      placeholder="请输入"
                    />
                  </template>
                  <!-- 投保份数 -->
                  <template v-if="currentConfigInfo.calItemTag === 1">份</template>
                  <!-- 性别/领取方式-->
                  <template v-if="currentConfigInfo.calItemTag === 4 || currentConfigInfo.calItemTag === 11">{{item.option}}</template>
                  <!-- 保费/保险金额 -->
                  <template
                    v-if="currentConfigInfo.calItemTag === 12 || currentConfigInfo.calItemTag === 10"
                  >
                    <Select v-model="item.unit">
                      <Option :value="0">万元</Option>
                      <Option :value="1">元</Option>
                      <Option :value="2">元/每天</Option>
                    </Select>
                  </template>
                  <!-- 职业类别 -->
                  <template v-if="currentConfigInfo.calItemTag === 8">类</template>
                  <!-- 领取期间 -->
                  <template v-if="currentConfigInfo.calItemTag === 8">年</template>
                  <!-- 投保档次 -->
                  <template v-if="currentConfigInfo.calItemTag === 3">档</template>
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

const defaultConfigInfo = {
  checked: 0,
  isShow: 0,
  rateFactor: 0,
  define: 0,
  configItems: []
};
export default {
  components: {},
  props: {},
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
        { productId: this.$route.query.id },
        defaultConfigInfo
      ),
      selected: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let id = this.$route.query.id;
      if (id) {
        Agency.getCalculatorBase(id).then(res => {
          console.log("calculatorBase: ", res);
          this.form = res;
        });
        Agency.getAllCalculatorItem(id).then(res => {
          console.log("AllCalculatorItem: ", res);
          this.configTagList = res;
        });
      }
    },
    submit(form) {
      let formData = this[form];
      Promise.resolve()
        .then(() => {
          switch (form) {
            case "form":
              return formData.id
                ? Agency.updateCalculator(formData)
                : Agency.saveCalculator(formData);
              break;
            case "currentConfigInfo":
              return formData.id
                ? Agency.updateCalculatorItemInfo(formData)
                : Agency.saveCalculatorItemInfo(formData);
              break;
          }
        })
        .then(() => {
          this.getData();
          this.$Message.success("操作成功");
        });
    },
    // 配置项切换
    switchTo(data) {
      this.current = data.id;
      Agency.getCalculatorItemInfo(this.$route.query.id, data.id).then(res => {
        console.log("currentConfigInfo: ", res);
        if (res) {
          this.currentConfigInfo = res;
        } else {
          this.currentConfigInfo = Object.assign(
            {
              productId: this.$route.query.id,
              calItemId: data.id,
              calItemName: data.name,
              calItemTag: data.tag
            },
            defaultConfigInfo
          );
          this.$Message.success("暂无该项相关规则信息");
        }
      });
    },
    // 配置项勾选
    change() {
      Agency.getCalculatorItemInfo(this.currentConfigInfo).then(res => {
        this.currentConfigInfo.checked = 0;
        this.$Message.success("ok");
      });
    },
    // 设置默认选项交互
    changeSwitch(data) {
      let array = this.currentConfigInfo.configItems;
      for (let index = 0, len = array.length; index < len; index++) {
        if (index !== data) {
          array[index].isDefault = 0;
        }
      }
    },
    // 添加配置项选项
    add() {
      let form = this.currentConfigInfo.configItems;
      if (!form) {
        this.currentConfigInfo.configItems = form = [];
      }
      form.push({});
    },
    // 删除配置项选项
    remove() {
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
      // return data === 0 || data === 1 || data === 6 || data === 5 || data === 8 || data === 10  || data === 7 || data === 13 || data === 14 || data === 9 || data === 3 || data === 15
      return data !== 2 && data !== 4 && data !== 11;
    }
  }
};
</script>
