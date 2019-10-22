<template>
  <div>
    <Row>
      <Col span="12">
        <Input
          v-model="query.keyword"
          placeholder="输入键和值的关键字并按回车键进行搜索"
          style="width:73%; margin-right: 10px;"
          @on-enter="getData(1)"
        />
        <!-- <Button type="info" @click="getData(1)">搜索</Button> -->
      </Col>
      <Col span="12" class="ar">
        <Button type="info" @click="add">添加</Button>
        <Button type="info" @click="edit(0)">编辑</Button>
        <Button type="info" @click="remove">删除</Button>
        <Button type="info" @click="edit(1)">上移</Button>
        <Button type="info" @click="edit(2)">下移</Button>
      </Col>
    </Row>
    <table class="al">
      <tr>
        <th>
          <Checkbox v-model="isAll" @on-change="choiceAll"></Checkbox>
        </th>
        <th>关连表</th>
        <th>关连字段</th>
        <th>字段名称</th>
        <th>关连租户</th>
        <th>关连品牌</th>
        <th>键</th>
        <th>值</th>
        <th>描述</th>
        <th>是否启用</th>
        <th></th>
      </tr>
      <tr v-for="(item, index) of list" :key="index">
        <td>
          <Checkbox v-model="item.choice" @on-change="choice"></Checkbox>
        </td>
        <td @click="showDrawer(item, 0)">
          <Input
            v-model="item.relationTable"
            :disabled="!item.isEdit"
            readonly
            placeholder="请输入关连表"
          />
        </td>
        <td @click="showDrawer(item, 1)">
          <Input
            v-model="item.relationField"
            :disabled="!item.isEdit"
            readonly
            placeholder="请输入关连字段"
          />
        </td>
        <td @click="showDrawer(item, 1)">
          <Input v-model="item.fieldName" :disabled="!item.isEdit" readonly placeholder="请输入字段名称" />
        </td>
        <td @click="showDrawer(item, 3)">
          <Input
            v-model="item.companyName"
            :disabled="!item.isEdit"
            readonly
            placeholder="请输入关连租户"
          />
        </td>
        <td @click="showDrawer(item, 2)">
          <Input v-model="item.supplierName" :disabled="!item.isEdit" placeholder="请输入关连品牌" />
        </td>
        <td>
          <Input v-model="item.keyPair" :disabled="!item.isEdit" placeholder="请输入键" clearable />
        </td>
        <td>
          <Input v-model="item.valuePair" :disabled="!item.isEdit" placeholder="请输入值" clearable />
        </td>
        <td>
          <Input v-model="item.description" :disabled="!item.isEdit" placeholder="请输入描述" clearable />
        </td>
        <td>
          <i-switch
            v-model="item.status"
            :true-value="0"
            :false-value="1"
            :disabled="!item.isEdit"
          />
        </td>
        <td>
          <Button v-if="item.isEdit" type="success" size="small" @click="save(item)">保存</Button>
        </td>
      </tr>
    </table>

    <Page
      :total="total"
      show-elevator
      show-total
      style="text-align:center;margin-top:20px;"
      @on-change="getData"
    />

    <Drawer
      :title="'选择' + ((type === 0 && '关连表') || (type === 1 && '关连字段') || (type === 2 && '关连品牌') || (type === 3 && '关连租户'))"
      v-model="isDrawer"
      width="500"
    >
      <Input
        v-model="keyword"
        placeholder="请输入关键字"
        style="width:73%; margin-right: 10px;"
        @on-change="search"
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
            <th>表名</th>
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
    </Drawer>
  </div>
</template>

<script>
import {
  saveDataDitionary,
  deleteDataDitionary,
  getDataDitionary,
  getDataDitionaryTableAndComment,
  getDataDitionaryFiledAndComment,
  getDataDitionarySupplier,
  getDataDitionaryCompany
} from "@/api/dataDictionary";

export default {
  components: {},
  props: {},
  data() {
    return {
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
      editItem: {}
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
      getDataDitionary(this.query).then(data => {
        // console.log(data);
        // this.loading = false
        this.list = data.list;
        // 数组排序 sort降序排列
        this.list.sort((a, b) => {
          return b.sort - a.sort;
        });
        this.total = Number(data.total);
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
    add() {
      for (const iterator of this.list) {
        if (iterator.isEdit) {
          this.$Message.error("请保存当前编辑项后再添加");
          return
        }
      }
      this.list.unshift({ isEdit: true, status: 1 });
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
    remove() {
      if (!this._judge()) {
        return;
      }
      let selected = [];
      for (const iterator of this.list) {
        iterator.choice && selected.push(iterator);
      }
      deleteDataDitionary(selected).then(res => {
        this.$Message.success("操作成功");
        this.isAll = false;
        this.getData();
      });
    },
    save(data) {
      data.status == null && (data.status = 1);
      if (!data.relationTable) {
        this.$Message.error("关连表不能为空");
        return;
      } else if (!data.relationField) {
        this.$Message.error("关连字段不能为空");
        return;
      } else if (!data.keyPair || !data.valuePair) {
        this.$Message.error("键、值不能为空");
        return;
      }

      saveDataDitionary(data).then(res => {
        data.id = res;
        data.isEdit = false;
        this.$Message.success("保存成功");
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
          this.editItem.relationField = ''
          this.editItem.fieldName = ''
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
    }
  }
};
</script>
<style lang="less" scoped>
table {
  margin-top: 20px;
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
  background: #fff;
  color: #444;
  border: none;
  transition: all 0.3s;
}
/deep/.ivu-input {
  height: 30px;
}
</style>
