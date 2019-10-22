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
    padding: 5px 20px;
    margin-right: 10px;
    border: 1px solid #ddd;
    line-height: 1;
  }
}
.anchor {
  display: block;
  padding: 15px 0;
  color: #fff;
  margin: 10px 30px 0 0;
  cursor: pointer;
  background: #fff;
  color: #444;
}
.current {
  background: #313ac3;
  color: #fff;
}
.box {
  border-bottom: 20px solid #f5f7f9;
}
.button-circle {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  color: #ddd;
  border-radius: 50%;
  text-align: center;
  line-height: 14px;
  cursor: pointer;
  margin-right: 5px;
}
</style>

<template>
  <div style="height: calc(100% - 62px);">
    <Row style="height: 100%;">
      <Col span="4">
        <div class="anchor-wrap ac">
          <span :class="['anchor', {current: anchor == 'nav'}]" @click="goPosition('nav')">产品导航</span>
          <span :class="['anchor', {current: anchor == 'cover'}]" @click="goPosition('cover')">产品封面</span>
          <span
            :class="['anchor', {current: anchor == 'benefit'}]"
            @click="goPosition('benefit')"
          >保障利益</span>
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
        <Form ref="form" :model="form" :label-width="100">
          <!-- 产品导航 -->
          <div class="box">
            <div ref="nav" class="title-wrap bfc-o">
              <span class="title">产品导航</span>
              <div class="button-wrap fr">
                <button class="button" type="button" @click="submit()">保存</button>
                <button class="button" type="button" @click="clear()">清空</button>
              </div>
            </div>

            <div>
              <Row>
                <Col span="6">
                  <FormItem>
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
                  <FormItem label prop="pcCoverPicture">
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
                  <FormItem label="核心亮点" prop="pcCoverPicture">
                    <Input v-model="form.coreBuy" placeholder="请输入产品主要特色，不超过200字" />
                  </FormItem>
                  <FormItem label="典型费率" prop="pcCoverPicture">
                    <Input v-model="form.typicalPremium" placeholder="请输入产品典型费率，不超过200字" />
                  </FormItem>
                </Col>
              </Row>
            </div>
          </div>

          <div class="box">
            <div ref="cover" class="title-wrap bfc-o">
              <span class="title">产品封面</span>
            </div>

            <div>
              <Row>
                <Col span="6">
                  <FormItem label prop="pcCoverPicture">
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
                  <FormItem>
                    <Upload
                      :action="uploadUrl"
                      :show-upload-list="false"
                      :format="['jpg','jpeg','png']"
                      accept="image/*"
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

          <div class="box">
            <div ref="benefit" class="title-wrap bfc-o">
              <span class="title">保险利益说明</span>
            </div>

            <div>
              <Row>
                <Col span="8">标题</Col>
                <Col span="8">描述（算法）</Col>
              </Row>
              <Row v-for="(item, index) of form.insurableInterest" :Key="index">
                <Col span="8">
                  <FormItem label="Web" prop="pcCoverPicture">
                    <Input
                      v-model="item.title"
                      placeholder="请输入标题"
                      style="width:60%; margin-right: 10px;"
                    />
                  </FormItem>
                </Col>

                <Col span="8">
                  <FormItem label="Web" prop="pcCoverPicture">
                    <Input
                      v-model="item.algorithm"
                      placeholder="请输入内容"
                      style="width:73%; margin-right: 10px;"
                    />
                  </FormItem>
                </Col>
                <Col span="8">
                  <span
                      class="button-circle"
                      @click="reduce('insurableInterest', index)"
                    >-</span>
                </Col>
              </Row>
              <button class="button" type="button" @click="addItem('insurableInterest')">添加</button>
            </div>
          </div>

          <div class="box">
            <div ref="feature" class="title-wrap bfc-o">
              <span class="title">产品特色</span>

              <button
                :class="['button', {current: featureType === 0}]"
                type="button"
                @click="featureType = 0"
              >图文</button>
              <button
                :class="['button', {current: featureType === 1}]"
                type="button"
                @click="featureType = 1"
              >图集</button>
            </div>

            <div>
              <editor
                ref="editor"
                v-show="featureType === 0"
                :value="form.imageText"
                @on-change="editorChange"
              />

              <div v-show="featureType === 1">
                <img v-for="(item, index) of form.atlas.split(',')" :Key="index" :src="item" alt />
                <Upload
                  :action="uploadUrl"
                  :show-upload-list="false"
                  :format="['jpg','jpeg','png']"
                  accept="image/*"
                  :on-success="uploadAtlas"
                >
                  <div class="upload-icon cp">+</div>
                </Upload>
              </div>
            </div>
          </div>

          <div class="box">
            <div ref="inform" class="title-wrap bfc-o">
              <span class="title">投保须知</span>
            </div>

            <div>
              <Upload
                :action="uploadUrl"
                :show-upload-list="false"
                :data="{productId: $route.query.id}"
                :on-success="uploadRulePdf"
              >
                <Button icon="ios-cloud-upload-outline">上传投保规则</Button>
                <span>{{form.insuranceRulePdf}}</span>
              </Upload>
              <editor
                ref="editorRule"
                :value="form.insuranceRuleText"
                @on-change="editorChangeRule"
              />
            </div>
          </div>

          <div class="box">
            <div ref="responsibility" class="title-wrap bfc-o">
              <span class="title">保险责任</span>
            </div>

            <div>
              <Upload
                :action="uploadUrl"
                :show-upload-list="false"
                :data="{productId: $route.query.id}"
                :on-success="uploadLiabilityPdf"
              >
                <Button icon="ios-cloud-upload-outline">上传条款</Button>
              </Upload>

              <button class="button" type="button" @click="addItem()">保险责任</button>
              <button class="button" type="button" @click="addItem()">免除责任</button>

              <Row>
                <Col span="8">标题</Col>
                <Col span="8">描述（算法）</Col>
              </Row>
              <Row v-for="(item, index) of form.insuranceLiability" :Key="index">
                <Col span="8">
                  <FormItem prop="pcCoverPicture">
                    <Input
                      v-model="item.title"
                      placeholder="请输入标题"
                      style="width:60%; margin-right: 10px;"
                    />
                  </FormItem>
                </Col>

                <Col span="8">
                  <FormItem prop="pcCoverPicture">
                    <Input
                      v-model="item.desc"
                      placeholder="请输入内容"
                      style="width:73%; margin-right: 10px;"
                    />
                  </FormItem>
                </Col>

                <Col span="8">
                  <span
                      class="button-circle"
                      @click="reduce('insuranceLiability', index)"
                    >-</span>
                </Col>
              </Row>
              <button class="button" type="button" @click="addItem('insuranceLiability')">添加</button>
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

import Editor from "_c/editor";

export default {
  components: {
    Editor
  },
  data() {
    const defaultForm = {
      productId: "",
      navigationUrl: "", // 导航图链接地址
      bannerUrl: "", // banner图链接地址
      coreBuy: "", // 核心买点
      typicalPremium: "", // 典型费率
      coverUrl: "", // 封面图片链接地址
      coverVideoUrl: "", // 封面视频链接地址
      // 保险利益
      insurableInterest: [
        {
          title: "",
          algorithm: ""
        }
      ],
      imageText: "", // 图文  富文本编辑内容
      atlas: "", // 图集  多个图片上传逗号分隔
      insuranceRulePdf: "", // 投保规则pdf链接地址
      insuranceRuleText: "", // 投保须知富文本编辑内容
      insuranceLiabilityPdf: "", // 保险责任PDF
      insuranceLiability: [{ title: "", desc: "" }], // 保险责任内容 [{"title":"标题","desc":"描述"}]
      exemptLiability: "" // 责任免除
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
      },

      anchor: "nav",
      featureType: 0
    };
  },
  mounted() {
    // console.log(this.form.productId)
    // this.form.productId || (this.form.productId = this.$route.query.id)
    this.getData();
  },
  methods: {
    getData() {
      this.form.productId = this.$route.query.id;
      this.form.productId &&
        getProductDesc(this.form.productId).then(data => {
          console.log("productExplain", data);
          if (!data) {
            return;
          }
          // 图集空值判断设置
          data.atlas = data.atlas || '';
          // 保险利益
          data.insurableInterest = JSON.parse(data.insurableInterest);
          // 保险责任内容
          data.insuranceLiability = JSON.parse(data.insuranceLiability);
          this.form = data;

          // 设置富文本内容
          this.$refs.editor.setHtml(this.form.imageText);
          this.$refs.editorRule.setHtml(this.form.insuranceRuleText);
        });
    },
    addRow(type) {
      // console.log(1)

      if (
        type === "insurableInterest" &&
        this.form[type][this.form[type].length - 1].scheduleName
      ) {
        this.form[type].push({
          content: [{}]
        });
      } else if (
        type === "coverage" &&
        this.form[type][this.form[type].length - 1].title
      ) {
        this.form[type].push({});
      } else {
        this.$Message.error("上一条信息请填写完整，再添加下一条");
      }
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
      this.form.insuranceRulePdf = response.result.fileUrl;
    },
    uploadLiabilityPdf(response, file, fileList) {
      this.form.insuranceLiabilityPdf = response.result.fileUrl;
    },
    submit() {
      this.form.productId = this.$route.query.id;

      this.$refs.form
        .validate()
        .then(data => {
          if (data) {
            let formData = Object.assign({}, this.form);

            // console.log(this.form);
            // 数组字段转字符串
            formData.describePicture += "";

            if (formData.id) {
              return updateProductDesc(formData);
            } else {
              return saveProductDesc(formData);
            }
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
            this.getData();
            this.$Message.success("操作成功");
            // this.form.resetFields()
            // console.log(1)
          })
        }
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
    addItem(type) {
      let data =  this.form[type]
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
    remove2(data, index) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定删除吗?",
        onOk: () => {
          data.splice(index, 1);
        }
      });
    },

    goPosition(data) {
      console.log(this.$refs.scroll.$el.scrollTop);
      this.$refs.scroll.$el.scrollTop = this.$refs[data].offsetTop;
      this.anchor = data;
    },
    // 产品特色富文本
    editorChange(html, text) {
      // console.log(html, text);
      this.form.imageText = html;
      // console.log(this.form.underwritingRulesText)
    },
    // 投保须知富文本
    editorChangeRule(html, text) {
      console.log(html, text);
      this.form.insuranceRuleText = html;
      console.log(this.form.insuranceRuleText)
    }
  }
};
</script>




