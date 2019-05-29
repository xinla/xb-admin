<template>
  <div>
    <Row>
      <Col span="12">
        <Form ref="form" :model="form" :label-width="80" inline>
          <FormItem label="供应商">
            <selectSupplier :val="form.name" type="supplier" @change="change"/>
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
            <Button icon="ios-cloud-upload-outline">上传表格</Button>
          </Upload>
        </div>
      </Col>
    </Row>

    <Table border :columns="columns" :data="list" style="text-align: center;">
      <template slot-scope="{ row }" slot="cmmonCareer">
        <RadioGroup v-model="row.cmmonCareer">
          <Radio :label="0">不常用</Radio>
          <Radio :label="1">常用</Radio>
        </RadioGroup>
      </template>

      <template slot-scope="{ row }" slot="action">
        <Button type="primary" @click="submit(row)">确定</Button>
      </template>
    </Table>

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
        this.$config.baseUrl.dev + this.$config.services.profession + "/import",
      loading: false,
      query: {
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
          slot: "cmmonCareer",
          align: "center"
        },
        {
          title: "设为常用",
          slot: "action",
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
      this.loading = true;
      getProfessionPage(this.query).then(res => {
        // console.log("ProfessionPage: ", res);
        this.loading = false;
        this.list = res.list;
        this.total = res.total;
      });
    },
    download() {
      downloadProfessionTable();
    },
    beforeUpload() {
      if (!this.form.supplierId) {
        this.$Message.error("请选择供应商后再上传");
        return false;
      }
    },
    uploadSuccess(response, file, fileList) {
      // console.log(response, file, fileList)
      // this.form.rateTableUrl = file.name
    },
    change(item) {
      this.form.supplierId = item.id;
      this.form.name = item.name;
      // console.log(item)
    },
    submit(data) {
      updateProfession(data).then((res) => {
        this.$Message.success("设置成功");
      })
    }
  }
};
</script>
<style lang="less" scoped>
</style>
