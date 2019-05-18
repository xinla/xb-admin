<template>
  <Form ref="form" :label-width="80">
    <FormItem label="添加附加险">
      <Select filterable remote :remote-method="search" style="width:30%;">
        <Option
          v-for="(option, index) in riskList"
          :value="option.productFullName"
          :key="index"
          @click.native="selectChange(option)"
        ></Option>
      </Select>
      <Button type="info" @click="add">添加</Button>
    </FormItem>

    <Row>
      <Col span="3">产品代码</Col>
      <Col span="4">产品名称</Col>
      <Col span="10">附加规则</Col>
    </Row>
<Row v-for="(item, index) of form" :Key="index">
      <Col span="3">{{item.name}}-</Col>
      <Col span="4">{{item.code}}-</Col>
      <Col span="6">
          <FormItem label="强制搭配险种">
            <RadioGroup v-model="item.compulsoryCollocation">
              <Radio :label="0">无</Radio>
            </RadioGroup>
          </FormItem>
          <span>添加</span>
          <FormItem label="搭配比例">
            <RadioGroup v-model="item.collocationRatio">
              <Radio :label="0">无</Radio>
              <Radio :label="1">固定</Radio>
              <Radio :label="2">不固定</Radio>
            </RadioGroup>
          </FormItem>
          {{item.child.collocationRatio === 1 ? "固定" : ""}}
          {{item.child.collocationRatio === 2 ? "最高" : ""}}
           比例：
          <Input type="text" style="width:100px;" v-model="item.collocationRatioValue" placeholder="比例"/>

          <FormItem label="保险金额限制" prop="site">
            <RadioGroup v-model="item.insuredLimit">
              <Radio :label="0">无</Radio>
              <Radio :label="1">有</Radio>
            </RadioGroup>
          </FormItem>最高限额：
          <Input type="number" :number="true" style="width:100px;" v-model="item.maxInsured" placeholder="最高限额"/>
      </Col>
      <Col span="11">
        <Row>
          <Col span="3">{{item.child.name}}</Col>
          <Col span="4">{{item.child.code}}</Col>
          <Col span="10">
              <FormItem label="强制搭配险种">
                <RadioGroup v-model="item.child.compulsoryCollocation">
                  <Radio :label="0">无</Radio>
                </RadioGroup>
              </FormItem>
              <span>添加</span>
              <FormItem label="搭配比例">
                <RadioGroup v-model="item.child.collocationRatio">
                  <Radio :label="0">无</Radio>
                  <Radio :label="1">固定</Radio>
                  <Radio :label="2">不固定</Radio>
                </RadioGroup>
              </FormItem>
              {{item.child.collocationRatio === 1 ? "固定" : ""}}
              {{item.child.collocationRatio === 2 ? "最高" : ""}}
              比例：
              <Input type="text" style="width:100px;" v-model="item.child.collocationRatioValue" placeholder="比例"/>

              <FormItem label="保险金额限制" prop="site">
                <RadioGroup v-model="item.child.insuredLimit">
                  <Radio :label="0">无</Radio>
                  <Radio :label="1">有</Radio>
                </RadioGroup>
              </FormItem>最高限额：
              <Input type="number" :number="true" style="width:100px;" v-model="item.child.maxInsured" placeholder="最高限额"/>
          </Col>
        </Row>
      </col>
    </Row>
    
    <!-- <FormItem label="附加险" prop="shortName">
      <Select v-model="model1" style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </FormItem> -->

  </Form>
</template>

<script>
import { getProductRiderByProductId, addProductRider, updateProductRider } from '@/api/product/rider'
import { getProductPageByType } from '@/api/product'

const defaultForm = {
  name: '',
  code: '',
  productId: "", // 当pid=0时  为主线产品id   当pid不为0时  为附加险产品id',
  productRiderId: "", // 产品附加险id
  compulsoryCollocation: 0, // 强制搭配险种     0    无   1  强制搭配
  collocationRatio: 0, // 搭配比例    0  无    1   固定    2  不固定
  collocationRatioValue: "", // 搭配比例的值
  insuredLimit: 0, // 保险金额限制    0  无限制    1   有限制
  maxInsured: 0,
  child: {
    productId: "",
    productRiderId: "",
    compulsoryCollocation: "",
    collocationRatio: "",
    collocationRatioValue: "",
    insuredLimit: "",
    maxInsured: ""
  }
};

let oldData = ''

export default {
  data() {
    return {
      form: [],
      selectRisk: {},
      riskList: []
    };
  },
  mounted() {
    this.form.productId = this.$route.query.id;
    this.getData();
  },
  methods: {
    getData() {
      this.form.productId &&
        getProductRiderByProductId(this.form.productId).then(data => {
          console.log(data);
          this.form = data;
        });
    },
    selectChange(data) {
      this.selectRisk = data
    },
    add() {
      // debugger
      this.form.push(Object.assign(defaultForm, 
        {
          name: this.selectRisk.productFullName,
          code: this.selectRisk.productCode
        })
      )
      // console.log(this.form)
      // console.log(this.selectRisk)
    },
    search(query) {
      // this.$route.query.productForm
      getProductPageByType(this.$route.query.productForm, query).then(data => {
        // console.log(data)
        this.riskList = data
      })
    },
    submit() {
      this.form.productId = this.$route.query.id
      return Promise.resolve()
        .then(data => {
          if (data) {

            let isNew = oldData !== JSON.stringify(this.form)
            oldData = JSON.stringify(this.form)

            if (isNew){
              if (this.form.id) {
                // console.log(1)
                return updateProductRider(this.form);
              } else {
                return addProductRider(this.form);
              }
            }
          }
        })
        .then(() => {
          // this.getData();
          return Promise.resolve();
        });
    }
  }
};
</script>

