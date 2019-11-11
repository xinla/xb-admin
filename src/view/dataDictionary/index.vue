<template>
  <div>
    <Row>
      <Col span="12">
        <Input
          v-model.trim="query.keyword"
          placeholder="输入键和值的关键字并按回车键进行搜索"
          style="width:73%; margin-right: 10px;"
          @on-enter="getData(1)"
        />
        <!-- <Button type="info" @click="getData(1)">搜索</Button> -->
      </Col>
      <Col span="12" class="ar">
        <Button type="info" @click="showDialog('from')">添加</Button>
        <!-- <Button type="info" @click="edit(0)">编辑</Button>
        <Button type="info" @click="remove">删除</Button>
        <Button type="info" @click="edit(1)">上移</Button>
        <Button type="info" @click="edit(2)">下移</Button>-->
      </Col>
    </Row>

    <Table :loading="loading" :columns="column" :data="list" style="margin-top: 15px;">
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" @click="showDialog('from', row)">编辑</Button>
        <Button type="error" size="small" @click="remove('dict', row)">删除</Button>
        <Button type="info" size="small" @click="showDialog('item', row)">字典项</Button>
      </template>
    </Table>

    <Page
      :total="total"
      show-elevator
      show-total
      style="text-align:center;margin-top:20px;"
      @on-change="getData"
    />

    <!-- <Drawer
      :title="'选择' + ((type === 0 && '关连表') || (type === 1 && '关连字段') || (type === 2 && '关连品牌') || (type === 3 && '关连租户'))"
      v-model="isDrawer"
      width="500"
    >
      <Input
        v-model="keyword"
        placeholder="请输入关键字"
        style="width:73%; margin-right: 10px;"
        @on-change="search"
        v-show="type !== 1"
      />

      <div v-show="list1.length" class="select-table">
        <table v-if="type === 0">
          <tr>
            <th>表名</th>
            <th>英文</th>
          </tr>
          <tr v-for="(item, index) of list1" :key="index" @click="select(item)">
            <td>{{item.keyPair}}</td>
            <td>{{item.valuePair}}</td>
          </tr>
        </table>

        <table v-else-if="type === 1">
          <tr>
            <th>字段名</th>
            <th>英文</th>
          </tr>
          <tr v-for="(item, index) of list1" :key="index" @click="select(item)">
            <td>{{item.comment}}</td>
            <td>{{item.field}}</td>
          </tr>
        </table>

        <table v-else-if="type === 2 || type === 3">
          <tr v-for="(item, index) of list1" :key="index" @click="select(item)">
            <td>{{item.name}}</td>
          </tr>
        </table>
      </div>
    </Drawer>-->

    <!-- 新建/编辑字典 -->
    <Modal
      v-model="isDrawer"
      :title="form.id ? '编辑' : '新建' + '字典' + ''"
      @on-ok="save('form', form)"
    >
      <Form ref="form" :model="form" :rules="rules">
        <Row :gutter="16">
          <Col span="8">
            <FormItem label="关连表">
              <Input v-model="form.relationTable" placeholder="请输入关连表" />
            </FormItem>

            <FormItem label="字典名称">
              <Input v-model="form.dictName" placeholder="请输入字典名称" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="关连字段">
              <Input v-model="form.relationField" placeholder="请输入字段" />
            </FormItem>

            <FormItem label="关连租户">
              <selectSupplier :val="form.companyName" type="agency" @change="changeCompany" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="字段名称">
              <Input v-model="form.fieldName" placeholder="请输入字段名称" />
            </FormItem>

            <FormItem label="关连供应商品牌">
              <selectSupplier :val="form.supplierName" type="brand" @change="changeSupplier" />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>

    <Modal v-model="itemShow" :title="'编辑字典:' + editDictionary.relationTable">
      <table class="ac">
        <!-- <tr>
          <th>
              <Checkbox v-model="isAll" @on-change="choiceAll"></Checkbox>
          </th>
          <th>数据代码</th>
          <th>标签名称</th>
          <th>备注</th>
        </tr> -->
        <tr>
          <!-- <td>
              <Checkbox v-model="item.choice" @on-change="choice"></Checkbox>
          </td>-->
          <td>
            <Input v-model="formItem.dataCode" placeholder="请输入数据代码" />
          </td>
          <td>
            <Input v-model="formItem.dataName" placeholder="请输入标签名称" />
          </td>
          <td>
            <Input v-model="formItem.remark" placeholder="请输入字段描述" />
          </td>
          <td style="width: 25%;">
            <Button @click="save('item', formItem)">添加</Button>
          </td>
        </tr>
      </table>
      <!-- <div style="height: 50vh; overflow: auto;"> -->
      <!-- <table class="ac">
          <tr v-for="(item, index) of itemList" :key="index" class="dict-item">
            <td>
              <Checkbox v-model="item.choice" @on-change="choice"></Checkbox>
            </td>
            <td>
              <Input v-model="item.dataCode" :disabled="!item.isEdit" />
            </td>
            <td>
              <Input v-model="item.dataName" :disabled="!item.isEdit" />
            </td>
            <td>
              <Input v-model="item.remark" :disabled="!item.isEdit" />
            </td>
            <td style="width: 25%;">
              <div class="button-wrap">
                <Button size="small">
                  <Icon type="ios-create" v-if="!item.isEdit" @click="$set(item, 'isEdit', true)" />
                  <Icon type="md-done-all" v-else @click="save('item', item)" />
                </Button>
                <Button size="small" @click="sort(item, index - 1)">
                  <Icon type="md-arrow-up" />
                </Button>
                <Button size="small" @click="sort(item, index + 1)">
                  <Icon type="md-arrow-down" />
                </Button>
                <Button size="small" @click="remove('item', item.id)">
                  <Icon type="ios-trash" />
                </Button>
              </div>
            </td>
          </tr>
      </table>-->

      <!-- </div> -->
        <!-- :show-header="false" -->
      <Table
        height="500"
        :columns="columnItem"
        :data="itemList"
        :draggable="true"
        @on-drag-drop="onDragDrop"
      >
        <template slot-scope="{ row }" slot="dataCode">
          <Input v-model="row.dataCode" :disabled="!row.isEdit" />
        </template>
        <template slot-scope="{ row }" slot="dataName">
          <Input v-model="row.dataName" :disabled="!row.isEdit" />
        </template>
        <template slot-scope="{ row }" slot="remark">
          <Input v-model="row.remark" :disabled="!row.isEdit" />
        </template>

        <template slot-scope="{ row }" slot="action">
          <Button style="color: #2d8cf0; font-size: 18px;" size="small" type="text">
            <Icon type="ios-create" v-if="!row.isEdit" @click="$set(row, 'isEdit', true)" />
            <Icon type="md-done-all" v-else @click="save('item', row)" />
          </Button>
          <Button style="color: #ed4014; font-size: 18px;" size="small" type="text" @click="remove('item', row.id)">
            <Icon type="ios-trash" />
          </Button>
        </template>
      </Table>
    </Modal>
  </div>
</template>

<script>
import * as Agency from "@/api/dataDictionary";

import selectSupplier from "@/components/selectSupplier";
import store from "@/store";

const defaultForm = {
  id: "", //	string 有id修改,无id增加
  relationTable: "", //	string 关联表
  relationField: "", //	string 关联字段
  fieldName: "", //	string 字段名称
  relationCompanyId: "", //	string 关联租户id
  relationSupplierId: "", //	string 关联品牌id
  companyName: "", //	string
  supplierName: "", //	string
  createBy: store.state.user.userName //	string 创建人
};
export default {
  components: {
    selectSupplier
  },
  props: {},
  data() {
    return {
      loading: true,
      query: {
        page: 1,
        size: 10,
        keyword: ""
      },
      checkbox: false,
      list: [],
      // disabled: false,
      isAll: false,
      total: 0,
      isDrawer: false, // 是否显示左侧抽屉
      keyword: "", // 左侧抽屉的搜索关键字
      list1: [], // 右侧抽屉搜索结果列表
      type: 0, // 抽屉搜索类型 0: 关联表， 1：关联字段，2：关联字段名称，3：关连租户，4：关联保险品牌
      editDictionary: {},
      editItem: {},

      column: [
        {
          type: "selection",
          align: "center",
          maxWidth: 60
        },
        {
          title: "关连表",
          key: "relationTable",
          align: "center"
        },
        {
          title: "关连字段",
          key: "relationField",
          align: "center"
        },
        {
          title: "字段名称",
          key: "fieldName",
          align: "center"
        },
        {
          title: "字典名称",
          key: "dictName",
          align: "center"
        },
        {
          title: "关连租户",
          key: "companyName",
          align: "center"
        },
        {
          title: "关连品牌",
          key: "supplierName",
          align: "center"
        },
        {
          title: "创建人",
          key: "createBy",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          width: 200
        }
      ],
      form: Object.assign({}, defaultForm),
      formItem: {},
      rules: {},
      itemShow: false,
      itemList: [],
      columnItem: [
        {
          title: '数据代码',
          slot: "dataCode",
          align: "center"
        },
        {
          title: '标签名称',
          slot: "dataName",
          align: "center"
        },
        {
          title: '备注',
          slot: "remark",
          align: "center"
        },
        {
          title: '操作',
          slot: "action",
          align: "center",
          width: 200
        }
      ]
    };
  },
  computed: {},
  watch: {
    // 当type变化，重置抽屉状态
    type() {
      this.list1 = [];
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(page) {
      page && (this.query.page = page);
      Agency.getDataDitionary(this.query).then(data => {
        // console.log(data);
        this.loading = false;
        this.list = data.list;
        this.total = ~~data.total;
      });
    },
    getDictItemList() {
      Agency.getAllDitionaryItem(this.editDictionary.id).then(res => {
        this.itemList = res.list;
      });
    },
    search() {
      switch (this.type) {
        // 0: 关联表， 1：关联字段，关联字段名称，2：关连租户，3：关联保险品牌
        case 0:
          getDataDitionaryTableAndComment(this.keyword).then(res => {
            // console.log(res);
            this.list1 = res;
          });
          break;
        case 1:
          getDataDitionaryFiledAndComment(this.keyword).then(res => {
            // console.log(res);
            this.list1 = res;
          });
          break;
        case 2:
          getDataDitionarySupplier(this.keyword).then(res => {
            // console.log(res);
            this.list1 = res;
          });
          break;
        case 3:
          getDataDitionaryCompany(this.keyword).then(res => {
            // console.log(res);
            this.list1 = res;
          });
          break;
        case 4:
          getDataDitionarySupplier(this.keyword).then(res => {
            // console.log(res);
            this.list1 = res;
          });
          break;
      }
    },
    showDialog(type, data) {
      if (type === "from") {
        this.isDrawer = true;
        this.form = Object.assign({}, data || defaultForm);
      } else {
        this.itemShow = true;
        this.editDictionary = data;
        this.getDictItemList();
      }
    },
    edit(type) {
      // 0:编辑，1：上移，2：下移
      let judge = this._judge();
      if (!judge) {
        return;
      }
      if (judge > 1) {
        this.$Message.error("不可同时操作多个选项");
        return;
      }
      let data; // 操作项
      for (const iterator of this.list) {
        iterator.choice && (data = iterator);
      }
      if (!type) {
        this.$set(data, "isEdit", true);
      } else {
        if (data.isEdit) {
          this.$Message.warning("该项正在编辑，请保存后再进行移动");
          return;
        }
        var move = {}; // 被调换位置项
        if (type === 1) {
          let index = this.list.indexOf(data) - 1;
          if (index < 0) {
            this.$Message.warning("已经移在改页最顶部");
            return;
          }
          move = this.list[index];
          if (move.isEdit) {
            this.$Message.warning("上移项正在编辑，请保存后再进行移动");
            return;
          }
          let sort = move.sort;
          move.sort = data.sort;
          data.sort = sort;
          this.list[index] = data;
          this.list.splice(index + 1, 1, move);
        } else if (type === 2) {
          let index = this.list.indexOf(data) + 1;
          if (index >= this.list.length) {
            this.$Message.warning("已经移在改页最底部");
            return;
          }
          move = this.list[index];
          if (move.isEdit) {
            this.$Message.warning("下移项正在编辑，请保存后再进行移动");
            return;
          }
          let sort = move.sort;
          move.sort = data.sort;
          data.sort = sort;
          this.list[index] = data;
          this.list.splice(index - 1, 1, move);
        }
        // console.log(1, move)
        saveDataDitionary(move);
        saveDataDitionary(data);
      }
    },
    remove(type, data) {
      if (type === "dict") {
        let selected = [];
        if (data) {
          selected.push(data);
        } else {
          if (!this._judge()) {
            return;
          }
          for (const iterator of this.list) {
            iterator.choice && selected.push(iterator);
          }
        }
        this.$Modal.confirm({
          title: "提示",
          content: "确定要删除吗",
          onOk: () => {
            Agency.deleteDataDitionary(selected).then(res => {
              this.$Message.success("操作成功");
              // this.isAll = false;
              this.getData();
            });
          }
        });
      } else {
        this.$Modal.confirm({
          title: "提示",
          content: "确定要删除吗",
          onOk: () => {
            Agency.deleteDitionaryItem(data).then(res => {
              this.$Message.success("操作成功");
              this.getDictItemList();
            });
          }
        });
      }
    },
    save(type, data) {
      Promise.resolve().then(() => {
        if (type === "form") {
          return Agency.saveDataDitionary(data).then(res => {
            this.$Message.success("操作成功");
            this.getData();
          });
        } else {
          data.dictId || (data.dictId = this.editDictionary.id);
          return Agency.saveDitionaryItem(data).then(res => {
            this.$Message.success("操作成功");
            this.formItem = {};
            this.getDictItemList();
          });
        }
      });
    },
    choiceAll() {
      // console.log(this.isAll);
      if (this.isAll) {
        for (const iterator of this.list) {
          iterator.choice = true;
        }
      } else {
        for (const iterator of this.list) {
          iterator.choice = false;
        }
      }
    },
    choice() {
      for (const iterator of this.list) {
        if (iterator.choice) {
          this.isAll = true;
          // console.log(iterator.choice);
        } else {
          this.isAll = false;
          return;
        }
      }
    },
    showDrawer(item, type) {
      if (!item.isEdit) {
        this.$Message.info("请先选中后点击编辑按钮即可编辑");
        return;
      }
      this.editItem = item;
      this.isDrawer = true;
      this.type = type;
      switch (type) {
        case 0:
          this.keyword = item.relationTable || "";
          break;
        case 1:
          this.keyword = item.relationTable || "";
          break;
        case 2:
          this.keyword = item.supplierName || "";
          break;
        case 3:
          this.keyword = item.companyName || "";
          break;
        default:
          break;
      }
      this.search();
    },
    select(data) {
      // console.log(data)
      switch (this.type) {
        case 0:
          this.editItem.relationTable = data.valuePair;
          // 关连字段,字段名称重置
          this.editItem.relationField = "";
          this.editItem.fieldName = "";
          break;
        case 1:
          this.editItem.relationField = data.field;
          this.editItem.fieldName = data.comment;
          break;
        case 2:
          this.editItem.supplierName = data.name;
          this.editItem.relationSupplierId = data.id;
          break;
        case 3:
          this.editItem.companyName = data.name;
          this.editItem.relationCompanyId = data.id;
          break;
        default:
          break;
      }
      this.isDrawer = false;
    },
    _judge() {
      let len = 0;
      for (const iterator of this.list) {
        iterator.choice && ++len;
      }
      if (len === 0) {
        this.$Message.info("请选择需要操作的项目");
        return len;
      } else {
        return len;
      }
    },
    changeCompany(val) {
      this.form.relationCompanyId = val.id;
      this.form.companyName = val.name;
      // console.log(val)
    },
    changeSupplier(val) {
      this.form.relationSupplierId = val.id;
      this.form.supplierName = val.name;
      // console.log(val)
    },
    // sort(data, index) {
    //   if (data.isEdit) {
    //     this.$Message.warning("该项正在编辑，请保存后再进行移动");
    //     return;
    //   }
    //   if (index < 0) {
    //     this.$Message.warning("已经移在当前列最顶部");
    //     return;
    //   }
    //   if (index === this.itemList.length) {
    //     this.$Message.warning("已经移在当前列最底部");
    //     return;
    //   }
    //   let sort = data.sort;
    //   data.sort = this.itemList[index].sort;
    //   this.itemList[index].sort = sort;
    //   Agency.sortDitionaryItem([data, this.itemList[index]]).then(res => {
    //     this.getDictItemList();
    //   });
    // },
    onDragDrop(index1, index2) {
      // console.log(index1, index2)
      let flag = index1 - index2 < 0 ? 1 : 0
      let move = this.itemList[index1]
      move.tag = '0'
      let terget = this.itemList[index2]
      terget.tag = '1'
      
      let sort = move.sort;
      move.sort = terget.sort;
      terget.sort = sort;

      Agency.sortDitionaryItem(flag, [move, terget]).then(res => {
        this.getDictItemList();
      })
    }
  }
};
</script>
<style lang="less" scoped>
table {
  margin-bottom: 10px;
  width: 100% !important;
  transition: all 0.3s;
  tr {
    height: 40px;
  }
  td {
    padding: 0 8px;
  }
  th {
    // width: 1;
    padding-left: 8px;
  }
}

.select-table table {
  border: 1px solid #eee;
  border-collapse: collapse;
  td {
    border: 1px solid #eee;
  }
  tr:hover {
    background: #eee;
  }
}
/deep/.ivu-btn:not(:last-child) {
  margin-right: 10px;
}
/deep/.ivu-input[disabled] {
  background: none;
  color: #444;
  border: none;
  transition: all 0.3s;
  cursor: auto;
}
/deep/.ivu-input {
  height: 30px;
}
/deep/.ivu-modal {
  min-width: 600px;
  width: 60% !important;
}
/deep/.ivu-btn-text{
  &:hover{
    background: none;
  }
}
.dict-item {
  &:hover {
    background: #f8f8f9;
    .button-wrap {
      display: block;
    }
  }
}
.button-wrap {
  display: none;
}
</style>
