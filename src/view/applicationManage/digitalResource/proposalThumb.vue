<template>
    <div>
      <div class="right">
          <Button type="primary" size="small" style="margin-right:5px;" @click="edit(0)">添加分类</Button>
          <Button type="primary" size="small" style="margin-right:5px;" @click="edit(1)">添加标题</Button>
      </div>

      <Table :loading="loading" :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="cover">
          <img :src="row.cover" class="logo" />
        </template>

        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="edit(1, row)">编辑</Button>
          <Button type="error" size="small" style="margin-right: 5px" @click="remove(row.id)">删除</Button>
        </template>
      </Table>

      <Page :total="total" show-elevator show-total class="c-page" @on-change="getData" />

      <dialogBox v-model="isShow">
        <template slot="title">添加分类</template>
        <template>
          <Form ref="form" :model="form" :rules="rules">
            <FormItem prop="value">
              <Input type="text" v-model="form.value" placeholder="请输入分类"></Input>
            </FormItem>
            <div class="ar">
              <Button type="primary" ghost @click="isShow = false">取消</Button>
              <Button type="primary" @click="submit(0, form)">确定</Button>
            </div>
          </Form>
        </template>
      </dialogBox>

      <dialogBox v-model="isShow1">
        <template slot="title">添加标题</template>
        <template>
          <Form ref="form1" :model="form1" :rules="rules">
            <FormItem prop="classifyId">
              <Select v-model="form1.classifyId">
                <Option
                  v-for="(item, index) in list2"
                  :value="item.id"
                  :key="index"
                >{{ item.value }}</Option>
              </Select>
            </FormItem>

            <FormItem prop="cover" label="上传封面">
              <Upload
                :action="$config.services.upload"
                :show-upload-list="false"
                :format="['jpg','jpeg','png']"
                accept="image/*"
                :on-success="upFile"
              >
                <img class="logo" v-if="form1.cover" :src="form1.cover" />
                <div v-else class="upload-icon cp">
                  <Icon type="md-cloud-upload" />
                </div>
              </Upload>
            </FormItem>
            <div class="ar" style="border-top: 1px solid #ddd;">
              <Button type="primary" ghost @click="isShow1 = false">取消</Button>
              <Button type="primary" @click="submit(1, form1)">确定</Button>
            </div>
          </Form>
        </template>
      </dialogBox>
    </div>
</template>

<script>
import {
  getProposalPage,
  saveProposal,
  deleteProposal,
  getProposalDictPage,
  saveProposalDict
} from "@/api/proposal";
import dialogBox from "@/components/dialogBox";

const form = {
  value: ""
};

const form1 = {
  classifyId: "",
  title: "",
  cover: "",
  type: 1,
  key: "",
  value: "",
  createTime: "",
  updateTime: ""
};

export default {
  components: { dialogBox },
  data() {
    return {
      loading: true,
      query: {
        page: 1,
        size: 10,
        type: 1,
        classifyId: ""
      },
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "分类",
          key: "value",
          align: "center"
        },
        {
          title: "标题",
          slot: "cover",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      list: [],
      list2: [
        { id: "1", value: "健康类" },
        { id: "2", value: "养老类" },
        { id: "3", value: "教育类" },
        { id: "4", value: "保障类" },
        { id: "5", value: "理财类" },
        { id: "6", value: "人寿类" },
        { id: "7", value: "意外类" }
      ],
      rules: {
        value: [{ required: true, message: "不能为空", trigger: "blur" }],
        cover: [{ required: true, message: "不能为空", trigger: "change" }],
        classifyId: [{ required: true, message: "不能为空", trigger: "change" }]
      },
      form: Object.assign({}, form),
      form1: Object.assign({}, form1),
      isShow: false,
      isShow1: false,
      total: 0
    };
  },
  computed: {},
  watch: {
    isShow(val) {
      if (!val) {
        this.cancel();
      }
    },
    isShow1(val) {
      if (!val) {
        this.cancel();
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(page) {
      this.loading = true;
      page && (this.query.page = page);
      getProposalPage(this.query).then(res => {
        // console.log('ProposalPage: ', res);
        this.loading = false;
        this.list = res.list;
        this.total = res.total;
      });
      getProposalDictPage(this.query).then(res => {
        // console.log("ProposalDictPage", res);
        // 先写死，后期获取
        // this.list2 = res.list;
      });
    },
    edit(_type, item) {
      if (_type === 0) {
        this.isShow = true;
        this.form = Object.assign({}, form);
      } else {
        this.isShow1 = true;
        this.form1 = Object.assign({}, form1);
        item && (this.form1 = Object.assign({}, item));
      }
    },
    submit(type, item) {
      // 0 分类 ， 1 建议书
      // console.log('supplierForm', this.supplierForm)
      // console.log('productForm', this.productForm)
      (type === 0 ? this.$refs.form.validate() : this.$refs.form1.validate())
        .then(data => {
          if (data) {
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
        .then(() => {
          if (type === 0) {
            return saveProposalDict(item);
          } else {
            return saveProposal(item);
          }
        })
        .then(data => {
          this.getData();
          this.$Message.success("操作成功");
          this.cancel(type);
        });
    },
    cancel(type) {
      this.$refs.form.resetFields();
      this.$refs.form1.resetFields();
      type === 0 ? (this.isShow = false) : (this.isShow1 = false);
    },
    remove(id) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除吗",
        onOk: () => {
          deleteProposal(id).then(data => {
            this.getData();
            this.$Message.success("操作成功");
          });
        }
      });
    },
    upFile(response, file, fileList) {
      if (!response.result) {
        this.$Message.error(response.message);
      } else {
        this.form1.cover = response.result.fileUrl;
      }
      // console.log(response, file, fileList)
      // console.log(response.result.fileUrl)
    }
  }
};
</script>
<style lang="less" scoped>
.upload-icon {
  border: 1px dashed #000;
  padding: 24px 0;
}
.logo {
  width: 220px;
  height: 100px;
  margin: 5px 0;
}
/deep/.dialog{
  width: 350px;
  overflow: visible;
}
.right{
  position: absolute;
  top: 5px;
  right: 0;
}
</style>
