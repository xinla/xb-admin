<template>
  <Form ref="form" :rules="rules" v-model="form">
    <div class="title-row">投保规则</div>
    <a v-if="form.applicationRules" :href="form.applicationRules">{{form.applicationRulesName}}</a>
    <Upload :action="uploadUrl" :on-success="uploadRule">
      <Button icon="ios-cloud-upload-outline">上传</Button>
    </Upload>
    <Divider/>

    <div class="title-row">产品条款</div>
    <a v-if="form.policyWording" :href="form.policyWording">{{form.policyWordingName}}</a>
    <Upload :action="uploadUrl" :on-success="uploadWording">
      <Button icon="ios-cloud-upload-outline">上传</Button>
    </Upload>
    <Divider/>

    <div class="title-row">产品课件</div>
    <Row class="ac">
      <Col span="4">作者</Col>
      <Col span="4">课件标题</Col>
      <Col span="4">副标题</Col>
      <Col span="4">文件类型</Col>
      <Col span="4">文件大小</Col>
      <Col span="4">上传课件</Col>
    </Row>
    <Row class="ac" v-for="(item, index) of form.productCourse" :Key="index">
      <Col span="4">
        <Input v-model="item.writer" placeholder="请输入姓名" style="width:73%; margin-right: 10px;"/>
      </Col>
      <Col span="4">
        <Input v-model="item.title" placeholder="请输入课件标题" style="width:73%; margin-right: 10px;"/>
      </Col>
      <Col span="4">
        <Input v-model="item.subtitle" placeholder="请输入副标题" style="width:73%;"/>
      </Col>
      <Col span="4">
        {{item.fileType || '-'}}
        <!-- <Select v-model="model1" style="width:73%;">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>-->
      </Col>
      <Col span="4">{{item.fileSize || '-'}}</Col>
      <Col span="4">
        <a v-if="item.url" :href="item.url">{{item.title}}</a>
        <Upload v-else :action="uploadUrl" :on-success="uploadCourse">
          <Button icon="ios-cloud-upload-outline">上传</Button>
        </Upload>
        <!-- <Button type="primary" @click="add('role')">添加</Button> -->
      </Col>
    </Row>
    <Divider/>
  </Form>
</template>

<script>
import {
  getProductAttachment,
  addProductAttachment,
  updateProductAttachment
} from "@/api/product/attachment";
import { formatFileSize } from "@/libs/tools";

const defaultForm = {
  productId: "", //
  applicationRules: "", // 投保规则上传的OSS地址
  applicationRulesName: "", // 投保规则上传的文件名
  policyWording: "", // 产品条款上传的oss地址
  policyWordingName: "",
  productCourse: [
    {
      writer: "",
      title: "",
      subtitle: "",
      fileType: "",
      fileSize: "",
      url: ""
    }
  ]
};

export default {
  data() {
    return {
      uploadUrl: this.$config.baseUrl.dev + "/upload",
      form: Object.assign({}, defaultForm),
      rules: {
        applicationRules: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        policyWording: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        productCourse: [
          {
            required: true,
            type: "array",
            message: "不能为空",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    this.form.productId = this.$route.query.id;
    this.getData();
  },
  methods: {
    getData() {
      this.form.productId &&
        getProductAttachment(this.form.productId).then(data => {
          console.log(data);
          this.form = data;
        });
    },
    uploadCourse(response, file, fileList) {
      this.form.productCourse[this.form.productCourse.length - 1].url =
        response.result.fileUrl;
      this.form.productCourse[this.form.productCourse.length - 1].fileType =
        response.result.fileType;
      this.form.productCourse[
        this.form.productCourse.length - 1
      ].fileSize = formatFileSize(response.result.fileSize);
      this.form.productCourse.push({});
      // console.log(response, file, fileList)
    },
    uploadRule(response, file, fileList) {
      this.form.applicationRules = response.result.fileUrl;
      this.form.applicationRulesName = response.result.fileName;
      // console.log(response, file)
    },
    uploadWording(response, file, fileList) {
      this.form.policyWording = response.result.fileUrl;
      this.form.policyWordingName = response.result.fileName;
      // console.log(response, file)
    },
    submit() {
      this.form.productId = this.$route.query.id || "2257229893945262088";
      return Promise.resolve()
        .then(data => {
          if (data) {
            if (this.form.id) {
              // console.log(1)
              return updateProductAttachment(this.form);
            } else {
              return addProductAttachment(this.form);
            }
          }
        })
        .then(() => {
          this.getData();
          return Promise.resolve();
        });
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-btn-primary {
}
</style>
