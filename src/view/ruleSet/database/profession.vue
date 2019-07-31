<template>
  <div>
    <Row>
      <Col span="12">
        <Form ref="form" :model="query" :label-width="40" inline>
          <FormItem label="品牌">
            <selectSupplier :val="query.supplierId" type="brand" @change="change" />
          </FormItem>
          <FormItem :label-width="0">
            <Input v-model="query.params" placeholder="搜索名称/代码" style="margin-right: 10px;" />
          </FormItem>
          <!-- <FormItem label="代码">
            <Input v-model="form.code" placeholder="搜索代码" style="width:73%; margin-right: 10px;" />
          </FormItem>-->
          <Button type="info" @click="search()">搜索</Button>
        </Form>
      </Col>
      <Col span="12">
        <div class="fr">
          <!-- <Button size="small" type="primary" @click="download">下载模板</Button> -->
          <Form ref="form" :model="form" :label-width="40" inline>
            <FormItem label="品牌">
              <selectSupplier :val="form.supplierId" type="brand" @change="change1" />
            </FormItem>
            <FormItem :label-width="0">
              <Upload
                :action="uploadUrl"
                :data="{supplierId: form.supplierId}"
                :format="['xls','xlsx']"
                :show-upload-list="false"
                :before-upload="beforeUpload"
                :on-success="uploadSuccess"
              >
                <Button icon="ios-cloud-upload-outline" :loading="upLoading">
                  <span v-if="!upLoading">上传表格</span>
                  <span v-else>Loading...</span>
                </Button>
              </Upload>
            </FormItem>
          </Form>
        </div>
      </Col>
    </Row>

    <!-- <tree-table
      :expand-type="false"
      :columns="columns"
      :selectable="true"
      children-prop="children"
      select-type="radio"
      :is-fold="true"
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
    <!-- <Button type="success" size="small" @click="addChild(row)">添加下级</Button>-->
    <!--<Button type="error" size="small" @click="deleteMenu(row)">删除</Button> 
      </template>
    </tree-table>-->

    <!-- <ul class="ac">
      <li>
        <ul class="title">
          <li class="cell">职业名称</li>
          <li class="cell">职业名称</li>
          <li class="cell">职业名称</li>
          <li class="cell">职业代码</li>
          <li class="cell">职业名称</li>
          <li class="cell cell-min">职业风险等级</li>
          <li class="cell cell-min">住院风险等级</li>
          <li class="cell cell-max">操作</li>
        </ul>
      </li>
      <li v-for="(item, index) in list" :key="index">
        <ul v-for="(unit, unique) in item.children" :key="unique">
          <li v-for="(_item, _index) in unit.children" :key="_index">
            <ul v-for="(_unit, _unique) in _item.children" :key="_unique" class="row">
              <li class="cell">{{item.code}} - {{item.name}}</li>
              <li class="cell">{{unit.code}} - {{unit.name}}</li>
              <li class="cell">{{_item.code}} - {{_item.name}}</li>
              <li class="cell">{{_unit.code}}</li>
              <li class="cell">{{_unit.name}}</li>
              <li class="cell cell-min">{{_unit.occupationalRiskLevel}}</li>
              <li class="cell cell-min">{{_unit.hospitalRiskLevel}}</li>
              <li class="cell">
                <RadioGroup v-model="_unit.cmmonCareer">
                  <Radio :label="0">不常用</Radio>
                  <Radio :label="1">常用</Radio>
                </RadioGroup>
              </li>
              <li class="cell" style="width: 3%;">
                <Button type="primary" size="small" @click="submit(_unit)">确定</Button>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>-->

    <Table border :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="cmmonCareer">
        <RadioGroup v-model="row.isCommonOccupation">
          <Radio label="0">不常用</Radio>
          <Radio label="1">常用</Radio>
        </RadioGroup>
      </template>
      <template slot="action" slot-scope="{ row }">
        <Button type="primary" size="small" @click="submit(row)">确定</Button>
    <!-- <Button type="success" size="small" @click="addChild(row)">添加下级</Button>-->
    <!--<Button type="error" size="small" @click="deleteMenu(row)">删除</Button> -->
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
import {
  getProfessionPage,
  updateProfession,
  getProfessionBy
} from "@/api/rulesSet/profession";
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
        code: "",
        name: ""
      },
      uploadUrl:
        this.$config.domain + this.$config.services.profession + "/import",
      loading: false,
      upLoading: false,
      query: {
        supplierId: "",
        params: "",
        page: 1,
        size: 10
      },
      // columns: [
      //   {
      //     title: "职业代码",
      //     key: "code",
      //     align: "center"
      //   },
      //   {
      //     title: "职业名称",
      //     key: "name",
      //     align: "center"
      //   },
      //   {
      //     title: "职业风险等级",
      //     key: "occupationalRiskLevel",
      //     align: "center"
      //   },
      //   {
      //     title: "住院风险等级",
      //     key: "hospitalRiskLevel",
      //     align: "center"
      //   },
      //   {
      //     title: "设为常用",
      //     type: "template",
      //     template: "cmmonCareer",
      //     align: "center"
      //   },
      //   {
      //     title: "设为常用",
      //     type: "template",
      //     template: "action",
      //     align: "center"
      //   }
      // ],
      columns: [
        {
          title: "公司",
          key: "insuranceCompanyName",
          align: "center"
        },
        {
          title: "职业代码",
          key: "occupationCode",
          align: "center"
        },
        {
          title: "职业名称",
          key: "occupationName",
          align: "center"
        },
        {
          title: "职业风险等级",
          key: "occupationRiskLevel",
          align: "center",
          width: 80
        },
        {
          title: "住院风险等级",
          key: "hospitalRiskLeve",
          align: "center",
          width: 80
        },
        {
          title: "设为常用",
          type: "template",
          slot: "cmmonCareer",
          align: "center"
        },
        {
          title: "操作",
          type: "template",
          slot: "action",
          align: "center",
        }
      ],
      list: [],
      // listAll: [],
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
        console.log("ProfessionPage: ", res);
        this.loading = false;
        this.total = res.total;
        this.list = res.list;
        // this.getPage()
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
      this.upLoading = true;
    },
    uploadSuccess(response, file, fileList) {
      // console.log(response, file, fileList);
      // this.form.rateTableUrl = file.name
      if (response.code === 0) {
        this.upLoading = false;
        this.$Message.success("上传成功");
        this.getData();
      } else {
        this.$Message.error("上传失败");
      }
    },
    change1(item) {
      this.form.supplierId = item.id;
      // this.form.name = item.name;
      // console.log(item)
    },
    change(item) {
      this.query.supplierId = item.id;
    },
    submit(data) {
      console.log(data);
      updateProfession(data).then(res => {
        this.getData();
        this.$Message.success("设置成功");
      });
    },
    // getPage(page) {
    //   page && (this.query.page = page);
    //   let start = (this.query.page - 1) * 10;
    //   let end = start + this.query.size;
    //   // console.log(typeof page);
    //   this.list = this.listAll.slice(start, end);
    // },
    search() {
      this.query.page = 1;
      this.query.size = 10;
      // console.log(this.query);
      this.getData();
    }
  }
};
</script>
<style lang="less" scoped>
.cell {
  display: inline-block;
  width: 10%;
  margin: 8px 1%;
  vertical-align: middle;
}
.cell-min {
  width: 8%;
}
.cell-max {
  width: 15%;
}
.title {
  background: #ddd;
  font-weight: 600;
  margin-bottom: 10px;
  padding: 5px 0;
}
.row {
  border-bottom: 1px solid #eee;
}
</style>
