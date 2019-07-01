<template>
  <Form ref="form" :model="form" :rules="rules" :label-width="100">
    <Row>
      <Col span="8">
        <FormItem prop="title" label="标题">
          <Input type="text" v-model="form.title" placeholder="标题"></Input>
        </FormItem>
        <FormItem prop="forceUpdate" label="是否强制更新">
          <RadioGroup v-model="form.forceUpdate">
            <Radio :label="0">是</Radio>
            <Radio :label="1">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem prop="versionNum" label="版本号">
          <Input type="text" v-model="form.versionNum" placeholder="版本号"></Input>
        </FormItem>
        <FormItem prop="download" label="下载地址">
          <Input type="text" v-model="form.download" placeholder="格式如: http(https)://www.xbkj.com"></Input>
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
      </Col>
    </Row>
    <Row>
      <Col span="16">
        <FormItem prop="content" label="内容">
          <!-- <Input type="textarea" v-model="form.content" placeholder="内容"></Input> -->
          <editor ref="editor" :value="form.content" @on-change="editorChange" />
        </FormItem>
        <Button class="submit" type="primary" @click="handleSubmit">确定</Button>
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
  forceUpdate: 1
};
export default {
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
    return {
      form: Object.assign({}, defaultForm),
      rules: {
        title: [{ required: true, message: "不能为空", trigger: "blur" }],
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
        versionNum: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.$refs.editor.setHtml("");

    let id = this.$route.query.id;
    if (id) {
      getVersionDetail(id).then(data => {
        // console.log('VersionDetail: ', data);
        this.form = data;
        this.$refs.editor.setHtml(data.content);
      });
    }
  },
  methods: {
    handleSubmit() {
      // console.log(this.form)
      this.$refs.form
        .validate()
        .then(valid => {
          if (valid) {
            return saveVersion(this.form);
          } else {
            return Promise.reject();
          }
        })
        .then(() => {
          // console.log(1);
          // this.$refs.form.resetFields()
          this.$Message.success("保存成功");
          this.$refs.editor.setHtml("");
          this.form = Object.assign({}, defaultForm);
          this.$router.back();
        });
    },
    editorChange(html, text) {
      // console.log(html, text);
      this.form.content = html;
      // console.log(this.form.underwritingRulesText)
    }
  }
};
</script>
<style lang="less" scoped>
.submit {
  display: block;
  margin: 0 auto;
}
/deep/.ivu-select-dropdown {
  z-index: 99999;
}
</style>
