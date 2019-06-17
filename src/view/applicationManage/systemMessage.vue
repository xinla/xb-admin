<template>
  <div>
    <div class="title-row">创建通知</div>
    <Form ref="form" :model="form" :rules="rules" :label-width="120">
      <Row>
        <Col span="8">
          <FormItem label="通知标题" prop="title">
            <Input type="text" v-model="form.title" placeholder="通知标题"/>
          </FormItem>
          <FormItem label="跳转链接" prop="linkUrl">
            <Input type="text" v-model="form.linkUrl" placeholder="格式如: www.xbkj.com"/>
          </FormItem>
          <FormItem label="推送时间" prop="noticedAt">
            <DatePicker
              :value="form.noticedAt"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              placeholder="推送时间"
              style="width: 200px"
              @on-change="change"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="通知封面" prop="coverUrl">
            <Upload
            :action="uploadUrl"
            :show-upload-list="false"
            :format="['jpg','jpeg','png']"
            accept="image/*"
            :on-success="uploadSuccess"
          >
            <img class="logo" v-if="form.coverUrl" :src="form.coverUrl">
            <div v-else class="upload-icon cp">+</div>
          </Upload>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
        <FormItem label="通知内容" prop="content">
          <Input type="textarea" v-model="form.content" placeholder="通知内容"/>
            <!-- <editor ref="editor" :value="form.content" @on-change="editorChange"/> -->
          </FormItem>
          <div class="ac">
            <Button type="primary" ghost @click="handleReset('form')">清空内容</Button>
            <Button type="primary" @click="submit">{{isEdit ? '确认修改' : '确认添加'}}</Button>
          </div>
        </Col>
      </Row>
    </Form>

    <Divider/>

    <div class="title-row">通知列表</div>
    <Table :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="content">
        <div v-html="row.content"></div>
        </template>
      <template slot-scope="{ row }" slot="coverUrl">
        <img class="logo" :src="row.coverUrl">
        </template>
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" :disabled="row.status == 0" @click="edit(row)">编辑</Button>
        <Button type="error" size="small" @click="deleteMessage(row)">删除</Button>
        <Button
          type="primary"
          size="small"
          @click="row.status && send(row)"
        >{{row.status == 0 ? '已推送' : '推送'}}</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import {
  getSystemMessagePage,
  addMessageTemplate,
  deleteMessageTemplateById,
  updateMessageTemplateById,
  sendMessage
} from "@/api/systemMessage";
import { validateURL } from "@/libs/tools";
// import Editor from "_c/editor";

const defaultForm = {
  title: "",
  linkUrl: "",
  coverUrl: "",
  content: "",
  noticedAt: ""
};
export default {
  // components: {
  //   Editor
  // },
  data() {
    const validateUrl = (rule, value, callback) => {
      if (value && !validateURL(value)) {
        callback(new Error("链接格式有误，请确认，格式如: www.xbkj.com"));
      }
      callback();
    };
    return {
      uploadUrl: this.$config.services.upload,
      query: {
        page: 1,
        size: 20
      },
      form: Object.assign({}, defaultForm),
      columns: [
        {
          title: "标题",
          key: "title"
        },
        {
          title: "内容",
          slot: "content"
        },
        {
          title: "通知封面",
          slot: "coverUrl"
        },
        {
          title: "跳转链接",
          key: "linkUrl"
        },
        {
          title: "推送时间",
          key: "noticedAt"
        },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align: "center"
        }
      ],
      list: [],
      rules: {
        title: [{ required: true, message: "不能为空", trigger: "blur" }],
        coverUrl: [{ required: true, message: "不能为空", trigger: "change" }],
        linkUrl: [{ validator: validateUrl, trigger: "blur" }],
        content: [{ required: true, message: "不能为空", trigger: "blur" }],
        noticedAt: [{ required: true, message: "不能为空", trigger: "change" }]
      },
      isEdit: false
    };
  },
  watch: {},
  created() {
    this.getSystemMessagePage();
  },
  mounted() {
    // this.$refs.editor.setHtml("");
  },
  methods: {
    getSystemMessagePage() {
      getSystemMessagePage(this.query).then(data => {
        // console.log(data)
        this.list = data.list;
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.isEdit = false;
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          Promise.resolve()
            .then(() => {
              return this.isEdit
                ? updateMessageTemplateById(this.form)
                : addMessageTemplate(this.form);
            })
            .then(() => {
              this.isEdit = false;
              this.handleReset("form");
              // this.$refs.editor.setHtml("");
              this.getSystemMessagePage();
              this.$Message.success("操作成功");
            });
        }
      });
    },
    edit(mes) {
      // console.log(mes)
      this.form = Object.assign({}, mes);
      // this.$refs.editor.setHtml(mes.content);
      this.isEdit = true;
    },
    deleteMessage(mes) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除吗",
        onOk: () => {
          deleteMessageTemplateById(mes).then(data => {
            this.$Message.success("删除成功");
            this.getSystemMessagePage();
          });
        }
      });
    },
    send(mes) {
      mes.senderId = this.$store.state.user.userId;
      // console.log(this.$store.state.user.userId)
      sendMessage(mes).then(data => {
        mes.status = 0;
        this.$Message.success("推送成功");
      });
    },
    change(data) {
      // console.log(data)
      this.form.noticedAt = data;
    },
    uploadSuccess(response, file, fileList) {
      this.form.coverUrl = response.result.fileUrl;
    },
    // editorChange(html, text) {
    //   // console.log(html, text);
    //   this.form.content = html;
    //   // console.log(this.form.underwritingRulesText)
    // },
  }
};
</script>
<style lang="less" scoped>
.ivu-btn {
  margin-right: 5px;
}
.ivu-btn-ghost.ivu-btn-primary {
  margin-right: 50px;
}
.logo {
  width: 89px;
  height: 83px;
  margin: 5px;
  cursor: pointer;
}
.upload-icon {
  border: 1px dashed #000;
  font-size: 36px;
  padding: 30px;
  line-height: 21px;
}
</style>
