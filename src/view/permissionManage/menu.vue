<template>
  <div>
        <ButtonGroup>
          <Button type="primary" @click="form.menuId && (disabled = false)">编辑</Button>
          <Button type="primary" @click="remove">删除</Button>
        </ButtonGroup>
    <Row>
      <Col span="8">
        <Tree :data="list" @on-select-change="clickMenu"></Tree>
      </Col>
      <Col span="16">
        <Form ref="form" :model="form" :rules="rules" :label-width="60" :disabled="disabled">
          <FormItem label="父级节点" prop="name">
            <Input v-model="form.parentId" placeholder="请输入" />
          </FormItem>

          <FormItem label="节点ID" prop="name">
            <Input v-model="form.menuId" placeholder="请输入" />
          </FormItem>

          <FormItem label="标题" prop="name">
            <Input v-model="form.name" placeholder="请输入标题" />
          </FormItem>

          <FormItem label="状态" prop="name">
            <RadioGroup v-model="form.type">
              <Radio label="0">菜单</Radio>
              <Radio label="1">按钮</Radio>
            </RadioGroup>
          </FormItem>

          <FormItem label="地址">
            <Input v-model.trim="form.path" placeholder="请输入请求地址" />
          </FormItem>

          <FormItem label="图标">
            <Input v-model.trim="form.icon" placeholder="请输入请求图标" />
          </FormItem>

          <FormItem label="排序" prop="name">
            <Input v-model.trim="form.sort" placeholder="请输入排序" />
          </FormItem>

          <FormItem label="路由缓冲" prop="name">
            <i-switch v-model="form.keepAlive" true-value="1" false-value="0" />
          </FormItem>

          <FormItem v-show="!disabled">
            <Button type="primary" style="margin-right: 10px;" @click="save">保存</Button>
            <Button>取消</Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
  </div>
</template>

<script>
import * as A from "@/api/permission/menu";

const defaultForm = {
  parentId: "",
  menuId: "",
  name: "",
  type: "", // 0:菜单 1:按钮
  path: "",
  icon: "",
  sort: "",
  keepAlive: ""
};

export default {
  components: {},
  props: {},
  data() {
    return {
      list: [
      ],
      form: Object.assign({}, defaultForm),
      rules: {},
      disabled: true
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      A.getMenuTree().then(res => {
        // console.log(res);
        this.list = []
        function recursive(origin, target) {
          for (const iterator of origin) {
            let obj = {
              id: iterator.id,
              title: iterator.name,
              expand: false,
              children: []
            };
            target.push(obj);
            recursive(iterator.children, obj.children);
          }
        }
        recursive(res, this.list);
        // this.list = data.records;
        // this.total = ~~data.total;
      });
    },
    clickMenu(selected, current) {
      console.log(current)
      A.getMenuInfo(current.id).then(res => {
        this.form = res
      })
    },
    save() {
      A.updateMenu(this.form).then(res => {
        this.getData();
        this.$Message.success("操作成功");
      })
    },
    remove() {
      // if (data.lockFlag) {
      //   this.$Message.error("当前用户正在启用中，无法删除，请停用后再尝试");
      // } else {
      //   }
      if (!this.form.menuId) {
        this.$Message.warning("请选择一个菜单");
        return
      }
      this.$Modal.confirm({
        title: "提示",
        content: "此操作将永久删除, 是否继续?",
        onOk: () => {
          A.removeMenu(this.form.menuId).then(res => {
            this.form = {}
            this.$Message.success("操作成功");
            this.getData();
          });
        }
      });
    },
  }
};
</script>
<style lang="less" scoped>
</style>
