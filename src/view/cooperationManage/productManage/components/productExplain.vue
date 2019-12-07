<style>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>
<style lang="less" scoped>
.title-wrap {
  padding: 15px 20px;
  background: #e0effd;
  line-height: 25px;
  .title {
    font-size: 16px;
    font-weight: 600;
    margin-right: 30px;
  }
  .button {
    margin-right: 10px;
    line-height: 1;
  }
}
.anchor {
  display: block;
  padding: 15px 0;
  color: #fff;
  margin: 0 30px 10px 0;
  cursor: pointer;
  background: #fff;
  color: #444;
}
.current {
  background: #2d8cf0;
  color: #fff;
}
.box {
  border-bottom: 20px solid #f5f7f9;
  .box-content {
    margin: 20px;
  }
}
/deep/.up-wrap .ivu-form-item-content {
  margin-left: 0 !important;
}
.up-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  height: 200px;
  margin: 0 20px;
  max-width: 300px;
}
.atlas {
  width: 200px;
  height: 200px;
  margin: 0 20px 20px 0;
}
/deep/.box .ivu-row {
  margin-bottom: 10px;
}
/deep/.ivu-btn {
  margin-bottom: 10px;
}
// 设置富文本最低高度
/deep/.ck-rounded-corners .ck.ck-editor__main > .ck-editor__editable,
.ck.ck-editor__main > .ck-editor__editable.ck-rounded-corners {
  min-height: 300px;
}
</style>

<template>
  <div>
    <Row style="height: 100%;">
      <Col span="4">
        <div class="anchor-wrap ac">
          <span :class="['anchor', {current: anchor == 'nav'}]" @click="goPosition('nav')">产品导航</span>
          <span :class="['anchor', {current: anchor == 'cover'}]" @click="goPosition('cover')">产品封面</span>
          <!-- <span
            :class="['anchor', {current: anchor == 'benefit'}]"
            @click="goPosition('benefit')"
          >保障利益</span>-->
          <span
            :class="['anchor', {current: anchor == 'feature'}]"
            @click="goPosition('feature')"
          >产品特色</span>
          <span
            :class="['anchor', {current: anchor == 'inform'}]"
            @click="goPosition('inform')"
          >投保须知</span>
          <span
            :class="['anchor', {current: anchor == 'responsibility'}]"
            @click="goPosition('responsibility')"
          >保险责任</span>
        </div>
      </Col>

      <Col
        ref="scroll"
        span="20"
        style="background: #fff; position: absolute; right: 0; height: 100%; overflow: auto; transition: all 1s;"
      >
        <Form ref="form" :model="form" :rules="rules" :label-width="100">
          <!-- 产品导航 -->
          <div class="box">
            <div ref="nav" class="title-wrap bfc-o">
              <span class="title">产品导航</span>
              <div class="button-wrap fr">
                <Button class="button" @click="submit()">保存</Button>
                <Button class="button" @click="clear()">清空</Button>
              </div>
            </div>

            <div class="box-content">
              <Row>
                <Col span="6">
                  <FormItem class="up-wrap">
                    <Upload
                      :action="uploadUrl"
                      :show-upload-list="false"
                      :format="['jpg','jpeg','png']"
                      accept="image/*"
                      :on-success="uploadNavigation"
                    >
                      <img class="logo" v-if="form.navigationUrl" :src="form.navigationUrl" />
                      <div v-else class="upload-icon cp">+上传导航图片</div>
                    </Upload>
                  </FormItem>
                </Col>

                <Col span="8">
                  <FormItem class="up-wrap" prop>
                    <Upload
                      :action="uploadUrl"
                      :show-upload-list="false"
                      :format="['jpg','jpeg','png']"
                      accept="image/*"
                      :on-success="uploadBanner"
                    >
                      <img class="logo" v-if="form.bannerUrl" :src="form.bannerUrl" />
                      <div v-else class="upload-icon cp">+banner图链接地址</div>
                    </Upload>
                  </FormItem>
                </Col>

                <Col span="10">
                  <FormItem label="核心亮点" prop="d">
                    <Input v-model="form.coreBuy" placeholder="请输入产品主要特色，不超过200字" />
                  </FormItem>
                  <FormItem label="典型费率" prop>
                    <Input v-model="form.typicalPremium" placeholder="请输入产品典型费率，不超过200字" />
                  </FormItem>
                  <FormItem label="产品特色">
                    <Input
                      type="text"
                      v-show="productFeatureShow || !productFeature.length"
                      v-model="form.productFeature"
                      placeholder="产品特色，多个以英文逗号','分开"
                      @on-enter="transLabel()"
                      @on-blur="transLabel()"
                    />

                    <Select
                      v-show="!productFeatureShow && productFeature.length"
                      v-model="productFeature"
                      multiple
                      :max-tag-count="3"
                      @click.native="productFeatureShow = !productFeatureShow"
                      @on-change="selectChange()"
                    >
                      <Option
                        v-for="(item, index) in productFeature"
                        :value="item"
                        :key="index"
                      >{{item}}</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
            </div>
          </div>

          <div class="box">
            <div ref="cover" class="title-wrap bfc-o">
              <span class="title">产品封面</span>
            </div>

            <div class="box-content">
              <Row>
                <Col span="6">
                  <FormItem class="up-wrap">
                    <Upload
                      :action="uploadUrl"
                      :show-upload-list="false"
                      :format="['jpg','jpeg','png']"
                      accept="image/*"
                      :on-success="uploadCover"
                    >
                      <img class="logo" v-if="form.coverUrl" :src="form.coverUrl" />
                      <div v-else class="upload-icon cp">+封面图片链接地址</div>
                    </Upload>
                  </FormItem>
                </Col>

                <Col span="8">
                  <FormItem class="up-wrap">
                    <Upload
                      :action="uploadUrl"
                      :show-upload-list="false"
                      accept="video/*"
                      :on-success="uploadCoverVideo"
                    >
                      <img class="logo" v-if="form.coverVideoUrl" :src="form.pcCoverPicture" />
                      <div v-else class="upload-icon cp">+封面视频链接地址</div>
                    </Upload>
                  </FormItem>
                </Col>
              </Row>
            </div>
          </div>

          <!-- <div class="box">
            <div ref="benefit" class="title-wrap bfc-o">
              <span class="title">保险利益说明</span>
            </div>

            <div class="box-content">
              <Row>
                <Col span="8">标题</Col>
                <Col span="8">描述（算法）</Col>
              </Row>
              <Row
                v-for="(item, index) of form.insurableInterest"
                :Key="index"
                style="margin-bottom: 10px;"
              >
                <Col span="8">
                  <Input
                    v-model="item.title"
                    placeholder="请输入标题"
                    style="width:60%; margin-right: 10px;"
                  />
                </Col>

                <Col span="8">
                  <Input
                    v-model="item.algorithm"
                    placeholder="请输入内容"
                    style="width:73%; margin-right: 10px;"
                  />
                </Col>
                <Col span="8">
                  <span class="button-circle" @click="reduce('insurableInterest', index)">-</span>
                </Col>
              </Row>
              <Button @click="addItem('insurableInterest')">添加</Button>
            </div>
          </div>-->

          <div class="box">
            <div ref="feature" class="title-wrap bfc-o">
              <span class="title">产品特色</span>
            </div>
            <Tabs>
              <TabPane label="图文">
                <div style="width: 100%; max-width: 640px; margin: 0 20px 20px;">
                  <!-- <ckeditor
                    :editor="editor"
                    v-model="form.imageText"
                    :config="editorConfig"
                    @ready="onReady"
                  ></ckeditor>-->
                  <editor ref="editor" :value="form.imageText" @on-change="handleChange" />
                </div>
              </TabPane>
              <TabPane label="图集">
                <div class="box-content">
                  <img
                    class="atlas fl"
                    v-for="(item, index) of form.atlas.split(',')"
                    :Key="index"
                    :src="item"
                    alt
                  />
                  <Upload
                    class="up-wrap"
                    :action="uploadUrl"
                    :show-upload-list="false"
                    :format="['jpg','jpeg','png']"
                    accept="image/*"
                    :on-success="uploadAtlas"
                  >
                    <div class="upload-icon cp">+上传图片</div>
                  </Upload>
                </div>
              </TabPane>
            </Tabs>
          </div>

          <div class="box">
            <div ref="inform" class="title-wrap bfc-o">
              <span class="title">投保须知</span>
            </div>

            <div class="box-content" style="width: 100%; max-width: 640px;">
              <Upload
                :action="uploadUrl"
                :show-upload-list="false"
                :data="{image: true}"
                :format="['pdf']"
                :on-format-error="formatErrorPdf"
                :on-success="uploadRulePdf"
                :before-upload="beforeUpload"
              >
                <Button icon="ios-cloud-upload-outline">{{form.insuranceRulePdf ? '替换' : '上传'}}投保规则</Button>
              </Upload>
              <!-- <ckeditor
                :editor="editor"
                v-model="form.insuranceRuleText"
                :config="editorConfig"
                @ready="onReady"
              ></ckeditor>-->
              <editor ref="editor1" :value="form.insuranceRuleText" @on-change="handleChange1" />
            </div>
          </div>

          <div class="box">
            <div ref="responsibility" class="title-wrap bfc-o">
              <span class="title">保险责任</span>
            </div>

            <div class="box-content">
              <Upload
                :action="uploadUrl"
                :show-upload-list="false"
                :data="{image: true}"
                :format="['pdf']"
                :on-format-error="formatErrorPdf"
                :on-success="uploadLiabilityPdf"
                :before-upload="beforeUpload"
              >
                <Button
                  icon="ios-cloud-upload-outline"
                >{{form.insuranceLiabilityPdf ? '替换' : '上传'}}条款</Button>
              </Upload>

              <Tabs style="min-height: 300px;">
                <TabPane label="保险责任">
                  <Row v-for="(item, index) of form.insuranceLiability" :Key="index">
                    <Col span="11">
                      <div>责任类型</div>
                      <Select
                        v-model="item.mainClass"
                        placeholder="请选择大类"
                        style="width: 38%; margin-right: 4%;"
                      >
                        <Option
                          v-for="(unit, index) in allClass"
                          :value="unit.id"
                          :key="index"
                        >{{unit.dictName}}</Option>
                      </Select>

                      <Select v-model="item.smallClass" placeholder="请选择小类" style="width: 38%;">
                        <template v-for="_item in allClass">
                          <template v-if="item.mainClass === _item.id">
                            <Option
                              v-for="(unit, index) in _item.childs"
                              :value="unit.id"
                              :key="index"
                            >{{unit.dataName}}</Option>
                          </template>
                        </template>
                      </Select>

                      <div>算法</div>
                      <Input
                        type="textarea"
                        v-model="item.algorithm"
                        placeholder="请输入内容"
                        style="width:80%;"
                      />
                    </Col>

                    <Col span="11">
                      <div>标题</div>
                      <Input v-model="item.title" placeholder="请输入标题" style="width:80%;" />

                      <div>对应条款</div>
                      <Input
                        type="textarea"
                        v-model="item.provision"
                        placeholder="请输入条款"
                        style="width:80%;"
                      />
                    </Col>
                    <Col span="2">
                      <span class="button-circle" @click="reduce('insuranceLiability', index)">-</span>
                    </Col>
                  </Row>

                  <Button class="button" type="primary" @click="addItem('insuranceLiability')">+ 添加</Button>
                </TabPane>
                <TabPane label="免除责任">
                  <Input type="textarea" v-model="form.exemptLiability" style="width: 60%;" />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </Form>
      </Col>
    </Row>
  </div>
</template>

<script>
import {
  getProductDesc,
  saveProductDesc,
  updateProductDesc,
  clearProductDesc
} from "@/api/product/desc";
import { getProductMainClass, getAllDitionaryItem } from "@/api/dataDictionary";
import Editor from "_c/editor";

import axios from "axios";
import config from "@/config";

// import CKEditor from "@ckeditor/ckeditor5-vue";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import "@ckeditor/ckeditor5-build-classic/build/translations/zh-cn";

// class MyUploadAdapter {
//   constructor(loader) {
//     // Save Loader instance to update upload progress.
//     this.loader = loader;
//   }

//   async upload() {
//     const data = new FormData();
//     data.append("typeOption", "upload_image");
//     data.append("file", await this.loader.file);

//     return new Promise((resolve, reject) => {
//       axios({
//         url: config.services.upload,
//         data,
//         method: "post",
//         headers: { "Content-Type": "multipart/form-data" }
//       })
//         .then(res => {
//           // console.log(res);
//           resolve({ default: res.data.result.fileUrl });
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   }
// }

const defaultForm = {
  productId: "",
  navigationUrl: "", // 导航图链接地址
  bannerUrl: "", // banner图链接地址
  coreBuy: "", // 核心买点
  typicalPremium: "", // 典型费率
  coverUrl: "", // 封面图片链接地址
  coverVideoUrl: "", // 封面视频链接地址
  // 保险利益
  // insurableInterest: [
  //   {
  //     title: "",
  //     algorithm: ""
  //   }
  // ],
  imageText: "", // 图文  富文本编辑内容
  atlas: "", // 图集  多个图片上传逗号分隔
  insuranceRulePdf: "", // 投保规则pdf链接地址
  insuranceRuleText: "", // 投保须知富文本编辑内容
  insuranceLiabilityPdf: "", // 保险责任PDF
  insuranceLiability: [{ title: "", desc: "" }], // 保险责任内容 [{"title":"标题","desc":"描述"}]
  exemptLiability: "" // 责任免除
};

export default {
  components: {
    // ckeditor: CKEditor.component,
    Editor
  },
  data() {
    return {
      uploadUrl: this.$config.services.upload,
      // editor: ClassicEditor,
      // editorConfig: {
      //   // The configuration of the editor.
      //   language: "zh-cn"
      // },
      form: JSON.parse(JSON.stringify(defaultForm)),
      rules: {
        coreBuy: [
          {
            required: true,
            type: "string",
            message: "不能为空",
            trigger: "blur"
          }
        ],
        typicalPremium: [
          { required: true, message: "不能为空", trigger: "blur" }
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
        pcCoverPicture: [
          { required: true, message: "不能为空", trigger: "change" }
        ]
        // describePicture: [
        //   {
        //     required: true,
        //     type: "array",
        //     message: "不能为空",
        //     trigger: "change"
        //   }
        // ]
      },

      anchor: "nav",
      productFeature: [],
      productFeatureShow: false,
      allClass: []
    };
  },
  mounted() {
    // console.log(this.form.productId);
    // this.form.productId || (this.form.productId = this.$route.query.id)
    getProductMainClass().then(res => {
      // console.log("allClass", res);
      this.allClass = res;
    });
    this.getData();
  },
  methods: {
    getData() {
      this.form.productId = this.$route.query.id;
      this.form.productId &&
        getProductDesc(this.form.productId).then(data => {
          // console.log("productExplain", data);
          if (!data) {
            return;
          }
          // 图集空值判断设置
          data.atlas = data.atlas || "";
          // 保险利益
          // data.insurableInterest = JSON.parse(data.insurableInterest);
          // 保险责任内容
          data.insuranceLiability = JSON.parse(data.insuranceLiability);
          this.form = data;

          // 设置富文本内容
          this.form.imageText || (this.form.imageText = "");
          this.form.insuranceRuleText || (this.form.insuranceRuleText = "");

          this.$refs.editor.setHtml(this.form.imageText);
          this.$refs.editor1.setHtml(this.form.insuranceRuleText);
        });
    },
    beforeUpload() {
      this.$Spin.show({
        render: h => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "ios-loading",
                size: 18
              }
            }),
            h("div", "Loading")
          ]);
        }
      });
    },
    uploadNavigation(response, file, fileList) {
      this.form.navigationUrl = response.result.fileUrl;
      // console.log(response, file);
      console.log(this.form.navigationUrl);
    },
    uploadBanner(response, file, fileList) {
      this.form.bannerUrl = response.result.fileUrl;
    },
    uploadCover(response, file, fileList) {
      this.form.coverUrl = response.result.fileUrl;
    },
    uploadCoverVideo(response, file, fileList) {
      this.form.coverVideoUrl = response.result.fileUrl;
    },
    uploadAtlas(response, file, fileList) {
      this.form.atlas += "," + response.result.fileUrl;
    },
    uploadRulePdf(response, file, fileList) {
      this.form.insuranceRulePdf = response.result.imageUrl;
      this.$Spin.hide();
    },
    uploadLiabilityPdf(response, file, fileList) {
      this.form.insuranceLiabilityPdf = response.result.imageUrl;
      this.$Spin.hide();
    },
    submit() {
      this.form.productId = this.$route.query.id;

      this.$refs.form
        .validate()
        .then(data => {
          if (data) {
            let formData = Object.assign({}, this.form);
            // 数组字段转字符串
            // formData.describePicture += "";

            if (formData.id) {
              return updateProductDesc(formData);
            } else {
              return saveProductDesc(formData);
            }
          } else {
            return Promise.reject();
          }
        })
        .then(() => {
          this.getData();
          this.$Message.success("操作成功");
        });
    },
    clear() {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要清空吗",
        onOk: () => {
          clearProductDesc(this.form.id).then(res => {
            this.form = JSON.parse(JSON.stringify(defaultForm));
            this.$Message.success("操作成功");
            // this.form.resetFields()
            // console.log(1)
          });
        }
      });
    },
    addItem(type) {
      let data = this.form[type];
      if (data[data.length - 1].title) data.push({});
      else this.$Message.error("上一条信息请填写完整，再添加下一条");
    },
    reduce(field, index) {
      if (index === 0) {
        this.$Message.error("最后一项不可删除！");
        return;
      }
      this.form[field].splice(index, 1);
    },
    goPosition(data) {
      // console.log(this.$refs.scroll.$el.scrollTop);
      this.$refs.scroll.$el.scrollTop = this.$refs[data].offsetTop;
      this.anchor = data;
    },
    // 富文本自定义图片删除插件
    // onReady(editor) {
    //   // DecoupledEditor.create(document.querySelector("#editor"), {
    //   //   extraPlugins: [MyCustomUploadAdapterPlugin]
    //   // }).catch(error => {
    //   //   console.log(error);
    //   // });
    //   // function MyCustomUploadAdapterPlugin() {}
    //   editor.plugins.get("FileRepository").createUploadAdapter = loader => {
    //     return new MyUploadAdapter(loader);
    //   };
    // },
    transLabel() {
      if (this.form.productFeature) {
        this.productFeature = this.form.productFeature.split(",");
      }
      this.productFeatureShow = false;
    },
    selectChange() {
      this.form.productFeature = this.productFeature.join(",");
      // console.log(this.form.specialProfessionalLimit)
    },
    formatErrorPdf() {
      this.$Spin.hide();
      this.$Message.error("文件格式不正确，请选择“pdf”格式的文件");
    },
    handleChange(html, text) {
      // console.log(html, text);
      this.form.imageText = html;
      // console.log(this.form.underwritingRulesText)
    },
    handleChange1(html, text) {
      // console.log(html, text);
      this.form.insuranceRuleText = html;
      // console.log(this.form.underwritingRulesText)
    }
  }
};
</script>




