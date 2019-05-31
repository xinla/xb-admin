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
      <Select v-model="form.jobname" style="width:200px" placeholder="职位" multiple>
        <OptionGroup v-for="(item, index) of roleAndRoleGroup" :label="item.xbRoleGroups.groupName" :key="index">
            <Option v-for="(unit, unique) in item.roles" :value="unit.name" :key="unique" @click.native="change(unit)"></Option>
        </OptionGroup>
      </Select>
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
      <Button size="small" type="primary" @click="autoCreate">新员工，点击自动生成工号</Button>
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
import { addSupplierUser, updateSupplierUser, getSupplierUserDetail, getAllGroupAndRole } from "@/api/supplier/user";

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
        jobNumber: '',
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
            trigger: "change"
          }
        ],
        phone: [
          {
            required: true,
            message: "必填项",
            trigger: "blur"
          }
        ],
      },
      roleAndRoleGroup: []
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getData()
      getAllGroupAndRole().then(data => {
        this.roleAndRoleGroup = data
        // console.log(this.roleAndRoleGroup)
      })
    },
    getData() {
      if (this.id) {
        getSupplierUserDetail().then(data => {
          // console.log(data)
          this.form = data
        })
      }
    },
    upFile(response, file, fileList) {
      // console.log(response, file, fileList)
      // console.log(response.result.fileUrl)
      this.form.headImage = response.result.fileUrl
    },
    submit(type) {
      this.$refs['form'].validate()
      .then(data => {
        if (data) {
          this.form.jobname = this.form.jobname.join()
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
    },
    autoCreate() {
      this.form.jobNumber = Math.floor(Math.random()*10e+15).toString()
    },
    change(data) {
      this.roles.includes(data)
      ? this.roles.splice(this.roles.indexOf(data), 1)
      : this.roles.push(data)
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
    // right: 10px;
  }
  .headImage {
    width: 86px;
    height: 80px;
  }
</style>

