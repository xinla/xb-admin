<template>
  <Form ref="form" :rules="rules" v-model="form">
    <div class="title-row">投保规则<span class="tip">（必填项）</span></div>
    <a v-if="form.applicationRules" :href="form.applicationRules">{{form.applicationRulesName}}</a>
    <!-- <FormItem prop="applicationRules"> -->
    <Upload :action="uploadUrl" :show-upload-list="false" :on-success="uploadRule">
      <Button icon="ios-cloud-upload-outline">上传</Button>
    </Upload>
    <!-- </FormItem> -->
    <Divider/>

    <div class="title-row">产品条款<span class="tip">（必填项）</span></div>
    <a v-if="form.policyWording" :href="form.policyWording">{{form.policyWordingName}}</a>
    <!-- <FormItem prop="policyWording"> -->
    <Upload :action="uploadUrl" :show-upload-list="false" :on-success="uploadWording">
      <Button icon="ios-cloud-upload-outline">上传</Button>
    </Upload>
    <!-- </FormItem> -->
    <Divider/>

    <div class="title-row">
      产品课件<span class="tip">（必填项）</span>
      <Button type="info" size="small" @click="addRow()">新增一行</Button>
    </div>
    <Row class="ac">
      <Col span="4">作者</Col>
      <Col span="4">课件标题</Col>
      <Col span="4">副标题</Col>
      <Col span="4">文件类型</Col>
      <Col span="4">文件大小</Col>
      <Col span="4">上传课件</Col>
    </Row>
    <!-- <FormItem prop="productCourse"> -->
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
      <Col span="4" class="oe">
        <a v-if="item.url" :href="item.url">{{item.url}}</a>
        <Upload
          :action="uploadUrl"
          :format="['pdf','ppt']"
          :on-success="uploadCourse"
          :show-upload-list="false"
          :on-format-error="formatError"
        >
          <Button icon="ios-cloud-upload-outline" @click="upload(index)">上传</Button>
        </Upload>
        <!-- <Button type="primary" @click="add('role')">添加</Button> -->
      </Col>
    </Row>
    <!-- </FormItem> -->
    <Divider/>
  </Form>
</template>

<script>
import {
  getProductAttachmentByProductId,
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
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        policyWording: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        productCourse: [
          {
            required: true,
            type: "array",
            message: "不能为空",
            trigger: "change"
          }
        ]
      },
      upIndex: 0
    };
  },
  mounted() {
    this.form.productId = this.$route.query.id;
    this.getData();
  },
  methods: {
    getData() {
      this.form.productId &&
        getProductAttachmentByProductId(this.form.productId).then(data => {
          // console.log('productAccessory', data);
          data.productCourse = JSON.parse(data.productCourse);
          this.form = data;
        });
    },
    uploadCourse(response, file, fileList) {
      this.form.productCourse[this.upIndex].url = response.result.fileUrl;
      this.form.productCourse[this.upIndex].fileType = response.result.fileType;
      // this.form.productCourse[this.upIndex].fileType = 0;
      this.form.productCourse[this.upIndex].fileSize = formatFileSize(
        response.result.fileSize
      );
      this.form.productCourse.splice();
      // console.log(response, file, fileList)
    },
    uploadRule(response, file, fileList) {
      this.form.applicationRules = response.result.fileUrl;
      this.form.applicationRulesName = response.result.newName;
      // console.log(response, file, fileList);
    },
    uploadWording(response, file, fileList) {
      this.form.policyWording = response.result.fileUrl;
      this.form.policyWordingName = response.result.newName;
      // console.log(response, file)
    },
    addRow() {
      if (!this.form.productCourse.length) {
        this.form.productCourse.push({});
        return;
      }
      if (this.form.productCourse[this.form.productCourse.length - 1].url) {
        this.form.productCourse.push({});
      } else {
      }
    },
    submit() {
      this.form.productId = this.$route.query.id;
      let formData = Object.assign({}, this.form);
      // 判断课件最后一个对象是否为空，若空则删除
      if (
        Object.keys(formData.productCourse[formData.productCourse.length - 1])
          .length === 0
      ) {
        formData.productCourse.pop();
      }
      formData.productCourse = JSON.stringify(formData.productCourse);

      return Promise.resolve()
        .then(() => {
          if (
            this.form.applicationRules &&
            this.form.policyWording &&
            this.form.productCourse[0].url
          ) {
            if (formData.id) {
              // console.log(1)
              return updateProductAttachment(formData);
            } else {
              return addProductAttachment(formData);
            }
          } else {
            this.$Message.error("信息填写不完整");
            return new Promise((resolve, reject) => {});
          }
        })
        .then(() => {
          this.getData();
          return Promise.resolve();
        });
    },
    formatError() {
      this.$Message.error("文件格式错误，仅限pdf和ppt格式的文件");
    },
    upload(index) {
      this.upIndex = index;
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-upload {
  float: right;
}
.ivu-btn-primary {
}
</style>
