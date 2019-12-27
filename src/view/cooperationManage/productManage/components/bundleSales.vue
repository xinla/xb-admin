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
  // .button {
  //   margin-right: 10px;
  //   line-height: 1;
  // }
}

.anchor-wrap {
  background: #fff;
  margin-right: 10px;
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
// 二级表单项设置
/deep/.ivu-form-item .ivu-form-item {
  margin-bottom: 10px;
}
/deep/.ivu-form-item .ivu-form-item .ivu-form-item-label {
  min-width: 70px !important;
  width: auto !important;
  // text-align: left;
}
/deep/.ivu-form-item .ivu-form-item .ivu-form-item-content {
  margin-left: 70px !important;
}
.sale-item{
  line-height: 26px;
  padding: 10px 20px;
  .name{
    font-size: 14px;
    font-weight: 600;
    margin-right: 10px;
  }
}
</style>
<template>
  <div>
    <!-- <Row>
      <Col span="4">
        <ul class="anchor-wrap">
          <template v-for="(item, index) in additionRiskList">
            <li
              v-if="item.id !== $route.query.id"
              :class="['anchor', 'cp', {'current': current == item.id}]"
              :key="index"
              @click="switchRisk(item)"
            >
              <span v-if="anchor.includes(item.id)">√</span>
              {{item.productFullName}}
            </li>
          </template>
        </ul>
      </Col>
      <Col
        ref="scroll"
        span="20"
        style="background: #fff; position: absolute; right: 0; overflow: auto; transition: all 1s;"
      >
      </Col>
    </Row> -->
        <div class="box">
          <div ref="nav" class="title-wrap bfc-o">
            <!-- <span class="title">{{currentRisk.productFullName}}</span> -->
            <div class="button-wrap">
              <Button class="button" @click="showForm(0)">添加险种</Button>
            </div>
          </div>

          <div v-for="(item, index) in bandleRules" :key="index">
            <div class="sale-item bw bfc-o">
              <em class="name">{{item.productName}}</em>
              <sub :style="{'fontSize': '12px', color: item.status ? 'gray' : 'green' }">{{['正在进行', '已结束'][item.status]}}</sub>
              <div class="fr">
                <Button type="primary" size="small" style="margin-right: 10px;" @click="showForm(item)">规则设置</Button>
                <Button type="primary" size="small" style="margin-right: 10px;" class="button" @click="clear(item)">删除</Button>
              </div>
            </div>
          </div>

          <dialogBox v-model="formShow">
            <div slot="title">{{form.id ? form.productName : '添加险种'}}</div>

            <Form
              ref="form"
              :model="form"
              :rules="rules"
              label-position="left"
              :label-width="80"
              style="width: 500px;"
            >
              <FormItem label="险种名称" prop="bindProductId" v-show="!form.id">
                <Select v-model="form.bindProductId" placeholder="请选择险种名称">
                  <template v-for="(item, index) in additionRiskList">
                    <Option
                      v-if="item.id !== form.productId"
                      :value="item.id"
                      :key="index"
                    >{{item.productFullName}}</Option>
                  </template>
                </Select>
              </FormItem>

              <FormItem label="规则名称" prop="activityName">
                <Input v-model="form.activityName" placeholder="请输入名称" />
              </FormItem>

              <FormItem label="价格策略" prop="priceStrategy">
                <RadioGroup v-model="form.priceStrategy">
                  <Radio
                    v-for="(unit, index) of ['赠送', '优惠', '原价']"
                    :label="index"
                    :key="index"
                  >{{unit}}</Radio>
                </RadioGroup>
              </FormItem>

              <FormItem label="折扣率" prop="discountRate">
                <Input v-model="form.discountRate" placeholder="请输入折扣率" />
              </FormItem>

              <FormItem label="产品要素">
                <FormItem label="份数">
                  <Input
                    v-model="form.copies"
                    style="width: 90%; margin-right: 10px;"
                    placeholder="请输入"
                  />份
                </FormItem>
                <FormItem label="档次">
                  <Input
                    v-model="form.grade"
                    style="width: 90%; margin-right: 10px;"
                    placeholder="请输入"
                  />档
                </FormItem>
                <FormItem label="保额">
                  <Input
                    v-model="form.coverage"
                    style="width: 90%; margin-right: 10px;"
                    placeholder="请输入"
                  />元
                </FormItem>
                <FormItem label="交费期间">
                  <Input v-model="form.paymentPeriod" style="width: 60%;" placeholder="请输入" />
                  <Select v-model="xForm.paymentPeriod" style="width: 35%; margin-left: 5%;">
                    <Option :value="0">年</Option>
                    <Option :value="1">岁</Option>
                  </Select>
                </FormItem>
                <FormItem label="保险期间">
                  <Input v-model="form.policyPeriod" style="width: 60%;" placeholder="请输入" />
                  <Select v-model="xForm.policyPeriod" style="width: 35%; margin-left: 5%;">
                    <Option :value="0">年</Option>
                    <Option :value="1">岁</Option>
                  </Select>
                </FormItem>
              </FormItem>

              <FormItem label="开始时间" prop="startTime">
                <Date-picker
                  :value="form.startTime"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  placeholder="设置时间"
                  @on-change="startTimeChange"
                ></Date-picker>
              </FormItem>

              <FormItem label="结束时间" prop="name">
                <Date-picker
                  :value="form.endTime"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  placeholder="设置时间"
                  @on-change="endTimeChange"
                ></Date-picker>
              </FormItem>

              <FormItem label="捆绑方式">
                <RadioGroup v-model="form.bindType">
                  <Radio
                    v-for="(unit, index) of ['强制捆绑', '客户自选']"
                    :label="index"
                    :key="index"
                  >{{unit}}</Radio>
                </RadioGroup>
              </FormItem>
            </Form>
            <div class="demo-drawer-footer ar">
              <Button @click="formShow = false" style="margin-right: 10px;">取消</Button>
              <Button type="primary" @click="submit()">确定</Button>
            </div>
          </dialogBox>
        </div>
  </div>
</template>

<script>
import * as A from "@/api/product/bind";
import { getAdditionRiskList } from "@/api/product/addition";
import { getProductPageByType } from "@/api/product";

const defaultForm = {
  id: "",
  productId: "",
  productName: "",
  bindProductId: "", //	number 绑定的产品id
  activityName: "", //	string 活动名称
  priceStrategy: "", //	number 价格策略 0 赠送 1优惠 2 原价
  discountRate: "", //	string 折扣率
  copies: "", //	number 份数
  grade: "", //	number 档次
  coverage: "", //	string 保额
  paymentPeriod: "", //	string 交费期间
  policyPeriod: "", //	string 保险期间
  startTime: "", //	string 开始时间
  endTime: "", //	string 结束时间
  bindType: "" //	number 捆绑方式  0 自动捆绑  1  客户勾选
};

export default {
  data() {
    return {
      form: { ...defaultForm, productId: this.$route.query.id },
      xForm: { paymentPeriod: 0, policyPeriod: 0 },
      selectRisk: [],
      bandleRules: [],
      formShow: false,
      additionRiskList: [],
      anchor: [],
      current: "",
      // currentRisk: {},
      rules: {
        // bindProductId: [
        //   { required: true, message: "不能为空", trigger: "change" }
        // ],
        // activityName: [
        //   { required: true, message: "不能为空", trigger: "blur" }
        // ],
        // priceStrategy: [
        //   {
        //     required: true,
        //     type: "number",
        //     message: "不能为空",
        //     trigger: "change"
        //   }
        // ],
        // discountRate: [
        //   { required: true, message: "不能为空", trigger: "blur" }
        // ],
        // startTime: [
        //   {
        //     required: true,
        //     message: "不能为空",
        //     trigger: "change"
        //   }
        // ]
      }
    };
  },
  mounted() {
    // 获取附加险列表
    //  || "2252792750044872711"
    getAdditionRiskList(this.$route.query.supplierId).then(res => {
      console.log("additionRiskList ", res);
      this.additionRiskList = res;
    });

    this.getData();
  },
  methods: {
    getData(id) {
      this.$route.query.id && A.getBindList(this.$route.query.id).then(data => {
        console.log("getBindList", data);
        this.bandleRules = data;
      });
    },
    submit() {
      // console.log(data);
      this.$refs.form
        .validate(valid => {
          return valid
        })
        .then((res) => {
          if (res) {
            let formData = { ...this.form };
            this.xForm.paymentPeriod && (formData.paymentPeriod += "@");
            this.xForm.policyPeriod && (formData.policyPeriod += "@");
            // console.log("formData: ", formData);
            return A.saveBind(formData);
          } else {
            return Promise.reject();
          }
        })
        .then(() => {
          this.formShow = false;
          this.getData();
          this.$Message.success("操作成功");
        });
    },
    clear(item) {
      // console.log(item)
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除么",
        onOk: () => {
          A.deleteBind(item.id).then(() => {
            this.getData();
            this.$Message.info("删除成功");
          });
        }
      });
    },
    // switchRisk(data) {
    //   console.log(data);
    //   this.currentRisk = data;
    //   this.getData(data.id);
    // },
    showForm(data) {
      this.$refs.form.resetFields()
      this.formShow = true;
      if (data) {
        this.form = {...data}
        let arr = ['paymentPeriod', 'policyPeriod']
        for (const iterator of arr) {
          if (this.form[iterator].includes('@')) {
            this.xForm[iterator] = 1
            this.form[iterator].replace('@', '')
          } else {
            this.xForm[iterator] = 0
          }
        }
      } else {
        this.form = {...defaultForm, productId: this.$route.query.id}
      }
    },
    startTimeChange(data) {
      // console.log(data)
      this.form.startTime = data;
    },
    endTimeChange(data) {
      // console.log(data)
      this.form.endTime = data;
    }
  }
};
</script>

