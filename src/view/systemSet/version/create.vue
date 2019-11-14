<template>
  <Form ref="form" :model="form" :rules="rules" :label-width="100">
    <Row>
      <Col span="12">
        <FormItem prop="versionNum" label="版本号">
          <Input type="text" v-model="form.versionNum" placeholder="版本号"></Input>
        </FormItem>
        <FormItem prop="type" label="发布端">
          <CheckboxGroup v-model="form.type">
            <Checkbox
              v-for="(item, index) in typeList"
              :label="item.value"
              :key="index"
            >{{item.label}}</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem prop="download" label="安装包">
          <!-- <Input type="text" v-model="form.download" placeholder="格式如: http(https)://www.xbkj.com"></Input> -->
          <span class="cp" v-if="form.download">{{form.download}}</span>
          <Upload
            :action="$config.services.upload"
            :format="['apk']"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
            :on-format-error="formatError"
          >
            <Button icon="ios-cloud-upload-outline" :loading="upLoading">
              <span>上传</span>
            </Button>
          </Upload>
        </FormItem>
        <!-- <FormItem prop="classifyId" label="分类">
          <Select v-model="form.classifyId" style="width:200px">
            <Option
              v-for="(item, index) in classifyList"
              :value="item.id"
              :key="index"
            >{{ item.name }}</Option>
          </Select>
        </FormItem>-->
        <FormItem prop="forceUpdate" label="是否强制更新">
          <RadioGroup v-model="form.forceUpdate">
            <Radio :label="0">是</Radio>
            <Radio :label="1">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem prop="title" label="标题">
          <Input type="text" v-model="form.title" placeholder="请输入日志标题，不超过30字"></Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <FormItem prop="content" label="内容">
          <!-- <Input type="textarea" v-model="form.content" placeholder="内容"></Input> -->
          <editor ref="editor" :value="form.content" @on-change="editorChange" />
        </FormItem>
        <div class="ac">
        <Button type="primary" @click="cancel">取消</Button>
        <Button style="margin-left: 100px;" type="primary" @click="handleSubmit">确定</Button>
        </div>
      </Col>
    </Row>
  </Form>
</template>

<script>
import { getVersionDetail, saveVersion } from "@/api/version";
import Editor from "_c/editor";
import { validateURL } from "@/libs/tools";

const defaultForm = {
  title: "",
  versionNum: "",
  content: "",
  download: "",
  forceUpdate: 1,
  type: ''
};
export default {
  props: {
    formData: {
      type: Object,
      default: () => defaultForm
    }
  },
  components: {
    Editor
  },
  data() {
    const validateUrl = (rule, value, callback) => {
      if (value && !validateURL(value)) {
        callback(new Error("链接格式有误，请确认")); // 格式如: http://www.xbkj.com
      }
      callback();
    };
    const validateVersionNum = (rule, value, callback) => {
      if (value && !/^V\d\.\d.\d/.test(value)) {
        callback(
          new Error("版本号规则为三位数字，英文小数点。必须以 V 开头。")
        );
      }
      callback();
    };
    return {
      // form: Object.assign({}, defaultForm),
      rules: {
        title: [
          { required: true, message: "不能为空", trigger: "blur" },
          {
            type: "string",
            max: 30,
            message: "更新日志标题最长不超过30字。",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "不能为空",
            trigger: "change"
          }
        ],
        forceUpdate: [
          {
            type: "number",
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        content: [{ required: true, message: "不能为空", trigger: "blur" }],
        download: [
          { required: true, message: "不能为空", trigger: "blur" },
          { validator: validateUrl, trigger: "blur" }
        ],
        versionNum: [
          { required: true, message: "不能为空", trigger: "blur" },
          { validator: validateVersionNum, trigger: "blur" }
        ]
      },
      upLoading: false,
      // 0 安卓 1 IOS 2 WEB
      typeList: [
        {
          value: "0",
          label: "Android",
          color: "default"
        },
        {
          value: "1",
          label: "iOS",
          color: "success"
        },
        {
          value: "2",
          label: "Web",
          color: "error"
        }
      ],
      form: Object.assign({}, this.formData)
    };
  },
  created() {
    this.form.type = this.form.type ? this.form.type.split(",") : this.$set(this.form, 'type', []);
    console.log(this.form)
  },
  mounted() {
    this.$refs.editor.setHtml(this.form.content || "");
  },
  methods: {
    handleSubmit() {
      // console.log(this.form)
      this.$refs.form
        .validate()
        .then(valid => {
          // 判断是否为安卓端
          // if (this.form.type.includes("0")) {
          // }
          
          if (valid) {
            let form = Object.assign({}, this.form);
            form.type += "";
            return saveVersion(form);
          } else {
            return Promise.reject();
          }
        })
        .then(() => {
          // console.log(1);
          // this.$refs.form.resetFields()
          this.$Message.success("保存成功");
          // this.$refs.editor.setHtml("");
          // this.form = Object.assign({}, defaultForm);
          this.$emit("submit");
        });
    },
    cancel() {
      this.$Modal.confirm({
        title: "提示",
        content: "确定取消吗？",
        onOk: () => {
          this.$emit("submit");
        }
      });
    },
    editorChange(html, text) {
      // console.log(html, text);
      this.form.content = html;
      // console.log(this.form.underwritingRulesText)
    },
    beforeUpload() {
      // if (!this.form.supplierId) {
      //   this.$Message.error("请选择品牌后再上传");
      //   return false;
      // }
      this.upLoading = true;
    },
    uploadSuccess(response, file, fileList) {
      // console.log(response, file, fileList);
      if (response.code === 0) {
        this.form.download = response.result.fileUrl;
        this.upLoading = false;
        this.$Message.success("上传成功");
      } else {
        this.$Message.error("上传失败");
      }
    },
    formatError() {
      this.upLoading = false;
      this.$Message.error("文件格式错误，仅限apk格式的文件");
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.ivu-select-dropdown {
  z-index: 99999;
}
</style>
