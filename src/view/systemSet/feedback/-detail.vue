<template>
  <Form ref="form" :model="form" :label-width="100">
    <Row>
      <Col span="8">
        <FormItem label="类型：">
          {{form.type | type}}
        </FormItem>
        <FormItem label="类型：">
          <Tag :color="statusList[row.status].color">{{statusList[row.status].label}}</Tag>
        </FormItem>
        <FormItem label="反馈人：">
          {{form.companyName}} {{form.userName}}
        </FormItem>
        <FormItem label="反馈时间：">
          {{form.createTime}}
        </FormItem>
        <FormItem label="内容：">
          {{form.content}}
        </FormItem>
        <FormItem label="图片：">
          <img class="img" v-for="(item, index) in (form.imgUrl ? form.imgUrl.split(',') : [])" :src="item" :key="index">
        </FormItem>
        <!-- <FormItem label="创建时间">
          <Input type="text" v-model="form.createdAt" placeholder=""></Input>
        </FormItem> -->
        <!-- <FormItem label="分类">
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
        <Button type="primary" size="small" :disabled="row.status === 1" style="margin-right: 5px" @click="edit(row, 1)">处理</Button>
        <Button type="warning" size="small" :disabled="row.status >= 1" style="margin-right: 5px" @click="edit(row, 2)">关闭</Button>
        <Button type="error" size="small" style="margin-right: 5px" @click="edit(row, 3)">删除</Button>
      </Col>
    </Row>
  </Form>
</template>

<script>
import { getFeedbackDetail } from "@/api/systemHelp";

const defaultForm = {
  type: 0, // 0 建议，1 问题
  content: "",
  imgUrl: "",
  modelData: "",
  userId: "",
  companyId: "",
  createTime: "",
};
const type = [
  {
    label: "建议",
    value: 0
  },
  {
    label: "问题",
    value: 1
  }
];
export default {
  filters: {
    type(val) {
      return type[val].label
    }
  },
  props: {
    formData: {
      formData: Object,
      default: () => defaultForm
    }
  },
  data() {
    return {
      form: Object.assign({}, this.formData),
      // 0 未处理  1已处理 2已关闭
      statusList: [
        {
          value: 0,
          label: "未处理",
          color: "default"
        },
        {
          value: 1,
          label: "已处理",
          color: "success"
        },
        {
          value: 2,
          label: "已关闭",
          color: "error"
        }
      ],
    };
  },
  mounted() {
    // let id = this.$route.query.id;
    // if (id) {
    //   getFeedbackDetail(id).then(data => {
    //     // console.log('FeedbackDetail: ', data);
    //     this.form = data;
    //   });
    // } else {
    //   this.$Message.error("id为空");
    // }
  },
  methods: {
    handleSubmit() {
      // console.log(this.form)
      this.$refs.form
        .validate()
        .then(valid => {
          if (valid) {
            return saveSensitive(this.form);
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
  }
};
</script>
<style lang="less" scoped>
/deep/.ivu-select-dropdown {
  z-index: 99999;
}
.img{
  width: 70px;
  height: 70px;
  margin: 2px 5px 2px 0;
}
</style>
