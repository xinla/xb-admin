<template>
  <div>
    <Tabs type="card" @on-click="show = [0, 0]">
      <TabPane label="类别">
        <Row :gutter="10">
          <Col span="6">
            <Card title="保险企业" :padding="0">
              <CellGroup style="height: calc(100vh - 215px); overflow: auto;">
                <Cell
                  v-for="(item, index) in list"
                  :key="index"
                  :title="item.supplierName"
                  :name="index"
                  :selected="show[0] === index"
                  @click.native="clickClass(index)"
                />
              </CellGroup>
            </Card>
          </Col>
          <Col span="6">
            <Card title="字典" :padding="0">
              <div slot="extra">
                <Button size="small" style="margin-right: 10px;" @click="edit('add')">添加</Button>
                <Button size="small" @click="edit('remove')">删除</Button>
              </div>
              <CellGroup
                v-for="(item, index) in list"
                v-if="show[0] === index"
                :key="item.supplierId"
                style="height: calc(100vh - 215px); overflow: auto;"
              >
                <div v-if="!item.dictVoList || !item.dictVoList.length" class="ac">
                  <br />无字典条目，请添加
                  <br />
                  <br />
                </div>
                <Cell
                  v-for="(unit, unique) in item.dictVoList"
                  :key="unit.id"
                  :title="unit.dictName"
                  :name="unique"
                  :selected="show[1] === unique"
                  @click.native="clickClassSub(unique)"
                />
              </CellGroup>
            </Card>
          </Col>
          <Col span="12">
            <template v-for="(item,index) in list">
              <template v-for="(unit, unique) in item.dictVoList">
                <Card
                  :padding="0"
                  style="padding: 0 15px;"
                  v-show="show[0] === index && show[1] === unique"
                  :key="unit.id"
                >
                  <Table
                    :columns="productColumns"
                    :data="unit.dictValueVoList"
                    :max-height="700"
                  >
                    <template slot-scope="{ row }" slot="categoryNumber">
                      <Input
                        type="text"
                        v-model="row.categoryNumber"
                        :disabled="!row.isEdit"
                        placeholder="请输入代码"
                      />
                    </template>
                    <template slot-scope="{ row }" slot="categoryValue">
                      <Input
                        type="text"
                        v-model="row.categoryValue"
                        :disabled="!row.isEdit"
                        placeholder="请输入标签"
                      />
                    </template>
                    <template slot-scope="{ row }" slot="isShow">
                      <i-switch v-model="row.isShow" :true-value="0" :false-value="1" />
                      <!-- <RadioGroup v-model="row.isShow">
                        <Radio :label="0" :disabled="!row.isEdit">显示</Radio>
                        <Radio :label="1" :disabled="!row.isEdit">隐藏</Radio>
                      </RadioGroup>-->
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                      <template v-if="row.isEdit">
                        <Button
                          type="primary"
                          size="small"
                          ghost
                          style="margin-right: 5px"
                          @click="submitValue(row)"
                        >保存</Button>
                        <Button
                          type="error"
                          size="small"
                          ghost
                          @click="cancle(row, unit.dictValueVoList)"
                        >取消</Button>
                      </template>
                      <template v-else>
                        <Button
                          type="primary"
                          size="small"
                          ghost
                          style="margin-right: 5px"
                          @click="$set(row, 'isEdit', true), eidtObj = JSON.parse(JSON.stringify(row))"
                        >编辑</Button>
                        <Button
                          type="error"
                          size="small"
                          ghost
                          @click="remove(row, unit.dictValueVoList, index)"
                        >删除</Button>
                      </template>
                    </template>
                  </Table>
                  <Button long style="margin: 10px 0;" @click="add(unit)">+ 添加字典</Button>
                </Card>
              </template>
            </template>
          </Col>
        </Row>
      </TabPane>

      <TabPane label="分配">
        <Row :gutter="10">
          <Col span="4">
            <Card title="保险企业" :padding="0">
              <CellGroup style="height: calc(100vh - 215px); overflow: auto;">
                <Cell
                  v-for="(item, index) in list.slice(1)"
                  :key="index"
                  :title="item.supplierName"
                  :name="index"
                  :selected="show[0] === index"
                  @click.native="clickClass(index)"
                />
              </CellGroup>
            </Card>
          </Col>

          <Col span="4">
            <Card title="字典" :padding="0">
              <CellGroup
                v-for="(item, index) in list.slice(1)"
                v-if="show[0] === index"
                :key="item.supplierId"
                style="height: calc(100vh - 215px); overflow: auto;"
              >
                <div v-if="!item.dictVoList || !item.dictVoList.length" class="ac">
                  <br />暂无字典条目
                  <br />
                  <br />
                </div>
                <Cell
                  v-for="(unit, unique) in item.dictVoList"
                  :key="unit.id"
                  :title="unit.dictName"
                  :name="unique"
                  :selected="show[1] === unique"
                  @click.native="getXbDictVlaueList(unit.dictName, unique)"
                />
              </CellGroup>
            </Card>
          </Col>

          <Col span="6">
            <Card :padding="0">
              <Table
                :columns="columns2"
                :data="XbdictValueVoList"
                :max-height="700"
                no-data-text="点击左侧选项卡获取字典项"
              ></Table>
            </Card>
          </Col>

          <Col span="10">
            <Card :padding="0">
              <template v-for="(item,index) in list.slice(1)">
                <template v-for="(unit, unique) in item.dictVoList">
                  <Table
                    v-show="show[0] === index && show[1] === unique"
                    :columns="columns3"
                    :data="unit.dictValueVoList"
                    :key="unit.id"
                    :max-height="700"
                    no-data-text="尚未设置字典项"
                  >
                    <template slot-scope="{ row }" slot="vitValue">
                      <Input
                        type="text"
                        v-model="row.vitValue"
                        :disabled="!row.isEdit"
                        placeholder="请输入对应代码"
                      />
                    </template>
                    <template slot-scope="{ row }" slot="action">
                      <Button
                        v-if="row.isEdit"
                        type="primary"
                        size="small"
                        style="margin-right: 5px"
                        @click="submitValue(row)"
                      >保存</Button>
                      <Button
                        v-else
                        type="primary"
                        size="small"
                        style="margin-right: 5px"
                        @click="$set(row, 'isEdit', true)"
                      >编辑</Button>
                    </template>
                  </Table>
                </template>
              </template>
            </Card>
          </Col>
        </Row>
      </TabPane>
    </Tabs>

    <Modal
      v-model="dialogShow"
      :title="eidtType === 'add' ? '添加' : '删除' + '字典条目'"
      @on-ok="submit()"
    >
      <Form ref="form">
        关连公司：{{list[show[0]] && list[show[0]].supplierName}}
        <FormItem prop="dictName" style="max-width: 
        100%;">
          <CheckboxGroup v-model="form">
            <template v-for="(item, index) in baseClass">
              <Checkbox
                v-if="eidtType === 'add'"
                :label="item.dataName"
                :key="index"
              >{{item.dataName}}</Checkbox>

              <Checkbox
                v-else-if="eidtType === 'remove'"
                :label="item.id"
                :key="item.id"
              >{{item.dictName}}</Checkbox>
            </template>
          </CheckboxGroup>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import * as A from "@/api/rulesSet/policyDictCategory";

export default {
  data() {
    return {
      // query: {
      //   page: 1,
      //   size: 10,
      //   name: ""
      // },
      form: [],
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
          title: "代码",
          slot: "categoryNumber",
          align: "center"
        },
        {
          title: "标签",
          slot: "categoryValue",
          align: "center"
        },
        {
          title: "是否显示",
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
          title: "现保代码",
          key: "categoryNumber",
          align: "center"
        },
        {
          title: "现保标签",
          key: "categoryValue",
          align: "center"
        }
      ],
      columns3: [
        {
          title: "代码",
          key: "categoryNumber",
          align: "center"
        },
        {
          title: "标签",
          key: "categoryValue",
          align: "center"
        },
        {
          title: "对应代码",
          slot: "vitValue",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      list: [],
      show: [0, 0],
      dialogShow: false,
      baseClass: [],
      eidtObj: {},
      eidtType: "",
      XbdictValueVoList: []
    };
  },
  watch: {},
  mounted() {
    this.getData();
  },
  methods: {
    getData(page) {
      // page && (this.query.page = page);
      A.getAllPolicyDictCategory().then(data => {
        // console.log("getAllPolicyDictCategory: ", data);
        this.list = data;
      });
    },
    clickClass(index) {
      this.show[0] = index;
      this.show[1] = 0;
      this.show.splice();
      this.dialogShow = false;
      this.XbdictValueVoList = [];
      // console.log(index)
    },
    clickClassSub(index) {
      this.show[1] = index;
      this.show.splice();
    },
    getXbDictVlaueList(data, index) {
      this.clickClassSub(index);
      A.getPolicyDictCategoryValueList("3390302094096596999", data).then(
        res => {
          this.XbdictValueVoList = res;
        }
      );
    },
    edit(type, item) {
      this.eidtType = type;
      this.form = [];
      this.baseClass = [];
      Promise.resolve()
        .then(res => {
          if (type === "add") {
            return A.getPolicyDictCategoryList(
              this.list[this.show[0]].supplierId
            );
          } else if (type === "remove") {
            return A.getDeleteDictItem(this.list[this.show[0]].supplierId);
          }
        })
        .then(res => {
          this.baseClass = res;
          this.dialogShow = true;
        });
    },
    submit() {
      Promise.resolve()
        .then(() => {
          if (this.eidtType === "add") {
            let array = [];
            for (const iterator of this.form) {
              array.push({
                dictName: iterator,
                supplierId: this.list[this.show[0]].supplierId
              });
            }
            return A.savePolicyDictCategory(array);
          } else if (this.eidtType === "remove") {
            return A.removePolicyDictCategory(this.form);
          }
        })
        .then(data => {
          this.getData();
          this.$Message.success("操作成功");
          this.dialogShow = false;
        });
    },
    submitValue(data) {
      A.savePolicyDictCategoryValue(data).then(res => {
        this.getData();
        this.$Message.success("操作成功");
      });
    },
    add(data) {
      data.dictValueVoList || (data.dictValueVoList = []);
      let len = data.length;
      for (const iterator of data.dictValueVoList) {
        if (iterator.isEdit) {
          this.$Message.error("请保存编辑项后再添加");
          return;
        }
      }
      data.dictValueVoList.push({
        dictCategoryId: data.id,
        isEdit: true,
        isShow: 0,
        supplierId: data.supplierId
      });
    },
    cancle(data, array) {
      if (data.id) {
        data = this.eidtObj;
        array.push();
      } else {
        array.pop();
      }
    },
    remove(data, array, index) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除么",
        onOk: () => {
          A.deletePolicyDictCategoryValue(data.id).then(data => {
            array.splice(index, 1);
            this.$Message.info("删除成功");
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.ivu-input[disabled] {
  background: none;
  border: none;
  color: inherit;
  text-align: center;
}
</style>
