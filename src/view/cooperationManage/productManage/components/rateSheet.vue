<template>
  <div>
    <!-- <a v-if="form.rateTableUrl" :href="form.rateTableUrl">{{form.rateTableName}}</a> -->
    <Upload
      :action="uploadUrl"
      :show-upload-list="false"
      :data="{productId: $route.query.id}"
      :on-success="uploadSuccess"
    >
      <Button icon="ios-cloud-upload-outline">上传费率表</Button>
    </Upload>
    {{fileName}}
    <Table :loading="loading" :columns="columns" :data="list">
      <template slot="sex" slot-scope="{row}">{{row.sex | sex}}</template>
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
import {
  getProductRateByProductId,
  addProductRate,
  updateProductRate
} from "@/api/product/rate";

export default {
  filters: {
    sex(val) {
      if (val === null ) {
        return
      }
      
      let data = {
      0: '男',
      1: '女',
    }
    return data[val]
  }
  },
  data() {
    return {
      uploadUrl: this.$config.domain + "/insurance/import",
      query: {
        page: 1,
        size: 10
      },
      loading: true,
      list: [],
      columns: [
        {
          title: "投保年龄",
          key: "age",
          align: "center"
        },
        {
          title: "性别",
          slot: "sex",
          align: "center"
        },
        {
          title: "社保标记",
          key: "socialInsuranceFlag",
          align: "center"
        },
        {
          title: "职业风险等级",
          key: "occupationalRiskGrade",
          align: "center"
        },
        {
          title: "首续保标记",
          key: "renewalFlag",
          align: "center"
        },
        {
          title: "投保档次",
          key: "applicationGrade",
          align: "center"
        },
        {
          title: "投保份数",
          key: "countMethod",
          align: "center"
        },
        {
          title: "领取年龄",
          key: "drawingAge",
          align: "center"
        },
        {
          title: "保险期间",
          key: "policyPeriod",
          align: "center"
        },
        {
          title: "交费期间",
          key: "paymentPeriod",
          align: "center"
        },
        {
          title: "保险金额",
          key: "amountInsured",
          align: "center"
        },
        {
          title: "费率",
          key: "rate",
          align: "center"
        },
        {
          title: "费率单位",
          key: "rateUnit",
          align: "center"
        }
      ],
      total: 0,
      fileName: ""
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(page) {
      this.loading = true;
      page && (this.query.page = page);
      let id = this.$route.query.id;
      id &&
        getProductRateByProductId(id, this.query).then(data => {
          this.loading = false;
          if (data) {
            this.list = data.list;
            this.total = ~~data.total;
          }
        });
    },
    uploadSuccess(response, file, fileList) {
      if (response.code === 0) {
        this.fileName = response.result.originalName;
        this.getData();
        // this.form.rateTableUrl = response.result.fileUrl;
      } else {
        this.$Message.error("上传失败，请重试");
      }
      console.log(response, file, fileList);
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-input-wrapper,
.ivu-input-number {
  width: 100px;
  margin: 0 10px;
}
.ivu-upload {
  display: inline-block;
  margin-left: 10px;
}
</style>

