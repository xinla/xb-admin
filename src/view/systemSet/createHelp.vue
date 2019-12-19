<template>
  <Form ref="form" :model="form" :rules="rules" :label-width="80" style="margin-top: 24px;">
    <Row>
      <Col span="8">
        <FormItem prop="title" label="标题">
          <Input type="text" v-model="form.title" placeholder="标题"></Input>
        </FormItem>
        <FormItem prop="classifyId" label="分类">
          <Select v-model="form.classifyId" style="width:200px">
            <Option
              v-for="(item, index) in classifyList"
              :value="item.id"
              :key="index"
            >{{ item.name }}</Option>
          </Select>
        </FormItem>
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
import {
  modifyHelp,
  addHelp,
  getHelpById,
  getHelpClassify
} from "@/api/systemHelp";
import Editor from "_c/editor";

const defaultForm = {
  title: "",
  classifyId: 0,
  content: ""
};
export default {
  components: {
    Editor
  },
  data() {
    return {
      form: Object.assign({}, defaultForm),
      classifyList: [],
      rules: {
        title: [{ required: true, message: "不能为空", trigger: "blur" }],
        classifyId: [
          {
            type: "number",
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        content: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  watch: {},
  mounted() {
    this.$refs.editor.setHtml("");

    let id = this.$route.query.id;
    if (id) {
      getHelpById(id).then(data => {
        data.classifyId = parseInt(data.classifyId);
        this.form = data;
        this.$refs.editor.setHtml(data.content);
        // console.log(data)
      });
    }
    getHelpClassify().then(data => {
      this.classifyList = data;
      // console.log(this.classifyList)
    });
  },
  methods: {
    handleSubmit() {
      // console.log(this.form)
      this.$refs.form
        .validate()
        .then(valid => {
          if (valid) {
            return !this.$route.query.id
              ? addHelp(this.form).then(data => {
                  this.$Message.success("添加成功");
                })
              : modifyHelp(this.form).then(data => {
                  this.$Message.success("修改成功");
                });
          } else {
            return Promise.reject();
          }
        })
        .then(() => {
          // console.log(1);
          // this.$refs.form.resetFields()
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
