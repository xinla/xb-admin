<template>
  <div>
    <Row>
      <Col span="16">
        <Button
          type="primary"
          size="small"
          style="margin-right:5px;"
          @click="edit(0)"
        >添加分类</Button>
        <Button
          type="primary"
          size="small"
          style="margin-right:5px;"
          @click="edit(0)"
        >添加标题</Button>
      </Col>
    </Row>
    <Table border :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(0, row)">编辑</Button>
        <Button type="error" size="small" style="margin-right: 5px" @click="handleDelete(0, row)">删除</Button>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "分类",
          key: "groupName",
          align: "center"
        },
        {
          title: "标题",
          key: "groupName",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      list: []
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
</style>
