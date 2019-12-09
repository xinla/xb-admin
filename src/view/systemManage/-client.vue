<template>
  <div>
    <Button type="info" @click="disabled = false, showModal()">添加</Button>
    <Table :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="roleList">
        <Tag color="primary" v-for="(item, index) of row.roleList" :key="index">{{item.roleName}}</Tag>
      </template>

      <template slot-scope="{ row }" slot="lockFlag">{{row.outageTime ? '锁定' : '正常'}}</template>

      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" @click="disabled = true, showModal(row)">查看</Button>
        <Button type="primary" size="small" @click="showModal(row)">编辑</Button>
        <Button type="primary" size="small" @click="remove(row)">删除</Button>
      </template>
    </Table>

    <Page
      :current="query.current"
      :total="total"
      show-elevator
      show-total
      style="text-align:center;margin-top:20px;"
      @on-change="getData"
    />

    <Modal v-model="modal" :title="form.clientId ? '编辑' : '新建'" @on-ok="save" width="600">
      <Form :model="form" :label-width="90" :disabled="disabled">
        <Row>
          <Col span="12">
            <FormItem label="编号" prop="publicName">
              <Input v-model="form.clientId" placeholder="请输入编号" />
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

        <FormItem label="授权模式" prop="roleList">
          <CheckboxGroup v-model="form.authorizedGrantTypes">
            <Checkbox label>密码模式</Checkbox>
            <Checkbox label>授权码模式</Checkbox>
            <Checkbox label>客户端模式</Checkbox>
            <Checkbox label>刷新模式</Checkbox>
            <Checkbox label>简化模式</Checkbox>
          </CheckboxGroup>
        </FormItem>

        <Row>
          <Col span="12">
            <FormItem label="令牌时效" prop="roleList">
              <Input-number
                :max="10"
                :min="1"
                v-model="form.accessTokenValidity"
                placeholder="请输入令牌时效"
                style="width: 100%;"
              ></Input-number>
            </FormItem>

            <FormItem label="回调地址" prop="phone">
              <Input v-model="form.webServerRedirectUri" placeholder="请输入回调地址" />
            </FormItem>
          </Col>

          <Col span="12">
            <FormItem label="刷新时效" prop="roleList">
              <Input-number
                :max="10"
                :min="1"
                v-model="form.refreshTokenValidity"
                placeholder="请输入刷新时效"
                style="width: 100%;"
              ></Input-number>
            </FormItem>

            <FormItem label="权限" prop="phone">
              <Input v-model="form.authorities" placeholder="请输入权限" />
            </FormItem>
          </Col>
        </Row>

        <FormItem label="扩展信息" prop="phone">
          <Input
            type="textarea"
            v-model="form.additionalInformation"
            placeholder="请输入JSON格式数据"
          />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import * as A from "@/api/system/client";

export default {
  data() {
    return {
      loading: true,
      query: {
        current: 1, // 页数
        size: 10 // 一页数据
      },
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 60
        },
        {
          title: "编号",
          key: "clientId",
          align: "center"
        },
        {
          title: "密钥",
          key: "clientSecret",
          align: "center"
        },
        {
          title: "域",
          key: "scope",
          align: "center"
        },
        {
          title: "自动放行",
          align: "center",
          key: "autoapprove"
        },
        {
          title: "授权方式",
          key: "authorizedGrantTypes",
          align: "center",
          tooltip: true
        },
        {
          title: "令牌时效",
          align: "center",
          key: "accessTokenValidity"
        },
        {
          title: "刷新时效",
          align: "center",
          key: "refreshTokenValidity"
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
      disabled: false
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
      console.log(data)
      this.form = Object.assign({}, data || {});
      this.form.authorizedGrantTypes = typeof this.form.authorizedGrantTypes === 'string' ? data.authorizedGrantTypes.split(",") : this.form.authorizedGrantTypes = []
    },
    remove(data) {
      // if (data.lockFlag) {
      //   this.$Message.error("当前用户正在启用中，无法删除，请停用后再尝试");
      // } else {
      //   }
      this.$Modal.confirm({
        title: "提示",
        content: `是否确认删除ID为"${data.clientId}"?`,
        onOk: () => {
          A.delObj(data.clientId).then(res => {
            this.getData();
            this.$Message.success("操作成功");
          });
        }
      });
    },
    save() {
      this.disabled ||
        Promise.resolve()
          .then(() => {
            return this.form.clientId
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
