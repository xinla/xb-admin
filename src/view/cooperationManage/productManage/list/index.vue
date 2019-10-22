<template>
  <div>
    <Row style="padding-bottom: 10px;">
      <Col span="6">
        <Input
          v-model="query.searchValue"
          placeholder="搜索品牌/产品名称/代码"
          style="width:73%; margin-right: 10px;"
        />
        <Button type="info" @click="search()">搜索</Button>
      </Col>
      <Col span="18">
        <div class="fr">
          <button type="button" class="button" @click="goPage('createProduct', {create: true})">新建</button>
          <button type="button" class="button" @click="goPage('createProduct', {create: true})">快速创建</button>
          <button type="button" class="button" @click="handle('edit')">编辑</button>
          <button type="button" class="button" @click="handle('publish', 1)">发布</button>
          <button type="button" class="button" @click="handle('publish', 0)">撤回</button>
          <button type="button" class="button" @click="handle('sale', 0)">停售</button>
          <button type="button" class="button" @click="handle('sale', 1)">恢复销售</button>
          <button type="button" class="button" @click="handle('remove')">删除</button>
        </div>
      </Col>
    </Row>

    <Table :loading="loading" :columns="columns" :data="list" @on-selection-change="selectChange">
      <!-- <template slot-scope="{ row }" slot="age">
          {{row.applicationAgeStart + '-' + row.applicationAgeEnd + '周岁'}}
      </template>-->

      <template slot-scope="{ row }" slot="sale">{{row.sale === 1 ? '在售' : '停售'}}</template>

      <template slot-scope="{ row }" slot="publishStatus">{{row.publish | publishStatus}}</template>

      <template
        slot-scope="{ row }"
        slot="onlineInsurance"
      >{{row.onlineInsurance === 1 ? '支持' : '不支持'}}</template>
    </Table>

    <Page
      :total="total"
      show-elevator
      show-total
      style="text-align:center;margin-top:20px;"
      @on-change="getData"
    />

    <!-- <Modal v-model="modal11" fullscreen title="Fullscreen Modal">
      <Form ref="form" :model="form" :rules="rules" :label-width="120">
        <div class="form-title">基本资料</div>
        <Row>
          <Col span="8">
            <FormItem label="产品全称" prop="productFullName">
              <Input type="text" v-model="form.productFullName" placeholder="产品全称" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="产品简称" prop="productAbbr">
              <Input type="text" v-model="form.productAbbr" placeholder="产品简称" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="产品代码" prop="productCode">
              <Input type="text" v-model="form.productCode" placeholder="产品代码" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="所属品牌" prop="name">
              <selectSupplier :val="form.name" type="brand" @change="change" />
            </FormItem>
          </Col>
        </Row>

        <FormItem label="所属大类" prop="mainClass">
          <RadioGroup v-model="form.mainClass">
            <Radio v-for="(item, index) of allClass" :label="item.id" :key="index">{{item.name}}</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="所属中类" prop="mediumClass">
          <RadioGroup v-model="form.mediumClass">
            <Radio
              v-for="(item, index) of allClass[0].children"
              :label="item.id"
              :key="index"
            >{{item.name}}</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="所属小类" prop="smallClass">
          <div v-for="(item, index) of allClass[0].children" :key="index">
            <CheckboxGroup v-model="form.smallClass" v-show="form.mediumClass === item.id">
              <Checkbox
                v-for="(unit, unique) of item.children"
                :key="unique"
                :label="unit.id"
              >{{unit.name}}</Checkbox>
            </CheckboxGroup>
          </div>
        </FormItem>

        <FormItem label="在售状态" prop="sale">
          <RadioGroup v-model="form.sale">
            <Radio :label="0">停售</Radio>
            <Radio :label="1">在售</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="保险期间" v-show="periodForm.type === 0">
          <Checkbox v-model="periodForm.insurancePeriodYear" :true-value="1" :false-value="0">年满型</Checkbox>
          <Checkbox v-model="periodForm.insurancePeriodAge" :true-value="1" :false-value="0">岁满型</Checkbox>
          <FormItem label="年满型" v-if="periodForm.insurancePeriodYear">
            <div class="bfc-d" v-for="(item, index) in periodForm.ruleIntevalDtoList" :key="index">
              <template v-if="item.ruleIntervalType === 1">
                <InputNumber :min="0" :max="120" v-model="periodForm.renewalAge" placeholder="输入年数"></InputNumber>年
                <span class="button-circle">-</span>
              </template>
            </div>
            <span class="button-circle">+</span>
          </FormItem>

          <FormItem label="岁满型" v-if="periodForm.insurancePeriodAge">
            <div class="bfc-d" v-for="(item, index) in periodForm.ruleIntevalDtoList" :key="index">
              <template v-if="item.ruleIntervalType === 0">
                <InputNumber :min="0" :max="120" v-model="periodForm.renewalAge" placeholder="输入岁数"></InputNumber>岁
                <span class="button-circle">-</span>
              </template>
            </div>
            <span class="button-circle">+</span>
          </FormItem>
        </FormItem>

        <FormItem label="交费期间">
          <Checkbox v-model="paymentForm.payPeriodAge" :true-value="1" :false-value="0">岁满型</Checkbox>
          <Checkbox v-model="paymentForm.payPeriodYear" :true-value="1" :false-value="0">年满型</Checkbox>
          <FormItem label="年满型" v-if="paymentForm.payPeriodYear">
            <div class="bfc-d" v-for="(item, index) in paymentForm.ruleIntevalDtoList" :key="index">
              <template v-if="item.ruleIntervalType === 2">
                <InputNumber
                  :min="0"
                  :max="120"
                  v-model="paymentForm.renewalAge"
                  placeholder="输入年数"
                ></InputNumber>年
                <span class="button-circle">-</span>
              </template>
            </div>
            <span class="button-circle">+</span>
          </FormItem>

          <FormItem label="岁满型" v-if="paymentForm.payPeriodAge">
            <div class="bfc-d" v-for="(item, index) in paymentForm.ruleIntevalDtoList" :key="index">
              <template v-if="item.ruleIntervalType === 3">
                <InputNumber
                  :min="0"
                  :max="120"
                  v-model="paymentForm.renewalAge"
                  placeholder="输入岁数"
                ></InputNumber>岁
                <span class="button-circle">-</span>
              </template>
            </div>
            <span class="button-circle">+</span>
          </FormItem>
        </FormItem>
      </Form>
    </Modal> -->
  </div>
</template>

<script>
import {
  getProductPage,
  saleProduct,
  publishProduct,
  deleteProduct
} from "@/api/product";
import { getAllInsuranceSubclass } from "@/api/rulesSet/type";

// const channel = [
//   {
//     label: "经代",
//     value: 0
//   },
//   {
//     label: "互联网",
//     value: 1
//   },
//   {
//     label: "个险",
//     value: 2
//   },
//   {
//     label: "银保",
//     value: 3
//   }
// ];
const supplierName = [];
const mediumClass = [];
const smallClass = [];
const saleStatus = [
  {
    label: "停售",
    value: 0
  },
  {
    label: "在售",
    value: 1
  }
];
const publishStatus = [
  {
    label: "未发布",
    value: 0
  },
  {
    label: "已发布",
    value: 1
  }
];
const onlineInsurance = [
  {
    label: "不支持",
    value: 0
  },
  {
    label: "支持",
    value: 1
  }
];
export default {
  filters: {
    supplierName(val) {
      if (val != "" && val != "null") {
        return supplierName[val].label;
      }
    },
    publishStatus(val) {
      return publishStatus[val].label;
    }
  },
  data() {
    return {
      loading: true,
      query: {
        pageNum: 1, // 每一页大小
        pageSize: 10, // 页码
        searchValue: "", // 模糊查询值
        mediumClassId: "", // 产品中类id
        smallClassId: "", // 产品小类id
        supplierId: "", // 品牌id
        sale: "", // 在售状态  0 停售 1 在售
        publish: "", // 0 未发布  1 已发布
        onlineInsurance: "" // 是否支持在线投保   0  不支持  1 支持
      },
      columns: [
        {
          type: "selection",
          align: "center",
          maxWidth: 60
        },
        {
          title: "产品代码",
          key: "productCode",
          align: "center"
        },
        {
          title: "产品名称",
          key: "productFullName",
          align: "center",
          minWidth: 80
        },
        {
          title: "所属中类",
          key: "mediumClassName",
          align: "center",
          minWidth: 40,
          filters: mediumClass,
          filterMultiple: true,
          filterMethod(value, row) {
            return row.mediumClass.includes(value);
          }
        },
        {
          title: "所属小类",
          key: "smallClassName",
          align: "center",
          minWidth: 80,
          filters: smallClass,
          filterMultiple: true,
          filterMethod(value, row) {
            return row.smallClass.includes(value);
          }
        },
        {
          title: "所属品牌",
          key: "supplierName",
          align: "center",
          minWidth: 80,
          filters: supplierName,
          filterMultiple: false,
          filterMethod(value, row) {
            return row.supplierName === value;
          }
        },
        // {
        //     title: '投保年龄',
        //     slot: 'age',
        //     align: 'center'
        // },
        // {
        //     title: '投保期限',
        //     key: 'applicationDuration',
        //     align: 'center'
        // },
        {
          title: "在售状态",
          slot: "sale",
          minWidth: 20,
          align: "center",
          filters: saleStatus,
          filterMultiple: false,
          filterMethod(value, row) {
            return row.sale === value;
          }
        },
        {
          title: "发布状态",
          slot: "publishStatus",
          minWidth: 20,
          align: "center",
          filters: publishStatus,
          filterMultiple: false,
          filterMethod(value, row) {
            return row.publish === value;
          }
        },
        {
          title: "在线投保",
          slot: "onlineInsurance",
          minWidth: 20,
          align: "center",
          filters: onlineInsurance,
          filterMultiple: false,
          filterMethod(value, row) {
            return row.onlineInsurance === value;
          }
        }
      ],
      list: [],
      total: 0,
      selectData: []
    };
  },
  mounted() {
    // deleteProduct('2297837298202443782', this.$store.state.user.userId).then(res => {
    //           this.getData();
    //           this.$Message.success("操作成功");
    //         });
    this.init();
  },
  methods: {
    init() {
      this.getData();
      // 获取产品分类数据
      getAllInsuranceSubclass(1).then(data => {
        console.log("TypeRule", data);
        let temp = data.children[0].children;
        for (const iterator of temp) {
          if (iterator.hasChildren) {
            for (const _iterator of iterator.children) {
              smallClass.push({
                label: _iterator.name,
                value: _iterator.id
              });
            }
          }
          mediumClass.push({
            label: iterator.name,
            value: iterator.id
          });
        }
      });
    },
    getData(pageNum) {
      this.loading = true;
      pageNum && (this.query.pageNum = pageNum);
      getProductPage(this.query).then(data => {
        console.log(data);
        this.loading = false;
        this.list = data.list;
        this.total = ~~data.total;
      });
    },
    search() {
      this.query.pageNum = 1;
      this.getData();
    },
    goPage(name, query) {
      this.$router.push({ name, query });
    },
    sale(data, status) {
      saleProduct(data, status).then(res => {
        this.$Message.info("执行成功");
        this.getData();
      });
    },
    publish(data, status) {
      publishProduct(data, status, this.$store.state.user.userId).then(res => {
        this.$Message.info("执行成功");
        this.getData();
      });
    },
    remove(data) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除吗",
        onOk: () => {
          deleteProduct(data, this.$store.state.user.userId).then(res => {
            this.getData();
            this.$Message.success("操作成功");
          });
        }
      });
    },
    selectChange(selection) {
      this.selectData = selection;
    },
    handle(type, status) {
      // type: 0:上移 1:下移 2:删除应用
      // isSingle: 是否单选
      if (!this.selectData.length) {
        this.$Notice.destroy();
        this.$Notice.warning({
          title: "请选择应用"
        });
        return;
      }
      if (type == "edit" && this.selectData.length > 1) {
        this.$Notice.destroy();
        this.$Notice.warning({
          title: "只支持操作一种应用"
        });
        return;
      }
      let data = [];
      for (const iterator of this.selectData) {
        data.push(iterator.id);
        if (type === "remove" && iterator.sale) {
          this.$Message.error("选项存在在售产品，不可删除，请知悉");
          return;
        }
      }
      switch (type) {
        case "edit":
          this.goPage("createProduct", {
            id: this.selectData[0].id,
            edit: true
          });
          break;
        case "publish":
          this.publish(data, status);
          break;
        case "sale":
          this.sale(data, status);
          break;
        case "remove":
          this.remove(data);
          break;
      }
      this.selectData = [];
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  padding: 0px 0px 20px 10px;
  font-size: 20px;
}
.button {
  padding: 10px 30px;
  margin-right: 10px;
  border: 1px solid #ddd;
  cursor: pointer;
}
</style>
