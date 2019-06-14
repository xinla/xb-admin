<template>
  <div>
    <Row>
      <Col span="12">
        <Form ref="form" :model="form" :label-width="40" inline>
          <FormItem label="品牌">
            <selectSupplier :val="form.name" type="brand" @change="change"/>
          </FormItem>
        </Form>
      </Col>
      <Col span="12">
        <div class="fr">
          <!-- <Button size="small" type="primary" @click="download">下载模板</Button> -->
          <Upload
            :action="uploadUrl"
            :data="{supplierId: form.supplierId}"
            :format="['xls','xlsx']"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
          >
            <Button icon="ios-cloud-upload-outline" :loading="loading">
              <span v-if="!loading">上传表格</span>
              <span v-else>Loading...</span>
            </Button>
          </Upload>
        </div>
      </Col>
    </Row>

    <tree-table
      :expand-type="false"
      :columns="columns"
      :selectable="true"
      children-prop="children"
      select-type="radio"
      :is-fold="false"
      empty-text="Loading..."
      :data="list"
    >
      <template slot-scope="{ row }" slot="cmmonCareer">
        <RadioGroup v-model="row.cmmonCareer">
          <Radio :label="0">不常用</Radio>
          <Radio :label="1">常用</Radio>
        </RadioGroup>
      </template>
      <template slot="action" slot-scope="{ row }">
        <Button type="primary" size="small" @click="submit(row)">确定</Button>
        <!-- <Button type="success" size="small" @click="addChild(row)">添加下级</Button> -->
        <!-- <Button type="error" size="small" @click="deleteMenu(row)">删除</Button> -->
      </template>
    </tree-table>

    <Page
      :total="total"
      show-elevator
      show-total
      style="text-align:center;margin-top:20px;"
      @on-change="getData"
    />
  </div>
</template>

<script>
import { getProfessionPage, updateProfession } from "@/api/rulesSet/profession";
import selectSupplier from "@/components/selectSupplier";

export default {
  components: {
    selectSupplier
  },
  props: {},
  data() {
    return {
      form: {
        supplierId: "",
        name: ""
      },
      uploadUrl:
        this.$config.domain + this.$config.services.profession + "/import",
      loading: false,
      query: {
        id: 0,
        page: 1,
        size: 10
      },
      columns: [
        {
          title: "职业代码",
          key: "code",
          align: "center"
        },
        {
          title: "职业名称",
          key: "name",
          align: "center"
        },
        {
          title: "职业风险等级",
          key: "occupationalRiskLevel",
          align: "center"
        },
        {
          title: "住院风险等级",
          key: "hospitalRiskLevel",
          align: "center"
        },
        {
          title: "设为常用",
          type: "template",
          template: "cmmonCareer",
          align: "center"
        },
        {
          title: "设为常用",
          type: "template",
          template: "action",
          align: "center"
        }
      ],
      list: [],
      total: 0
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getData();
  },
  methods: {
    getData(page) {
      page && (this.query.page = page);
      // this.loading = true;
      getProfessionPage(this.query).then(res => {
        // console.log("ProfessionPage: ", res);
        this.loading = false;
        this.total = res.total;
        this.list = res.list;
      });
    },
    download() {
      downloadProfessionTable();
    },
    beforeUpload() {
      if (!this.form.supplierId) {
        this.$Message.error("请选择品牌后再上传");
        return false;
      }
      this.loading = true;
    },
    uploadSuccess(response, file, fileList) {
      // console.log(response, file, fileList);
      // this.form.rateTableUrl = file.name
      if (response.code === 0) {
        this.getData();
        this.$Message.success("上传成功");
      } else {
        this.$Message.error("上传失败");
      }
    },
    change(item) {
      this.form.supplierId = item.id;
      this.form.name = item.name;
      // console.log(item)
    },
    submit(data) {
      console.log(data);
      updateProfession(data).then(res => {
        this.$Message.success("设置成功");
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
