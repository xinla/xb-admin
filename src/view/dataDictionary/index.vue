<template>
  <div>
    <Row>
      <Col span="12">
        <Input v-model="query.name" placeholder="搜索公司" style="width:73%; margin-right: 10px;" />
        <Button type="info" @click="search()">搜索</Button>
      </Col>
      <Col span="12" class="ar">
        <Button type="info" @click="add">添加</Button>
        <Button type="info" @click="edit">编辑</Button>
        <Button type="info" @click="remove">删除</Button>
        <Button type="info" @click="up">上移</Button>
        <Button type="info" @click="down">下移</Button>
      </Col>
    </Row>
    <table>
      <tr>
        <th>
          <Checkbox v-model="isAll" @click.native="choiceAll"></Checkbox>
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
          <Checkbox v-model="item.choice" @click.native="choice"></Checkbox>
        </td>
        <td>
          <Input v-model="item.value" :disabled="!item.isEdit" placeholder="请输入" clearable />
        </td>
        <td>
          <Input v-model="item.value" :disabled="!item.isEdit" placeholder="请输入" clearable />
        </td>
        <td>
          <Input v-model="item.value" :disabled="!item.isEdit" placeholder="请输入" clearable />
        </td>
        <td>
          <Input v-model="item.value" :disabled="!item.isEdit" placeholder="请输入" clearable />
        </td>
        <td>
          <Input v-model="item.value" :disabled="!item.isEdit" placeholder="请输入" clearable />
        </td>
        <td>
          <Input v-model="item.value" :disabled="!item.isEdit" placeholder="请输入" clearable />
        </td>
        <td>
          <Input v-model="item.value" :disabled="!item.isEdit" placeholder="请输入" clearable />
        </td>
        <td>
          <Input v-model="item.value" :disabled="!item.isEdit" placeholder="请输入" clearable />
        </td>
        <td>
          <i-switch v-model="item.switch" :disabled="!item.isEdit" />
        </td>
        <td>
          <Button v-if="item.isEdit" type="success" @click="save(item)">保存</Button>
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
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      query: {
        page: 1,
        size: 10,
        type: "1",
        name: ""
      },
      checkbox: false,
      list: [{}, {}, {}, {}, {}, {}, {}, {}],
      disabled: false,
      isAll: false,
      total: 0
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    getData(page) {
      page && (this.query.page = page);
      // getProductPage(this.query).then(data => {
      //   console.log(data)
      //   this.loading = false
      //   this.list = data.list
      //   this.total = data.total
      // })
    },
    search() {},
    add() {
      this.list.unshift({isEdit: true});
    },
    edit() {
      let len = 0;
      let data;
      for (const iterator of this.list) {
        iterator.choice && ++len && (data = iterator);
      }
      if (len >= 2) {
        this.$Message.error("不可同时编辑多个选项");
        return
      }
      this.$set(data, 'isEdit', true)
    },
    remove() {},
    up() {},
    down() {},
    save() {},
    choiceAll() {
      if (this.isAll) {
        for (const iterator of this.list) {
          iterator.choice = false;
        }
      } else {
        for (const iterator of this.list) {
          iterator.choice = true;
        }
      }
    },
    choice() {
      this.$nextTick(() => {
        for (const iterator of this.list) {
          if (iterator.choice) {
            this.isAll = true;
          } else {
            this.isAll = false;
            return;
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
table {
  margin-top: 20px;
  width: 100%;
  text-align: center;
  transition: all .3s;
  tr {
    height: 40px;
  }
  td {
    padding: 0 8px;
  }
  th {
    // width: 1;
  }
}
/deep/.ivu-btn:not(:last-child) {
  margin-right: 10px;
}
/deep/.ivu-input[disabled] {
  background: #fff;
  color: #444;
  border: none;
  transition: all .3s;
}
</style>
