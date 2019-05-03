<template>
  <Form class="member-form" v-if="value" ref="form" :model="form" :rules="rules" :label-width="80">

    <FormItem prop="headImage">
      <img class="headImage" v-if="form.headImage" :src="form.headImage" alt="headImage">
      <Upload 
      v-else
      :action="$config.baseUrl.dev + '/upload'"
      :show-upload-list="false"
      :format="['jpg','jpeg','png']"
      accept="image/*"
      :on-success="upFile">
          <div class="upload-icon cp">上传头像</div>
      </Upload>
    </FormItem>

    <FormItem label="姓名" prop="name">
      <Input v-model="form.name" placeholder="姓名"></Input>
    </FormItem>

    <FormItem label="部门" prop="organizationid">
      <Input v-model="form.organizationid" placeholder="部门"></Input>
    </FormItem>

    <FormItem label="职位" prop="jobname">
      <Input v-model="form.jobname" placeholder="职位"></Input>
    </FormItem>

    <FormItem label="是否加入角色列表" prop="joinstate">
      <RadioGroup v-model="form.joinstate">
        <Radio :label="0">是</Radio>
        <Radio :label="1">否</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem label="是否组织长官" prop="leader">
      <RadioGroup v-model="form.leader">
        <Radio :label="0">是</Radio>
        <Radio :label="1">否</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem label="职务类型" prop="userType">
      <RadioGroup v-model="form.userType">
        <Radio :label="0">内勤</Radio>
        <Radio :label="1">外勤</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem label="工号" prop="jobNumber">
      <Input v-model="form.jobNumber" placeholder="工号"></Input>
      <div>新员工，点击自动生成工号</div>
    </FormItem>

    <FormItem label="手机号" prop="phone">
      <Input v-model="form.phone" placeholder="手机号"></Input>
    </FormItem>

    <FormItem label="座机号码" prop="telPhone">
      <Input v-model="form.telPhone" placeholder="座机号码"></Input>
    </FormItem>

    <FormItem label="邮箱" prop="email">
      <Input v-model="form.email" placeholder="邮箱"></Input>
    </FormItem>
    
    <FormItem>
      <Button @click="submit(1)">保存</Button>
      <Button @click="submit(2)" style="margin-left: 8px">保存并继续添加</Button>
      <Button @click="cancel()" style="margin-left: 8px">取消</Button>
    </FormItem>

  </Form>
</template>
<script>
import { addSupplierUser, updateSupplierUser, getSupplierUserDetail } from "@/api/supplier/user";

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    id: '',
  },
  data() {
    return {
      form: {
        organizationid: '',
        name: '',
        headImage: '',
        name1: '',
        joinstate: 0,
        leader: 0,
        userType: 0,
        phone: '',
        telPhone: '',
        email: '',
        jobname: '',
        roles: []
      },
      rules: {
        name: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        organizationid: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        jobname: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        leader: [
          {
            type: 'number',
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        userType: [
          {
            type: 'number',
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        jobNumber: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
      }
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      if (this.id) {
        getSupplierUserDetail().then(data => {
          console.log(data)
          this.form = data
        })
      }
    },
    upFile(response, file, fileList) {
      // console.log(response, file, fileList)
      // console.log(response.result.fileUrl)
      this.form.logo = response.result.fileUrl
    },
    submit(type) {
      this.$refs['form'].validate()
      .then(data => {
        if (data) {
          if (this.id) {
            return updateSupplierUser(this.form)
          } else {
            return addSupplierUser(this.form)
          }
        } else {
          return new Promise((resolve, reject) => {})
        }
      })
      .then(data => {
        if (type === 1) {
          this.$emit('input', false)
        }
        this.$emit('success')
        this.$refs['form'].resetFields();
        this.$Message.success("Success!");
      })
    },
    cancel() {
      this.$emit('input', false)
      this.$refs['form'].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
  .member-form{
    position: absolute;
    display: inline-block;
    width: 45%;
    background: #fff;
    padding: 20px;
    right: 10px;
  }
</style>

