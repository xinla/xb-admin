<template>
  <Form ref="form" :model="form" :rules="rules">
    <Row>
      <Col span="8">
        <div class="title-row">核心亮点</div>
        <FormItem prop="coreBuy" style="width:80%;">
          <Input v-model="form.coreBuy" placeholder="请输入产品主要特色，不超过30字"/>
        </FormItem>
      </Col>
      <Col span="8">
        <div class="title-row">典型费率</div>
        <FormItem prop="typicalPremium" style="width:80%;">
          <Input v-model="form.typicalPremium" placeholder="请输入产品主要特色，不超过30字"/>
        </FormItem>
      </Col>
    </Row>

    <div class="title-row">
      保险利益
      <Button type="info" size="small" @click="addRow('insurableInterest')">新增一行</Button>
    </div>

    <Row>
      <Col span="8">计划名称</Col>
      <Col span="8">标题</Col>
      <Col span="8">算法</Col>
    </Row>
    <FormItem prop="productCourse">
    <Row v-for="(item, index) of form.insurableInterest" :Key="index">
      <Col span="8">
        <Input
          v-model="item.scheduleName"
          placeholder="请输入标题"
          style="width:73%; margin-right: 10px;"
        />
      </Col>
      <Col span="16">
        <Row v-for="(unit, unique) of item.content" :Key="unique + 'x'">
          <Col span="12">
            <Input v-model="unit.title" placeholder="请输入内容" style="width:73%; margin-right: 10px;"/>
          </Col>
          <Col span="12">
            <Input
              v-model="unit.algorithm"
              placeholder="请输入内容"
              style="width:73%; margin-right: 10px;"
            />
            <Button
              v-if="unique === item.content.length - 1"
              type="info"
              @click="item.content.push({})"
            >添加</Button>
          </Col>
        </Row>
      </Col>
    </Row>
    </FormItem>
    <Divider/>

    <div class="title-row">
      保险责任
      <Button type="info" size="small" @click="addRow('coverage')">新增一行</Button>
    </div>
    <FormItem prop="productCourse">
    <Row v-for="(item, index) of form.coverage" :Key="index">
      <Col span="6">
        <Input v-model="item.title" placeholder="请输入标题" style="width:73%; margin-right: 10px;"/>
      </Col>
      <Col span="18">
        <Input
          type="textarea"
          v-model="item.describe"
          placeholder="请输入内容"
          style="width:73%; margin-right: 10px;"
        />
        <!-- <Button type="primary" @click="add('role')">添加</Button> -->
      </Col>
    </Row>
    </FormItem>
    <Divider/>

    <div class="title-row">免除责任</div>
    <FormItem prop="exclusion">
      <Input
        type="textarea"
        v-model="form.exclusion"
        placeholder="请输入产品主要特色，不超过30字"
        style="width:50%;"
      />
    </FormItem>
    <Divider/>

    <div class="title-row">Banner 图</div>
    <Row>
      <Col span="6">
        <FormItem label="APP" prop="appBannerPicture">
          <Upload
            :action="uploadUrl"
            :show-upload-list="false"
            :format="['jpg','jpeg','png']"
            accept="image/*"
            :on-success="uploadAppBanner"
          >
            <img class="logo" v-if="form.appBannerPicture" :src="form.appBannerPicture">
            <div v-else class="upload-icon cp">+</div>
          </Upload>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="Web" prop="webBannerPicture">
          <Upload
            :action="uploadUrl"
            :show-upload-list="false"
            :format="['jpg','jpeg','png']"
            accept="image/*"
            :on-success="uploadWebBanner"
          >
            <img class="logo" v-if="form.webBannerPicture" :src="form.webBannerPicture">
            <div v-else class="upload-icon cp">+</div>
          </Upload>
        </FormItem>
      </Col>
    </Row>
    <Divider/>

    <div class="title-row">导航图</div>
    <Row>
      <Col span="6">
        <FormItem label="APP" prop="appNavigationPicture">
          <Upload
            :action="uploadUrl"
            :show-upload-list="false"
            :format="['jpg','jpeg','png']"
            accept="image/*"
            :on-success="uploadAppNavigation"
          >
            <img class="logo" v-if="form.appNavigationPicture" :src="form.appNavigationPicture">
            <div v-else class="upload-icon cp">+</div>
          </Upload>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="Web" prop="pcNavigationPicture">
          <Upload
            :action="uploadUrl"
            :show-upload-list="false"
            :format="['jpg','jpeg','png']"
            accept="image/*"
            :on-success="uploadPcNavigation"
          >
            <img class="logo" v-if="form.pcNavigationPicture" :src="form.pcNavigationPicture">
            <div v-else class="upload-icon cp">+</div>
          </Upload>
        </FormItem>
      </Col>
    </Row>
    <Divider/>

    <div class="title-row">封面图</div>
    <Row>
      <Col span="6">
        <FormItem label="APP" prop="appCoverPicture">
          <Upload
            :action="uploadUrl"
            :show-upload-list="false"
            :format="['jpg','jpeg','png']"
            accept="image/*"
            :on-success="uploadAppCover"
          >
            <img class="logo" v-if="form.appCoverPicture" :src="form.appCoverPicture">
            <div v-else class="upload-icon cp">+</div>
          </Upload>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="Web" prop="pcCoverPicture">
          <Upload
            :action="uploadUrl"
            :show-upload-list="false"
            :format="['jpg','jpeg','png']"
            accept="image/*"
            :on-success="uploadPcCover"
          >
            <img class="logo" v-if="form.pcCoverPicture" :src="form.pcCoverPicture">
            <div v-else class="upload-icon cp">+</div>
          </Upload>
        </FormItem>
      </Col>
    </Row>
    <Divider/>

    <div class="title-row">图片描述</div>
    <FormItem label="Web" prop="describePicture">
      <Upload
        :action="uploadUrl"
        :show-upload-list="false"
        :format="['jpg','jpeg','png']"
        accept="image/*"
        :on-success="uploadDescribe"
      >
        <img class="logo" v-if="form.describePicture" :src="form.describePicture">
        <div v-else class="upload-icon cp">+</div>
      </Upload>
    </FormItem>
    <Divider/>
  </Form>
</template>

<script>
import {
  getProductDescByProductId,
  getProductDescByDesctId,
  addProductDesc,
  updateProductDesc
} from "@/api/product/desc";

const defaultForm = {
  productId: "",
  coreBuy: "", // 核心买点
  typicalPremium: "", // 典型费率
  // 保险利益   [{"scheduleName":"计划一","content":[{"title":"重大疾病(100种)
  insurableInterest: [
    {
      content: [{}]
    }
  ],
  // 保险责任   [{"title":"重大疾病保险金","describe":"若被保险人于等待期内发病（见释义）或被确诊患有本合同约定的重大疾病，我们 将向您无息返还本合同累计已交纳的保险费，本合同效力终止。
  coverage: [{}],
  exclusion: "", // 责任免除
  appBannerPicture: "", // app  banner图
  webBannerPicture: "", // web banner图
  appNavigationPicture: "", // app  导航图
  pcNavigationPicture: "", // pc   导航图
  appCoverPicture: "", // app  封面图
  pcCoverPicture: "", // pc   封面图
  describePicture: "" // 图片描述
};
let oldData = "";

export default {
  data() {
    return {
      uploadUrl: this.$config.baseUrl.dev + "/upload",
      form: Object.assign({}, defaultForm),
      rules: {
        coreBuy: [{ required: true, message: "不能为空", trigger: "blur" }],
        typicalPremium: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        insurableInterest: [
          { required: true, type: 'array', message: "不能为空", trigger: "blur" }
        ],
        coverage: [
          { required: true, type: 'array', message: "不能为空", trigger: "blur" }
        ],
        exclusion: [{ required: true, message: "不能为空", trigger: "blur" }],
        appBannerPicture: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        webBannerPicture: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        appNavigationPicture: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        pcNavigationPicture: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        appCoverPicture: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        pcCoverPicture: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        describePicture: [
          { required: true, message: "不能为空", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    this.form.productId = this.$route.query.id;
    // console.log(this.form.productId)
    // this.form.productId || (this.form.productId = this.$route.query.id)
    this.getData();
  },
  methods: {
    getData() {
      this.form.productId &&
        getProductDescByProductId(this.form.productId).then(data => {
          // console.log('productExplain', data)
          data.insurableInterest = JSON.parse(data.insurableInterest);
          data.coverage = JSON.parse(data.coverage);
          this.form = data;
        });
    },
    addRow(type) {
      // console.log(1)
      if (type === "insurableInterest") {
        this.form[type].push({
          content: [{}]
        });
      } else {
        this.form[type].push({});
      }
    },
    uploadAppBanner(response, file, fileList) {
      // console.log(response, file);
      this.form.appBannerPicture = response.result.fileUrl;
    },
    uploadWebBanner(response, file, fileList) {
      this.form.webBannerPicture = response.result.fileUrl;
    },
    uploadAppNavigation(response, file, fileList) {
      this.form.appNavigationPicture = response.result.fileUrl;
    },
    uploadPcNavigation(response, file, fileList) {
      this.form.pcNavigationPicture = response.result.fileUrl;
    },
    uploadAppCover(response, file, fileList) {
      this.form.appCoverPicture = response.result.fileUrl;
    },
    uploadPcCover(response, file, fileList) {
      this.form.pcCoverPicture = response.result.fileUrl;
    },
    uploadDescribe(response, file, fileList) {
      this.form.describePicture = response.result.fileUrl;
    },
    submit() {
      this.form.productId = this.$route.query.id;

      return this.$refs.form
        .validate()
        .then(data => {
          if (data) {
            let isNew = oldData !== JSON.stringify(this.form);
            oldData = JSON.stringify(this.form);

            if (isNew) {
              // console.log(this.form);
              if (this.form.id) {
                return updateProductDesc(this.form);
              } else {
                return addProductDesc(this.form);
              }
            }
          } else {
            return new Promise((resolve, reject) => {});
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
.upload {
  width: 30%;
  display: inline-block;
}
.upload-icon {
  border: 1px dashed #000;
  font-size: 36px;
  padding: 30px;
  line-height: 21px;
}
.logo {
  width: 90px;
  height: 85px;
  cursor: pointer;
}
</style>


