<template>
  <div class="x-h100">
    <div class="ar bg pb24">
      <Button type="primary" @click="add">添加</Button>
      <Button type="primary" @click="form.id && (disabled = false)">编辑</Button>
      <Button type="primary" @click="remove">删除</Button>
    </div>
    <Row style="height: calc(100% - 56px)">
      <Col span="6" class="x-h100" style="padding: 20px 15px; border-right: 25px solid #f5f7f9;">
        <Tree :data="list" @on-select-change="clickDepartment"></Tree>
      </Col>
      <Col span="18" class="x-h100 col-right">
        <Form ref="form" :model="form" :rules="rules" :label-width="60" :disabled="disabled">
          <FormItem label="父级节点" prop="name">
            <Input v-model="form.parentId" placeholder="请输入父级节点" disabled />
          </FormItem>

          <FormItem label="节点编号" prop="name" v-show="disabled">
            <Input v-model="form.deptId" placeholder="请输入节点编号" disabled />
          </FormItem>

          <FormItem label="部门名称" prop="name">
            <Input v-model="form.name" placeholder="请输入部门名称" />
          </FormItem>

          <FormItem label="排序" prop="name">
            <Input v-model.trim="form.sort" placeholder="请输入排序" />
          </FormItem>

          <FormItem>
            <Button type="primary" style="margin-right: 10px;" @click="save">保存</Button>
            <Button @click="cancle">取消</Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
  </div>
</template>

<script>
import * as A from "@/api/permission/department";

const defaultForm = {
  name: "",
  parentId: "",
  deptId: 0,
  sort: ""
};

export default {
  components: {},
  props: {},
  data() {
    return {
      list: [],
      form: Object.assign({}, defaultForm),
      rules: {},
      disabled: true
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      // 获取部门树
      A.getDeptTree().then(res => {
        this.list = [];
        function recursive(origin, target) {
          for (const iterator of origin) {
            let obj = Object.assign({}, iterator, {
              id: iterator.id,
              deptId: iterator.id,
              title: iterator.name,
              expand: true,
              children: []
            });
            target.push(obj);
            recursive(iterator.children, obj.children);
          }
        }
        recursive(res, this.list);
      });
    },
    clickDepartment(selected, current) {
      current.expand = !current.expand;
      this.form = Object.assign({}, current);
    },
    add() {
      this.form = Object.assign({}, defaultForm, {
        parentId: this.form.deptId
      });
      this.disabled = false;
    },
    remove() {
      if (!this.form.id) {
        this.$Message.warning("请选择一个部门");
        return;
      }
      this.$Modal.confirm({
        title: "提示",
        content: "此操作将永久删除, 是否继续?",
        onOk: () => {
          A.removeDept(this.form.id).then(res => {
            this.form = {};
            this.$Message.success("操作成功");
            this.getData();
          });
        }
      });
    },
    save() {
      Promise.resolve()
        .then(() => {
          return this.form.id ? A.updateDept(this.form) : A.addDept(this.form);
        })
        .then(res => {
          this.getData();
          this.$Message.success("操作成功");
        });
    },
    cancle() {
      this.form.id || (this.form = Object.assign({}, defaultForm));
      this.disabled = true;
    }
  }
};
</script>
<style lang="less" scoped>
.col-right {
  padding: 20px 15px;
  position: relative;
}
</style>
