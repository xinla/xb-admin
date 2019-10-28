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
          <button type="button" class="button" @click="fastShow = true">快速创建</button>
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

    <dialogBox v-model="fastShow">
      <div slot="title">图片上传</div>
      <Form ref="form" :model="form" :rules="rules" :label-width="120">
        <div class="form-title">基本资料</div>
        <Row>
          <Col span="12">
            <FormItem label="产品全称" prop="productFullName">
              <Input type="text" v-model="form.productFullName" placeholder="产品全称" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="产品简称" prop="productAbbr">
              <Input type="text" v-model="form.productAbbr" placeholder="产品简称" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="产品代码" prop="productCode">
              <Input type="text" v-model="form.productCode" placeholder="产品代码" />
            </FormItem>
          </Col>
          <Col span="12">
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
           <template v-for="item of allClass">
        <RadioGroup v-model="form.mediumClass" v-show="form.mainClass === item.id">
          <Radio
            v-for="(unit, index) of item.children"
            :label="unit.id"
            :key="index"
          >{{unit.name}}</Radio>
        </RadioGroup>
      </template>
        </FormItem>

        <FormItem label="所属小类" prop="smallClass">
          <template v-for="item of allClass">
      <div v-for="_item of item.children" :key="_item.id">
        <CheckboxGroup v-model="form.smallClass" v-show="form.mediumClass === _item.id">
          <Checkbox
            v-for="unit of _item.children"
            :key="unit.id"
            :label="unit.id"
          >{{unit.name}}</Checkbox>
        </CheckboxGroup>
      </div>
       </template>
        </FormItem>

        <FormItem label="在售状态" prop="sale">
          <RadioGroup v-model="form.sale">
            <Radio :label="0">停售</Radio>
            <Radio :label="1">在售</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="保险期间">
          <Checkbox
            v-model="form.vitProductInPeriodDto.insurancePeriodYear"
            :true-value="1"
            :false-value="0"
          >年满型</Checkbox>
          <Checkbox
            v-model="form.vitProductInPeriodDto.insurancePeriodAge"
            :true-value="1"
            :false-value="0"
          >岁满型</Checkbox>
          <FormItem label="年满型" v-if="form.vitProductInPeriodDto.insurancePeriodYear">
            <div
              class="bfc-d"
              v-for="(item, index) in form.vitProductInPeriodDto.ruleIntevalDtoList"
              :key="index"
            >
              <template v-if="item.ruleIntervalType === 1">
                <Input
                  type="text"
                  class="input-width"
                  v-model="item.ruleIntervalValue"
                  placeholder="输入年数"
                />年
                <span class="button-circle" @click="reduce('vitProductInPeriodDto', index)">-</span>
              </template>
            </div>
            <span class="button-circle" @click="add('vitProductInPeriodDto', 1)">+</span>
          </FormItem>

          <FormItem label="岁满型" v-if="form.vitProductInPeriodDto.insurancePeriodAge">
            <div
              class="bfc-d"
              v-for="(item, index) in form.vitProductInPeriodDto.ruleIntevalDtoList"
              :key="index"
            >
              <template v-if="item.ruleIntervalType === 0">
                <Input
                  type="text"
                  class="input-width"
                  v-model="item.ruleIntervalValue"
                  placeholder="输入岁数"
                />岁
                <span class="button-circle" @click="reduce('vitProductInPeriodDto', index)">-</span>
              </template>
            </div>
            <span class="button-circle" @click="add('vitProductInPeriodDto', 0)">+</span>
          </FormItem>
        </FormItem>

        <FormItem label="交费期间">
          <Checkbox
            v-model="form.vitProductPayRuleDto.payPeriodAge"
            :true-value="1"
            :false-value="0"
          >岁满型</Checkbox>
          <Checkbox
            v-model="form.vitProductPayRuleDto.payPeriodYear"
            :true-value="1"
            :false-value="0"
          >年满型</Checkbox>
          <FormItem label="年满型" v-if="form.vitProductPayRuleDto.payPeriodYear">
            <div
              class="bfc-d"
              v-for="(item, index) in form.vitProductPayRuleDto.ruleIntevalDtoList"
              :key="index"
            >
              <template v-if="item.ruleIntervalType === 2">
                <Input
                  type="text"
                  class="input-width"
                  v-model="item.ruleIntervalValue"
                  placeholder="输入年数"
                />年
                <span class="button-circle" @click="reduce('vitProductPayRuleDto', index)">-</span>
              </template>
            </div>
            <span class="button-circle" @click="add('vitProductPayRuleDto', 2)">+</span>
          </FormItem>

          <FormItem label="岁满型" v-if="form.vitProductPayRuleDto.payPeriodAge">
            <div
              class="bfc-d"
              v-for="(item, index) in form.vitProductPayRuleDto.ruleIntevalDtoList"
              :key="index"
            >
              <template v-if="item.ruleIntervalType === 3">
                <Input
                  type="text"
                  class="input-width"
                  v-model="item.ruleIntervalValue"
                  placeholder="输入岁数"
                />岁
                <span class="button-circle" @click="reduce('vitProductPayRuleDto', index)">-</span>
              </template>
            </div>
            <span class="button-circle" @click="add('vitProductPayRuleDto', 3)">+</span>
          </FormItem>
        </FormItem>
      </Form>
      <div class="ar">
        <Button style="margin-right: 8px" @click="fastShow = false">取消</Button>
        <Button type="primary" @click="creat">保存</Button>
      </div>
    </dialogBox>
  </div>
</template>

<script>
import {
  getProductPage,
  saleProduct,
  publishProduct,
  deleteProduct,
  fastCreateProductInfo
} from "@/api/product";
import { getAllInsuranceSubclass } from "@/api/rulesSet/type";
import selectSupplier from "@/components/selectSupplier";

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

const defaultForm = {
  name: '',
  productFullName: "", //	string 产品名称
  productAbbr: "", //	string 产品简称
  productCode: "", //	string 产品代码
  supplierId: "", //	string 品牌id
  mainClass: "", //	string 产品大类
  mediumClass: "", //	string 产品中类
  smallClass: [], //	string 产品小类
  sale: 0, //	number 在售状态  0 停售 1 在售  默认为0
  vitProductInPeriodDto: {
    insurancePeriodYear: 0, //	number 保险期间类型   年满型   存1代表年满型存在
    insurancePeriodAge: 0, //	number 保险期间类型   岁满型   存1代表岁满型存在
    type: 0, //	number 保险期间分类   0  按年  1 按天
    ruleIntevalDtoList: [
      {
        ruleIntervalName: "", //	string 投保规则区间名称
        ruleIntervalValue: "", //	string 投保规则区间值
        ruleIntervalType: 0 //	number  0 (保险期间岁满型)      1 (保险期间年满型)
      },
      {
        ruleIntervalName: "", //	string 投保规则区间名称
        ruleIntervalValue: "", //	string 投保规则区间值
        ruleIntervalType: 1 //	number  0 (保险期间岁满型)      1 (保险期间年满型)
      }
    ]
  },
  vitProductPayRuleDto: {
    payPeriodAge: 0, // number  交费期间    岁满型   存1表示年满型有值
    payPeriodYear: 0, // number  交费期间    年满型   存1表示年满型有值
    ruleIntevalDtoList: [
      {
        ruleIntervalName: "", //	string 投保规则区间名称
        ruleIntervalValue: "", //	string 投保规则区间值
        ruleIntervalType: 2 //	number 2  (交费期间年满型)   3(交费期间岁满型)
      },
      {
        ruleIntervalName: "", //	string 投保规则区间名称
        ruleIntervalValue: "", //	string 投保规则区间值
        ruleIntervalType: 3 //	number 2  (交费期间年满型)   3(交费期间岁满型)
      }
    ]
  }
};

export default {
  components: {
    selectSupplier
  },
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
      selectData: [],
      form: JSON.parse(JSON.stringify(defaultForm)),
      fastShow: false,
      rules: {
        productFullName: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        productAbbr: [{ required: true, message: "不能为空", trigger: "blur" }],
        supplierId: [{ required: true, message: "不能为空", trigger: "blur" }],
        name: [{ required: true, message: "不能为空", trigger: "change" }]
      },
      allClass: [
        {
          children: []
        }
      ]
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
        this.allClass = data.children;
        for (const Aiterator of data.children) {
          if (Aiterator.hasChildren) {
            for (const iterator of Aiterator.children) {
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
          }
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
    },
    change(val) {
      this.form.supplierId = val.id;
      // this.form.name = val.name;
      this.$set(this.form, 'name', val.name)
      // console.log(val)
    },
    creat() {
      this.$refs.form
        .validate()
        .then(data => {
          if (data) {
            let formData = Object.assign({}, this.form);
            formData.smallClass += "";
            return fastCreateProductInfo(formData);
          } else {
            this.fastShow = true;
            return Promise.reject();
          }
        })
        .then(res => {
          this.fastShow = true;
          this.$Message.success("操作成功");
          this.form = JSON.parse(JSON.stringify(defaultForm))
          this.getData();
        });
    },
    add(field, type) {
      this.form[field].ruleIntevalDtoList.push({ ruleIntervalType: type });
    },
    reduce(filed, index) {
      if (index === 0) {
        this.$Message.error("最后一项不可删除！");
        return;
      }
      this.form[array].ruleIntevalDtoList.splice(index, 1);
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
/deep/.ivu-form-item .ivu-form-item .ivu-form-item-label {
  min-width: 50px !important;
  width: auto !important;
}
.input-width {
  width: 70px;
}
</style>
