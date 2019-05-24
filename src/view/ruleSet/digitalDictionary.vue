<template>
  <div>
    <Row style="padding-bottom: 10px;">
      <Col span="8">
        <Input v-model="query.name" placeholder="搜索公司" style="width:60%; margin-right: 10px;"/>
        <Button type="info" @click="search()">搜索</Button>
        <Button type="primary" style="margin:0 5px;" @click="edit(0)">新建</Button>
      </Col>
    </Row>
    <Tabs type="card">
      <TabPane label="类别">
        <Row>
          <Col span="6">
            <Card title="Options" icon="ios-options" :padding="0" shadow style="width: 300px;">
              <CellGroup @on-click="clickClass">
                <Cell
                  v-for="(item, index) in list"
                  :key="index"
                  :title="item.supplierName"
                  :name="index"
                />
              </CellGroup>
            </Card>
          </Col>
          <Col span="6">
            <Card title="基础类别列表" icon="ios-options" :padding="0" shadow style="width: 300px;">
              <CellGroup
                v-for="(item, index) in list"
                v-show="show[0] === index"
                :key="index"
                @on-click="clickClassSub"
              >
                <Cell
                  v-for="(unit, unique) in item.vitPolicyDictCategoryVos"
                  :key="unique"
                  :title="unit.dictName"
                  :name="unique"
                />
              </CellGroup>
            </Card>
          </Col>
          <Col span="12">
            <template v-for="(item,index) in list">
              <template v-for="(unit, unique) in item.vitPolicyDictCategoryVos">
                <div v-show="show[0] === index && show[1] === unique">
                  <Button
                    type="primary"
                    size="small"
                    style="display:block; margin:0 5px 5px auto;"
                    @click="create(unit.id)"
                  >新建</Button>
                  <Table
                    :columns="productColumns"
                    :data="unit.vitPolicyDictCategoryValues"
                    :key="unique + '' + index"
                  >
                    <template slot-scope="{ row }" slot="isShow">
                      <RadioGroup v-model="row.isShow">
                        <Radio :label="0" disabled>显示</Radio>
                        <Radio :label="1" disabled>隐藏</Radio>
                      </RadioGroup>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                      <Button
                        type="primary"
                        size="small"
                        style="margin-right: 5px"
                        @click="edit(1, row)"
                      >编辑</Button>
                      <Button type="error" size="small" @click="remove(row, index)">删除</Button>
                    </template>
                  </Table>
                </div>
              </template>
            </template>
          </Col>
        </Row>
      </TabPane>

      <TabPane label="分配">
        <Row>
          <Col span="6">
            <Card title="Options" icon="ios-options" :padding="0" shadow style="width: 300px;">
              <CellGroup @on-click="clickClass">
                <Cell
                  v-for="(item, index) in list"
                  :key="index"
                  :title="item.supplierName"
                  :name="index"
                />
              </CellGroup>
            </Card>
          </Col>

          <Col span="6">
            <Card title="基础类别列表" icon="ios-options" :padding="0" shadow style="width: 300px;">
              <CellGroup
                v-for="(item, index) in list"
                v-show="show[0] === index"
                :key="index"
                @on-click="clickClassSub"
              >
                <Cell
                  v-for="(unit, unique) in item.vitPolicyDictCategoryVos"
                  :key="unique"
                  :title="unit.dictName + index"
                  :name="unique"
                />
              </CellGroup>
            </Card>
          </Col>

          <Col span="6">
            <Card title="现保类别值" icon="ios-options" :padding="0" shadow style="width: 300px;">
              <template v-for="(item,index) in list">
                <template v-for="(unit, unique) in item.vitPolicyDictCategoryVos">
                  <Table
                    v-show="show[0] === index && show[1] === unique"
                    :columns="columns2"
                    :data="unit.vitPolicyDictCategoryValues"
                    :key="unique + '' + index"
                  ></Table>
                </template>
              </template>
            </Card>
          </Col>

          <Col span="6">
            <template v-for="(item,index) in list">
              <Card
                v-show="show[0] === index"
                :title="item.supplierName + '类别值'"
                icon="ios-options"
                :padding="0"
                shadow
                style="width: 300px;"
              >
                <template v-for="(unit, unique) in item.vitPolicyDictCategoryVos">
                  <Table
                    v-show="show[0] === index && show[1] === unique"
                    :columns="columns3"
                    :data="unit.vitPolicyDictCategoryValues"
                    :key="unique + '' + index"
                  >
                    <template slot-scope="{ row }" slot="aa">
                      <Input type="text" v-model="row.aa" placeholder="親輸入类型"></Input>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                      <Button
                        v-if="editIndex === index"
                        type="primary"
                        size="small"
                        style="margin-right: 5px"
                        @click="confirm(row)"
                      >确定</Button>
                      <Button
                        v-else
                        type="primary"
                        size="small"
                        style="margin-right: 5px"
                        @click="edit1(index)"
                      >编辑</Button>
                    </template>
                  </Table>
                </template>
              </Card>
            </template>
          </Col>
        </Row>
      </TabPane>
    </Tabs>

    <dialogBox v-model="dialogShow">
      <template slot="title">添加供应商类别</template>
      <Form ref="form" :model="form" :rules="rules">
        <FormItem>
          <selectSupplier :val="form.name" type="supplier" @change="change"/>
        </FormItem>

        <FormItem prop="dictName">
          <CheckboxGroup v-model="form.dictName">
            <Checkbox label="香蕉"></Checkbox>
            <Checkbox label="苹果"></Checkbox>
            <Checkbox label="西瓜"></Checkbox>
          </CheckboxGroup>
        </FormItem>

        <Button
          type="primary"
          size="small"
          style="display: block; margin: 0 auto"
          @click="submit(0, form)"
        >确定</Button>
      </Form>
    </dialogBox>

    <dialogBox v-model="dialogShowB">
      <template slot="title">数字字典->数值的增加/修改</template>
      <Form ref="formB" :model="formB" :rules="rules">
        <FormItem prop="categoryNumber">
          <Input type="text" v-model="formB.categoryNumber" placeholder="标号"/>
        </FormItem>

        <FormItem prop="categoryValue">
          <Input type="text" v-model="formB.categoryValue" placeholder="数值"/>
        </FormItem>

        <FormItem prop="isShow">
          <RadioGroup v-model="formB.isShow">
            <Radio :label="0">显示</Radio>
            <Radio :label="1">隐藏</Radio>
          </RadioGroup>
        </FormItem>

        <Button
          type="primary"
          size="small"
          style="display: block; margin: 0 auto"
          @click="submit(1, formB)"
        >确定</Button>
      </Form>
    </dialogBox>
  </div>
</template>

<script>
import {
  getPolicyDictCategoryPage,
  deletePolicyDictCategory,
  savePolicyDictCategory,
  savePolicyDictCategoryValue
} from "@/api/rulesSet/policyDictCategory";
import dialogBox from "@/components/dialogBox";
import selectSupplier from "@/components/selectSupplier";

const defautlForm = {
  name: "",
  supplierId: "",
  dictName: []
};
const defautlFormB = {
  dictCategoryId: "", //
  categoryNumber: "", // 标号
  categoryValue: "", // 数值
  isShow: 0 // 0可见,1隐藏
};
export default {
  components: { dialogBox, selectSupplier },
  props: {},
  data() {
    return {
      query: {
        page: 1,
        size: 10,
        name: ""
      },
      // form: Object.assign({}, defautlForm),
      form: {
        name: "",
        supplierId: "",
        dictName: ["香蕉", "西瓜"]
      },
      formB: Object.assign({}, defautlFormB),
      rules: {
        supplierId: [{ required: true, message: "不能为空", trigger: "blur" }],
        dictName: [
          {
            required: true,
            type: "array",
            message: "不能为空",
            trigger: "change"
          }
        ],
        categoryNumber: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        categoryValue: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        isShow: [
          {
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "change"
          }
        ]
      },
      productColumns: [
        {
          title: "标号",
          key: "categoryNumber",
          align: "center"
        },
        {
          title: "类型名称",
          key: "categoryValue",
          align: "center"
        },
        {
          title: "APP端是否显示下级菜单",
          slot: "isShow",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      columns2: [
        {
          title: "标号",
          key: "categoryNumber",
          align: "center"
        },
        {
          title: "类别值",
          key: "categoryValue",
          align: "center"
        }
      ],
      columns3: [
        {
          title: "标号",
          key: "categoryNumber",
          align: "center"
        },
        {
          title: "类别值",
          key: "categoryValue",
          align: "center"
        },
        {
          title: "匹配值",
          slot: "aa",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      loading: false,
      list: [],
      total: 0,
      show: [0, 0],
      dialogShow: false,
      dialogShowB: false,
      editIndex: undefined
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    getData(page) {
      this.loading = true;
      page && (this.query.page = page);
      getPolicyDictCategoryPage(this.query).then(data => {
        console.log(data);
        this.loading = false;
        this.list = data.list;
        this.total = data.total;
      });
    },
    search() {
      this.query.page = 1;
      this.query.size = 10;
      this.getData();
    },
    clickClass(index) {
      this.show[0] = index;
      this.show[1] = 0;
      this.show.splice();
      // console.log(index)
    },
    clickClassSub(index) {
      this.show[1] = index;
      this.show.splice();
    },
    edit(type, item) {
      if (type === 0) {
        this.dialogShow = true;
        this.form = {};
        item && (this.form = Object.assign({}, item));
      } else {
        this.dialogShowB = true;
        this.formB = {};
        item && (this.formB = Object.assign({}, item));
      }
    },
    create(data) {
      this.dialogShowB = true;
      this.formB = { dictCategoryId: data };
    },
    remove(item, index) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除么",
        onOk: () => {
          deletePolicyDictCategory(item.id).then(data => {
            this.getData();
            this.$Message.info("删除成功");
          });
        }
      });
    },
    change(val) {
      this.form.name = val.name;
      this.form.supplierId = val.id;
      // console.log(val)
    },
    submit(type, item) {
      type === 0
        ? this.$refs.form.validate()
        : this.$refs.formB
            .validate()
            .then(() => {
              return type === 0
                ? savePolicyDictCategory(item)
                : savePolicyDictCategoryValue(item);
            })
            .then(data => {
              this.getData();
              this.$Message.success("操作成功");
              this.dialogShow = false;
              this.dialogShowB = false;
            });
    },
    edit1(index) {
      this.editIndex = index;
    },
    confirm(item) {
      savePolicyDictCategoryValue(item).then(data => {
        this.getData();
        this.$Message.success("操作成功");
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
