<template>
  <Form ref="form" :model="form" :rules="rules" :label-width="80">
    <Row>
      <Col span="24">
        <FormItem prop="sensitiveWord" label="敏感词">
          <Input type="text" v-model="form.sensitiveWord" placeholder="敏感词"></Input>
        </FormItem>
        <FormItem prop="isDisable" label="是否启用">
          <RadioGroup v-model="form.isDisable">
            <Radio :label="0">是</Radio>
            <Radio :label="1">否</Radio>
          </RadioGroup>
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
    <Row>
      <Col span="24">
        <Button class="submit" type="primary" @click="handleSubmit">确定</Button>
      </Col>
    </Row>
  </Form>
</template>

<script>
import { getSensitiveDetail, saveSensitive } from "@/api/sensitive";

const defaultForm = {
  sensitiveWord: "",
  createdAt: "",
  isDisable: 1 // 0 启用，1 禁用
};
export default {
  props: {
    formData: {
      type: Object,
      default: () => defaultForm
    }
  },
  data() {
    return {
      form: Object.assign({}, this.formData),
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
      getSensitiveDetail(id).then(data => {
        // console.log('VersionDetail: ', data);
        this.form = data;
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
            return saveSensitive(this.form);
          } else {
            return Promise.reject();
          }
        })
        .then(() => {
          // console.log(1);
          // this.$refs.form.resetFields()
          this.$Message.success("保存成功");
          // this.form = Object.assign({}, defaultForm);
          this.$emit("submit");
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
</style>
