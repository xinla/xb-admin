<template>
  <div>
    <Row style="padding-bottom: 10px;">
      <Col span="8">
        <Input v-model="query.name" placeholder="搜索公司" style="width:60%; margin-right: 10px;"/>
        <Button type="info" @click="search()">搜索</Button>
        <Button type="info" style="margin:0 5px;" @click="edit(0)">新建</Button>
      </Col>
    </Row>
    <Tabs type="card">
      <TabPane label="类别">
        <Row>
          <Col span="6">
            <Card title="品牌" icon="ios-options" :padding="0" shadow style="width: 300px;">
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
                    type="info"
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

      <TabPane label="分配（1.0不考虑）">
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
                style="width: 400px;"
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
      <template slot="title">添加品牌类别</template>
      <Form ref="form" :model="form" :rules="rules">
        <FormItem v-if="dialogShow">
          <selectSupplier :val="form.name" type="brand" @change="change"/>
        </FormItem>请勾选需要编辑的类别
        <FormItem prop="dictName" style="max-width: 
        100%;">
          <CheckboxGroup v-model="form.dictName">
            <Checkbox v-for="(item, index) in baseClass" :label="item" :key="index"></Checkbox>
          </CheckboxGroup>
        </FormItem>

        <FormItem label="继续添加">
          <Input
            type="text"
            v-model.trim="className"
            placeholder="类别名称"
            style="width: 50%;margin-right: 5px"
          />
          <Button type="primary" size="small" @click="add">添加</Button>
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
        dictName: []
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
          minWidth: 60,
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
      editIndex: undefined,
      baseClass: [
        '投保人与被保人的关系',
        "姓名",
        "证件类型",
        "证件号码",
        "证件有效期",
        "性别",
        "生日",
        "婚姻状况",
        "教育程度",
        "国籍",
        "所在地区",
        "详细住址",
        "邮编",
        "家庭电话",
        "手机号",
        "电子邮箱",
        "单位/学校",
        "所在地区",
        "详细住址",
        "职业名称",
        "职务内容",
        "是否兼职",
        "年收入",
        "收入来源",
        "是否有社保",
        "身高",
        "体重",
        "纳税身份声明"
      ],
      className: ""
    };
  },
  watch: {
    dialogShow(val) {
      if (!val) {
        this.cancel();
      }
    },
    dialogShowB(val) {
      if (!val) {
        this.cancel();
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(page) {
      this.loading = true;
      page && (this.query.page = page);
      getPolicyDictCategoryPage(this.query).then(data => {
        console.log('PolicyDictCategoryPage: ', data);
        this.loading = false;
        this.list = data;
        // this.total = data.total;
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
      (type === 0 ? this.$refs.form.validate() : this.$refs.formB.validate())
        .then(data => {
          if (data) {
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
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
    },
    add() {
      if (!this.baseClass.includes(this.className) && this.className) {
        this.baseClass.push(this.className);
        this.className = "";
      } else {
        this.$Message.error("名称为空或已存在");
      }
    },
    cancel() {
      this.$refs.form.resetFields();
      this.$refs.formB.resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.dialog {
  max-width: 620px;
}
</style>
