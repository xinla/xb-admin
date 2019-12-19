<template>
  <div>
    <dialogBox v-model="modal">
      <div slot="title">{{form.id ? '编辑' : '新建'}}</div>
      <Form ref="form" :model="form" :rules="rules" :label-width="80" style="width: 520px;">
        <FormItem label="通知标题" prop="title">
          <Input type="text" v-model="form.title" placeholder="通知标题" />
        </FormItem>
        <FormItem label="跳转链接" prop="linkUrl">
          <Input type="text" v-model="form.linkUrl" placeholder="格式如: http(https)://www.xbkj.com" />
        </FormItem>
        <FormItem label="推送时间" prop="noticedAt">
          <DatePicker
            :value="form.noticedAt"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="推送时间"
            @on-change="change"
          ></DatePicker>
        </FormItem>

        <FormItem label="通知封面" prop="coverUrl">
          <Upload
            :action="uploadUrl"
            :show-upload-list="false"
            :format="['jpg','jpeg','png']"
            accept="image/*"
            :on-success="uploadSuccess"
          >
            <img class="logo" v-if="form.coverUrl" :src="form.coverUrl" />
            <div v-else class="upload-icon cp">
              <Icon type="md-cloud-upload" />
              <p>上传图片</p>
            </div>
          </Upload>
        </FormItem>

        <FormItem label="通知内容" prop="content">
          <Input type="textarea" v-model="form.content" placeholder="通知内容" />
          <!-- <editor ref="editor" :value="form.content" @on-change="editorChange"/> -->
        </FormItem>
      </Form>
      <div class="demo-drawer-footer ar">
        <Button
          type="primary"
          ghost
          style="margin-right: 20px"
          @click="modal = false, handleReset('form')"
        >取消</Button>
        <Button type="primary" @click="submit">确定</Button>
      </div>
    </dialogBox>

    <div class="ar bg pb24">
      <Button type="primary" @click="edit()">创建通知</Button>
    </div>
    <Table :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="content">
        <div v-html="row.content"></div>
      </template>
      <template slot-scope="{ row }" slot="coverUrl">
        <img class="logo" :src="row.coverUrl" />
      </template>
      <template slot-scope="{ row }" slot="action">
        <span
          class="button-pri"
          :style="{'cursor': row.status == 0 ? 'no-drop' : 'pointer'}"
          @click="edit(row)"
        >编辑</span>
        <span class="button-err" @click="deleteMessage(row)">删除</span>
        <span class="button-pri" @click="row.status && send(row)">{{row.status == 0 ? '已推送' : '推送'}}</span>
      </template>
    </Table>

    <Page
      v-show="total"
      :total="total"
      :current="query.page"
      show-elevator
      show-total
      style="text-align:center;margin-top:20px;"
      @on-change="getData"
    />
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
        callback(new Error("链接格式有误，请确认")); // 格式如: http://www.xbkj.com
      }
      callback();
    };
    return {
      uploadUrl: this.$config.services.upload,
      query: {
        page: 1,
        size: 5
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
          width: 200
        }
      ],
      list: [],
      rules: {
        title: [{ required: true, message: "不能为空", trigger: "blur" }],
        coverUrl: [{ required: true, message: "不能为空", trigger: "change" }],
        linkUrl: [
          { required: true, message: "不能为空", trigger: "blur" },
          { validator: validateUrl, trigger: "blur" }
        ],
        content: [{ required: true, message: "不能为空", trigger: "blur" }],
        noticedAt: [{ required: true, message: "不能为空", trigger: "change" }]
      },
      modal: false,
      total: 0
    };
  },
  watch: {},
  created() {
    this.getData();
  },
  mounted() {
    // this.$refs.editor.setHtml("");
  },
  methods: {
    getData(page) {
      page && (this.query.page = page);
      getSystemMessagePage(this.query).then(data => {
        // console.log(data)
        this.list = data.list;
        this.total = +data.total;
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          (this.form.id
            ? updateMessageTemplateById(this.form)
            : addMessageTemplate(this.form)
          ).then(() => {
            this.modal = false;
            this.handleReset("form");
            // this.$refs.editor.setHtml("");
            this.getData(1);
            this.$Message.success("操作成功");
          });
        }
      });
    },
    edit(mes) {
      // console.log(mes)
      if (mes && mes.status === 0) {
        return;
      }
      this.modal = !this.modal;
      this.form = Object.assign({}, mes || {});
      // this.$refs.editor.setHtml(mes.content);
    },
    deleteMessage(mes) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除吗",
        onOk: () => {
          deleteMessageTemplateById(mes).then(data => {
            this.$Message.success("删除成功");
            this.getData();
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
    }
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
  width: 130px;
  height: 83px;
  margin: 10px 0;
  border-radius: 4px;
  cursor: pointer;
}
</style>
