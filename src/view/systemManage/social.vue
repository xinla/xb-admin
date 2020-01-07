<template>
  <div class="x-h100">
    <div class="bfc-o bg pb24">
         <Button type="primary" @click="showModal()">添加</Button>
        <div class="fr">
          <Select v-model="query.type" style="width:200px;" placeholder='类型'>
            <Option :value="0">业务类</Option>
            <Option :value="1">系统类</Option>
          </Select>
          <Button type="primary" icon="ios-search" shape="circle" @click="getData(1)"></Button>
          <!-- <Button icon="ios-close-circle-outline" @click="query.publicName = '', query.system = '', getData(1)">清空</Button> -->
        </div>
    </div>
        <Table :loading="loading" :columns="columns" :data="list">
          <template slot-scope="{ row }" slot="roleList">
            <Tag
              color="primary"
              v-for="(item, index) of row.roleList"
              :key="index"
            >{{item.roleName}}</Tag>
          </template>

          <template slot-scope="{ row }" slot="lockFlag">{{row.outageTime ? '锁定' : '正常'}}</template>

          <template slot-scope="{ row }" slot="action">
            <span class="button-pri"
              @click="showModal(row)"
            >编辑</span>
            <span class="button-pri"
              @click="showModal(row)"
            >编辑</span>
            <span class="button-err" @click="remove(row)">删除</span>
          </template>
        </Table>

        <Page
          :current='query.current'
          :total="total"
          show-elevator
          show-total
          class="c-page"
          @on-change="getData"
        />

    <Modal v-model="modal" :title="form.publicId ? '编辑' : '新建'" @on-ok="save">
      <Form :model="form" :label-width="60">
        <Row>
          <Col span="12">
            <FormItem label="ID" prop="publicName">
              <Input v-model="form.id"/>
            </FormItem>

            <FormItem label="域" prop="phone">
              <Input v-model="form.scope" placeholder="请输入域" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="密钥" prop="name">
              <Input v-model="form.clientSecret" placeholder="请输入密钥" />
            </FormItem>

            <FormItem label="自动放行" prop="roleList">
              <RadioGroup v-model="form.autoapprove">
                <Radio label="true" border>是</Radio>
                <Radio label="false" border>否</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>

        <FormItem label="ID" prop="publicName">
          <Input v-model="form.id" style="width:73%;" />
        </FormItem>

        <FormItem label="类型" prop="name">
          <Input v-model="form.type" style="width:73%;" />
        </FormItem>

        <FormItem label="描述" prop="phone">
          <Input v-model="form.publicValue" style="width:73%;" />
        </FormItem>

        <FormItem label="编码" prop="roleList">
          <Input v-model="form.validateCode" style="width:73%;" />
        </FormItem>

<FormItem label="状态" prop="roleList">
        <Select v-model="form.delFlag" style="width:73%;" placeholder='状态'>
            <Option :value="0">业务类</Option>
            <Option :value="1">系统类</Option>
          </Select>
          </FormItem>

          <FormItem label="类型" prop="roleList">
        <Select v-model="form.publicType" style="width:73%;" placeholder='状态'>
            <Option :value="0">业务类</Option>
            <Option :value="1">系统类</Option>
          </Select>
          </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import * as A from "@/api/system/social";

export default {
  data() {
    return {
      loading: true,
      query: {
        current: 1, // 页数
        size: 10, // 一页数据
        type: '',
      },
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 60
        },
        {
          title: "类型",
          key: "type",
          align: "center"
        },
        {
          title: "描述",
          key: "remark",
          align: "center"
        },
        {
          title: "appId",
          key: "appId",
          align: "center",
          tooltip: true
        },
        {
          title: "appSecret",
          align: "center",
          key: "appSecret",
          tooltip: true
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          width: 180,
          align: "center"
        }
      ],
      list: [],
      total: 0,
      modal: false,
      form: {},
      
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(page) {
      this.loading = true;
      page && (this.query.current = page);
      A.fetchList(this.query).then(data => {
        // console.log(data);
        this.loading = false;
        this.list = data.records;
        this.total = ~~data.total;
      });
    },
    showModal(data) {
      this.modal = true;
      this.form = Object.assign({}, data || {})
    },
    remove(data) {
      // if (data.lockFlag) {
      //   this.$Message.error("当前用户正在启用中，无法删除，请停用后再尝试");
      // } else {
      //   }
      this.$Modal.confirm({
        title: "提示",
        content: `是否确认删除ID为"${data.publicId}"?`,
        onOk: () => {
          A.delObj(data.publicId).then(res => {
            this.getData();
            this.$Message.success("操作成功");
          });
        }
      });
    },
    save() {
      Promise.resolve()
        .then(() => {
          return this.form.publicId
            ? A.putObj(this.form)
            : A.addObj(this.form);
        })
        .then(res => {
          this.$Message.success("操作成功");
          this.getData();
          // console.log(data)
        });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
