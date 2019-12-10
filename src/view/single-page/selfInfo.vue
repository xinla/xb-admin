<template>
  <div>
    <Tabs v-model="current">
      <TabPane label="信息管理" name="info">
        <Row>
          <Col :span="10">
            <Form ref="form" :model="form" :rules="rules" :label-width="100">
              <FormItem label="用户名">
                <Input v-model="form.username" placeholder="用户名" disabled></Input>
              </FormItem>

              <FormItem label="手机号">
                <Input v-model="form.phone" placeholder="手机号"></Input>
              </FormItem>

              <FormItem label="头像">
                <xUpload type="drag" :on-success="uploadSuccess">
                  <img v-if="form.avatar" :src="form.avatar">
                  <div v-else style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>拖拽上传头像</p>
                  </div>
                </xUpload>
              </FormItem>

              <FormItem label="社交登录">
                github | 绑定微信｜ 绑定码云 | 开源中国
              </FormItem>

              <FormItem>
                <Button type="primary" style="margin-right: 10px;" @click="save(0)">保存</Button>
                <Button>取消</Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="密码管理" name="password">
        <Row>
          <Col :span="10">
            <Form ref="formPassword" :model="formPassword" :rules="rules" :label-width="100">
              <FormItem label="原密码">
                <Input type="password" v-model="formPassword.password" placeholder="原密码" ></Input>
              </FormItem>

              <FormItem label="新密码">
                <Input type="password" v-model="formPassword.newpassword" placeholder="新密码"></Input>
              </FormItem>
              
              <FormItem label="确认新密码">
                <Input type="password" v-model="formPassword.newpassword1" placeholder="确认新密码"></Input>
              </FormItem>

              <FormItem>
                <Button type="primary" style="margin-right: 10px;" @click="save(1)">保存</Button>
                <Button>取消</Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import * as A from "@/api/permission/user";
import { getToken } from '@/libs/util'

export default {
  components: {},
  props: {},
  data() {
    return {
      current: "info",
      form: {},
      rules: {},
      token: 'Bearer ' + getToken(),
      formPassword: {}
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    console.log(this.$route)
    this.current = this.$route.params.anchor || 'info'
    this.getData()
  },
  methods: {
    getData() {
      A.getUserInfo(this.$store.state.user.userName).then(res => {
        this.form = Object.assign({}, res)
        this.formPassword = Object.assign({}, res)
      })
    },
    save(type) {
      if (type && this.form.newpassword !== this.form.newpassword1) {
        this.$Message.error("两次密码不一致，请确认");
        return
      }
      A.modifyUser(this.form).then(res => {
        this.$Message.success("操作成功");
        this.getData()
      });
    },
    uploadSuccess(res, file, fileList) {
      this.form.avatar = res.fileUrl
    },
  }
};
</script>
<style lang="less" scoped>
</style>
