<template>
  <Form ref="form" :model="form">
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
            style="width:60%; margin-right: 10px;"
          />
          <Button
                v-if="index > 0"
                type="error"
                @click="remove('insurableInterest', index)"
              >删除该计划</Button>
        </Col>
        <Col span="16">
          <Row v-for="(unit, unique) of item.content" :Key="unique + 'x'">
            <Col span="12">
              <Input
                v-model="unit.title"
                placeholder="请输入内容"
                style="width:73%; margin-right: 10px;"
              />
            </Col>
            <Col span="12">
              <Input
                v-model="unit.algorithm"
                placeholder="请输入内容"
                style="width:50%; margin-right: 10px;"
              />
              <Button
                v-if="unique === item.content.length - 1"
                type="info"
                @click="addItem(item.content)"
              >添加</Button>
              <Button
                v-if="unique > 0"
                type="error"
                @click="remove2(item.content, unique)"
              >删除</Button>
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
          <Button
                v-if="index > 0"
                type="error"
                @click="remove('coverage', index)"
              >删除</Button>
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
      <div v-for="(item, index) in form.describePicture" class="img-wrap" :key="index">
        <img class="logo" :src="item">
        <div class="mask-img">
          <i class="iconfont iconCancel-circle cp" @click="remove('describePicture', index)"></i>
        </div>
      </div>
      <Upload
        :action="uploadUrl"
        :show-upload-list="false"
        :format="['jpg','jpeg','png']"
        accept="image/*"
        :on-success="uploadDescribe"
      >
        <div class="upload-icon cp">+</div>
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

let oldData = "";

export default {
  data() {
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
      describePicture: [] // 图片描述
    };
    return {
      uploadUrl: this.$config.services.upload,
      form: Object.assign({}, defaultForm),
      rules: {
        coreBuy: [{ required: true, message: "不能为空", trigger: "blur" }],
        typicalPremium: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        insurableInterest: [
          {
            required: true,
            type: "array",
            message: "不能为空",
            trigger: "blur"
          }
        ],
        coverage: [
          {
            required: true,
            type: "array",
            message: "不能为空",
            trigger: "blur"
          }
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
    // console.log(this.form.productId)
    // this.form.productId || (this.form.productId = this.$route.query.id)
    // this.getData();
  },
  methods: {
    getData() {
      this.form.productId = this.$route.query.id;
      this.form.productId &&
        getProductDescByProductId(this.form.productId).then(data => {
          // console.log('productExplain', data)
          if (!data) {
           return 
          }
          data.insurableInterest = JSON.parse(data.insurableInterest);
          data.coverage = JSON.parse(data.coverage);
          data.describePicture = data.describePicture.split(",");
          this.form = data;
        });
    },
    addRow(type) {
      // console.log(1)

      if (type === "insurableInterest" && this.form[type][this.form[type].length - 1].scheduleName) {
        this.form[type].push({
          content: [{}]
        });
      } else if (type === 'coverage' && this.form[type][this.form[type].length - 1].title) {
        this.form[type].push({});
      } else {
        this.$Message.error('上一条信息请填写完整，再添加下一条')
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
      this.form.describePicture.push(response.result.fileUrl);
    },
    submit() {
      this.form.productId = this.$route.query.id;

      return this.$refs.form
        .validate()
        .then(data => {
          if (data) {
            let formData = Object.assign({}, this.form);
            let isNew = oldData !== JSON.stringify(this.form);
            oldData = JSON.stringify(this.form);

            // 过滤重复提交(暂废弃)
            if (true) {
              // console.log(this.form);
              // 数组字段转字符串
              formData.describePicture += "";

              if (formData.id) {
                return updateProductDesc(formData);
              } else {
                return addProductDesc(formData);
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
    },
    remove(type, index) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定删除吗?",
        onOk: () => {
          this.form[type].splice(index, 1);
        }
      });
    },
    addItem(data) {
      if (data[data.length - 1].title) data.push({})
      else this.$Message.error('上一条信息请填写完整，再添加下一条')
    },
    remove2(data, index) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定删除吗?",
        onOk: () => {
          data.splice(index, 1);
        }
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
.ivu-upload {
  display: inline-block;
  vertical-align: middle;
}
.upload-icon {
  border: 1px dashed #000;
  font-size: 36px;
  padding: 30px;
  line-height: 21px;
}
.logo {
  width: 89px;
  height: 83px;
  cursor: pointer;
}
.img-wrap {
  display: inline-block;
  position: relative;
  margin: 5px;
}
.img-wrap:hover .mask-img {
  display: flex;
}
.mask-img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: none;
  align-items: center;
  justify-content: center;
  background: rgba(62, 62, 62, 0.77);
  color: #eee;
}
.ivu-btn{
  margin-right: 5px;
}
</style>


