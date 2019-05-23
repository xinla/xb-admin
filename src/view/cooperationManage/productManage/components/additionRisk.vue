<template>
  <Form ref="form" :label-width="90">
    <Drawer :title="child.show ? '添加强制附加险' : '添加附加险'" :closable="false" v-model="addShow">
        <FormItem :label-width="0">
        <Select ref="select" :value="selectRisk.productFullName" filterable remote :remote-method="search">
          <Option
            v-for="(option, index) in riskList"
            :value="option.productFullName"
            :key="index"
            @click.native="selectChange(option)"
          ></Option>
        </Select>
        <Button type="info" @click="add">添加</Button>
      </FormItem>
    </Drawer>

    <Button type="info" @click="add">添加</Button>
    
    <Row>
      <Col span="3">产品代码</Col>
      <Col span="4">产品名称</Col>
      <Col span="10">附加规则</Col>
    </Row>

    <Row v-for="(item, index) of form" :Key="index">
      <Col span="3">{{item.productCode || "-"}}</Col>
      <Col span="4">{{item.productFullName || "-"}}</Col>
      <Col span="6">
          <FormItem label="强制搭配险种">
            <RadioGroup v-model="item.compulsoryCollocation">
              <Radio :label="0">无</Radio>
              <Radio :label="1">强制搭配</Radio>
            </RadioGroup>
            <Button v-if="item.compulsoryCollocation" type="info" size="small" @click="addChild(index)">添加</Button>
          </FormItem>
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

      <Col span="10">
        <Row v-if="Object.keys(item.child).length && item.compulsoryCollocation">
          <Col span="3">{{item.child.productCode || "-"}}</Col>
          <Col span="4">{{item.child.productFullName || "-"}}</Col>
          <Col span="10">
              <FormItem label="强制搭配险种">
                <RadioGroup v-model="item.child.compulsoryCollocation">
                  <Radio :label="0">无</Radio>
                </RadioGroup>
              </FormItem>
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
      </Col>
      <Col span="1" class="fr">
        <Button type="error" size="small" @click="deleteRow(index)">删除</Button>
       </Col>
      <Divider/>
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
  productFullName: '',
  productCode: '',
  productId: "", // 当pid=0时  为主线产品id   当pid不为0时  为附加险产品id',
  productRiderId: "", // 产品附加险id
  compulsoryCollocation: 0, // 强制搭配险种     0    无   1  强制搭配
  collocationRatio: 0, // 搭配比例    0  无    1   固定    2  不固定
  collocationRatioValue: "", // 搭配比例的值
  insuredLimit: 0, // 保险金额限制    0  无限制    1   有限制
  maxInsured: 0,
  // child: {
  //   // productId: "",
  //   // productRiderId: "",
  //   // compulsoryCollocation: "",
  //   // collocationRatio: "",
  //   // collocationRatioValue: "",
  //   // insuredLimit: "",
  //   // maxInsured: ""
  // }
};

let oldData = ''

export default {
  data() {
    return {
      form: [],
      selectRisk: {
      },
      riskList: [],
      child: {
        show: false,
        index: 0
      },
      addShow: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$route.query.id &&
        getProductRiderByProductId(this.$route.query.id).then(data => {
          console.log('additionRisk', data);
          for (const iterator of data) {
            iterator.child || (iterator.child = {})
          }
          this.form = data;
          
        });
    },
    selectChange(data) {
      this.selectRisk = data
      // console.log(data)
    },
    add() {
      // debugger
      if (!Object.keys(this.selectRisk).length) {
        return
      }
      if (this.child.show) {
        // 添加子附加险
        this.form[this.child.index].child = Object.assign(defaultForm, 
        {
          productFullName: this.selectRisk.productFullName,
          productCode: this.selectRisk.productCode,
          productId: this.form[this.child.index].productRiderId,
          productRiderId: this.selectRisk.id
        })
      } else {
        this.form.push(Object.assign(defaultForm, 
          {
            productFullName: this.selectRisk.productFullName,
            productCode: this.selectRisk.productCode,
            productId: this.$route.query.id,
            productRiderId: this.selectRisk.id,
            child: {}
          })
        )
      }
      this.child.show = false
      // console.log(this.form)
      // console.log(this.selectRisk)
    },
    search(query) {
      // this.$route.query.productForm
      getProductPageByType(1, query).then(data => {
        // console.log(data)
        this.riskList = data
      })
    },
    submit() {
      return Promise.resolve()
        .then(data => {

          let isNew = oldData !== JSON.stringify(this.form)
          oldData = JSON.stringify(this.form)
          let formData = JSON.parse(oldData)
          for (const iterator of formData) {
            Object.keys(iterator.child).length || (iterator.child = null)
          }
          if (isNew){
            if (formData[0].id) {
              return updateProductRider(formData);
            } else {
              return addProductRider(formData);
            }
          }
          // if (data) {
          // }
        })
        .then(() => {
          this.getData();
          return Promise.resolve();
        });
    },
    addChild(index) {
      this.child.show = true
      this.child.index = index
      // this.$refs.select.focus()
      // this.selectRisk.productFullName = ''
    },
    deleteRow(index) {
      this.$Modal.confirm({
          title: '提示',
          content: '确定要删除么',
          onOk: () => {
            this.form.splice(index, 1)
            this.$Message.info('删除成功');
          },
      })
    }
  }
};
</script>

