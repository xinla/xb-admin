<template>
  <Form ref="form" :model="form" :rules="rules" :label-width="100">
    <Row>
      <Col span="8">
        <FormItem prop="type" label="分类：">
          <!-- <RadioGroup v-model="form.type">
            <Radio :label="0">是</Radio>
            <Radio :label="1">否</Radio>
          </RadioGroup> -->
          {{form.type | type}}
        </FormItem>
        <FormItem prop="content" label="内容：">
          <!-- <Input type="text" v-model="form.content" placeholder="敏感词"></Input> -->
          {{form.content}}
        </FormItem>
        <FormItem prop="content" label="图片：">
          <img class="img" v-for="(item, index) in (form.imgUrl ? form.imgUrl.split(',') : [])" :src="item" :key="index">
        </FormItem>
        <FormItem prop="content" label="机型数据：">
          {{form.modelData}}
        </FormItem>
        <FormItem prop="content" label="所属用户：">
          {{form.userId}}
        </FormItem>
        <FormItem prop="content" label="所属租户：">
          {{form.companyId}}
        </FormItem>
        <FormItem prop="content" label="创建时间：">
          {{form.createTime}}
        </FormItem>
        <!-- <FormItem prop="createdAt" label="创建时间">
          <Input type="text" v-model="form.createdAt" placeholder=""></Input>
        </FormItem> -->
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
    <!-- <Row>
      <Col span="16">
        <Button class="submit" type="primary" @click="handleSubmit">确定</Button>
      </Col>
    </Row> -->
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
    form: () => defaultForm
  },
  data() {
    return {
      // form: Object.assign({}, defaultForm),
      rules: {
        sensitiveWord: [{ required: true, message: "不能为空", trigger: "blur" }],
        isDisable: [
          {
            type: "number",
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        createdAt: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
      }
    };
  },
  mounted() {
    let id = this.$route.query.id;
    if (id) {
      getFeedbackDetail(id).then(data => {
        // console.log('FeedbackDetail: ', data);
        this.form = data;
      });
    } else {
      this.$Message.error("id为空");
    }
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
.submit {
  display: block;
  margin: 0 auto;
}
/deep/.ivu-select-dropdown {
  z-index: 99999;
}
.img{
  width: 70px;
  height: 70px;
  margin: 2px 5px 2px 0;
}
</style>
