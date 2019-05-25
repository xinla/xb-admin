<template>
  <div>
    <Row>
      <div class="title-row">供应商类型</div>
      <Col span="16">
        <Button
          type="primary"
          size="small"
          style="display:block; margin:0 5px 5px auto;"
          @click="edit(0)"
        >新建</Button>
        <Table border :columns="supplierColumns" :data="supplierList">
          <template slot-scope="{ row }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="edit(0, row)">编辑</Button>
            <Button
              type="error"
              size="small"
              style="margin-right: 5px"
              @click="handleDelete(0, row.id)"
            >删除</Button>
          </template>
        </Table>
      </Col>
      <Col span="12"></Col>
    </Row>
    <dialogBox v-model="supplierShow">
      <template slot="title">添加类型</template>
      <template>
        <Form ref="supplierForm" :model="supplierForm" :rules="supplierRules">
          <FormItem prop="name">
            <Input type="text" v-model="supplierForm.name" placeholder="親輸入类型"></Input>
          </FormItem>
          <Button
            type="primary"
            size="small"
            style="display: block; margin: 0 auto"
            @click="submit(0, supplierForm)"
          >确定</Button>
        </Form>
      </template>
    </dialogBox>

    <Divider/>

    <Row>
      <div class="title-row">产品类型</div>
      <Col span="16">
        <Button
          type="primary"
          size="small"
          style="display:block; margin:0 5px 5px auto;"
          @click="edit(1)"
        >新建</Button>
        <Table border :columns="productColumns" :data="productList">
          <template slot-scope="{ row }" slot="pid">{{producParentList[row.pid] || row.name}}</template>

          <template slot-scope="{ row }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="edit(1, row)">编辑</Button>
            <Button
              type="error"
              size="small"
              style="margin-right: 5px"
              @click="handleDelete(1, row.id)"
            >删除</Button>
          </template>
        </Table>
      </Col>
      <Col span="12">
        <!-- <div v-show="productShow">
          添加类型
          <Select v-model="productForm.pid">
              <Option v-for="(item, index) in productList" :value="item.id" :key="index">{{ item.name }}</Option>
          </Select>
          <Input type="text" v-model="productForm.name" placeholder="親輸入类型"></Input>
          <Button type="primary" size="small" style="margin-right: 5px" @click="submit(1, productForm)">确定</Button>
        </div>-->
      </Col>

      <dialogBox v-model="productShow">
        <template slot="title">添加类型</template>
        <template>
          <Form ref="productForm" :model="productForm" :rules="productRules">
            <FormItem prop="pid">
              <Select v-model="productForm.pid">
                <Option
                  v-for="(item, index) in productList"
                  :value="item.id"
                  :key="index"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>

            <FormItem prop="name">
              <Input type="text" v-model="productForm.name" placeholder="親輸入类型"></Input>
            </FormItem>

            <Button
              type="primary"
              size="small"
              style="display: block; margin: 0 auto"
              @click="submit(1, productForm)"
            >确定</Button>
          </Form>
        </template>
      </dialogBox>
    </Row>
  </div>
</template>

<script>
import {
  getTypeRulePage,
  getTypeRuleById,
  deleteTypeRule,
  updateTypeRule,
  addTypeRule
} from "@/api/rulesSet/type";
import dialogBox from "@/components/dialogBox";

const productForm = {
  type: 1,
  name: "",
  pid: "0"
};

const supplierForm = {
  type: 0,
  name: "",
  pid: "0"
};

export default {
  components: { dialogBox },
  props: {},
  data() {
    return {
      supplierColumns: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "类型名称",
          key: "name",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      supplierRules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      supplierList: [],
      supplierForm: Object.assign({}, supplierForm),
      supplierShow: false,
      productColumns: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "分类",
          slot: "pid",
          align: "center"
        },
        {
          title: "类型名称",
          key: "name",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      productRules: {
        pid: [{ required: true, message: "不能为空", trigger: "change" }],
        name: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      productList: [],
      productForm: Object.assign({}, productForm),
      productShow: false,
      producParentList: {}
    };
  },
  watch: {
    productList(val) {
      for (const iterator of val) {
        this.producParentList[iterator.id] = iterator.name;
      }
    }
  },
  computed: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getData(0);
      this.getData(1);
    },
    getData(type) {
      // 0 供应商类型，1 产品类型
      getTypeRulePage(type).then(data => {
        console.log(data);
        type === 0
          ? (this.supplierList = data.list)
          : (this.productList = data.list);
      });
    },
    edit(_type, item) {
      if (item) {
        var { id, name, pid, type } = item;
      }
      if (_type === 0) {
        this.supplierShow = true;
        this.supplierForm = Object.assign({}, supplierForm);
        item && (this.supplierForm = { id, name, pid, type: 0 });
      } else {
        this.productShow = true;
        this.productForm = Object.assign({}, productForm);
        item && (this.productForm = { id, name, pid, type: 1 });
      }
    },
    handleDelete(type, id) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除吗",
        onOk: () => {
          deleteTypeRule(id).then(data => {
            this.getData(type);
            this.$Message.success("操作成功");
          });
        }
      });
    },
    submit(type, item) {
      // console.log('supplierForm', this.supplierForm)
      // console.log('productForm', this.productForm)
      (type === 0
        ? this.$refs.supplierForm.validate()
        : this.$refs.productForm.validate()
      )
        .then(data => {
          if (data) {
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .then(() => {
          if (item.id) {
            return updateTypeRule(item);
          } else {
            return addTypeRule(item);
          }
        })
        .then(data => {
          this.getData(type);
          this.$Message.success("操作成功");
          this.cancel(type);
        });
    },
    cancel(type) {
      type === 0 ? (this.supplierShow = false) : (this.productShow = false);
    },
    async getProductType(id) {
      let res = await getTypeRuleRuleById(id);
      console.log(res);
    }
  }
};
</script>
<style lang="less" scoped>
</style>
