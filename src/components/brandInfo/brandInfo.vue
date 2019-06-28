<template>
  <div>
    <Form ref="form" :model="form" :rules="rules">
      <div class="title-row">
        基本信息
        <div class="fr">
          <!-- <Button size="small" type="primary" @click="edit">编辑</Button> -->
          <!-- <Button size="small" type="primary" @click="save">保存</Button> -->
        </div>
      </div>
      <table>
        <tr>
          <th>公司名称</th>
          <td>
            <Input type="text" :disabled="disabled" v-model="form.xbCompany.name"/>
          </td>
          <th>公司简称</th>
          <td>
            <Input type="text" :disabled="disabled" v-model="form.xbCompany.companyForShort"/>
          </td>
          <th>公司类型</th>
          <td>
            <Input type="text" :disabled="disabled" v-model="form.xbCompany.comapnyType"/>
          </td>
        </tr>
        <tr>
          <th>英文名称</th>
          <td>
            <Input type="text" :disabled="disabled" v-model="form.xbCompany.englishName"/>
          </td>
          <th>英文简称</th>
          <td>
            <Input type="text" :disabled="disabled" v-model="form.xbCompany.englishNameForShort"/>
          </td>
          <th>注册地</th>
          <td>
            <Input type="text" :disabled="disabled" v-model="registerArea"/>
          </td>
        </tr>
        <tr>
          <th>总部地址</th>
          <td>
            <Input type="text" :disabled="disabled" v-model="form.xbCompany.headquartersAddress"/>
          </td>
          <th>注册日期</th>
          <td>
            <DatePicker
              v-model="form.xbCompany.registrationDate"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              placeholder="注册日期"
              :disabled="disabled"
            ></DatePicker>
          </td>
          <th>实际周年日</th>
          <td>
            <DatePicker
              v-model="form.xbCompany.actualAnniversary"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              placeholder="实际周年日"
              :disabled="disabled"
            ></DatePicker>
          </td>
        </tr>
      </table>

      <Divider/>

      <div class="title-row">公司简介</div>
      <Input
        type="textarea"
        placeholder="公司介绍"
        :autosize="true"
        :disabled="disabled"
        :rows="3"
        v-model="form.xbCompany.companyContent"
      />

      <Divider/>

      <div class="title-row">公司荣誉</div>
      <Table border :columns="columns" :data="form.honor">
        <template slot-scope="{ row }" slot="action">
          <img class="logo" :src="row.url" @click="zoom(row.url)">
        </template>
      </Table>
      <!-- 添加公司荣誉 -->
      <Row v-show="!disabled">
        <Form ref="formHonor" :model="formHonor" :rules="rulesHonor">
          <Col span="6">
            <Input
              v-model="formHonor.certificationAuthority"
              placeholder="请输入颁发机构"
              style="width:73%; margin-right: 10px;"
            />
          </Col>
          <Col span="6">
            <Input
              v-model="formHonor.honorName"
              placeholder="请输入荣誉名称"
              style="width:73%; margin-right: 10px;"
            />
          </Col>
          <Col span="6">
            <Input
              v-model="formHonor.prizeTime"
              placeholder="请输入获奖时间"
              style="width:73%; margin-right: 10px;"
            />
          </Col>
          <Col span="6">
            <img class="logo" v-if="formHonor.url" :src="formHonor.url">
            <Upload
              :action="uploadUrl"
              :show-upload-list="false"
              :format="['jpg','jpeg','png']"
              accept="image/*"
              :on-success="uploadSuccess"
              style="display:inline-block;margin: 0 5px;"
            >
              <Button icon="ios-cloud-upload-outline">上传</Button>
            </Upload>
            <!-- <Input v-model="formHonor.url" placeholder="请输入证书文件" style="width:53%; margin-right: 10px;" /> -->

            <Button type="info" @click="add('honor')">添加</Button>
          </Col>
        </Form>
      </Row>

      <Divider/>

      <div class="title-row">公司足迹</div>
      <Timeline>
        <TimelineItem v-for="(item, index) in form.bigEvents" :key="index">
          <Input type="text" :disabled="disabled" v-model="form.bigEvents[index].time"/>
          <Input type="text" :disabled="disabled" v-model="form.bigEvents[index].bigEvents"/>
        </TimelineItem>
      </Timeline>

      <!-- 添加公司事件/足迹 -->
      <div class v-show="!disabled">
        <Form ref="formEvents" :model="formEvents" :rules="rulesEvents" :label-width="50" inline>
          <FormItem label="时间" prop="time">
            <Input v-model="formEvents.time" placeholder="时间"></Input>
          </FormItem>
          <FormItem label="事件" prop="event">
            <Input v-model="formEvents.bigEvents" placeholder="事件"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="add('bigEvents')">添加</Button>
          </FormItem>
        </Form>
      </div>
    </Form>

    <div v-if="zoomUrl" class="mask" @click="zoomUrl = undefined">
      <img class="zoom cc" :src="zoomUrl">
    </div>
  </div>
</template>

<script>
import { getLesseeBrandInfoById, updateLessee, editLessee } from "@/api/lessee";
import { getSupplierBrandInformation } from "@/api/supplier";
import { getDistrict } from "@/api/common";
import { formatDate } from "@/libs/tools";

export default {
  name: "brandInfo",
  props: {
    id: {
      type: [Number, String],
      default: 0
    },
    type: {
      type: String,
      default: "lessee"
    }
  },
  data() {
    return {
      uploadUrl: this.$config.baseUrl.dev + "/upload",
      disabled: true,
      zoomUrl: undefined,
      form: {
        xbCompany: {
          name: "",
          companyForShort: "",
          comapnyType: "",
          englishName: "",
          englishNameForShort: "",
          registerArea: "",
          headquartersAddress: "",
          registrationDate: "",
          actualAnniversary: "",
          companyContent: ""
        },
        honor: [],
        bigEvents: []
      },
      formEvents: {},
      formHonor: {},
      rules: {},
      rulesEvents: {},
      rulesHonor: {},
      columns: [
        {
          title: "颁发机构",
          key: "certificationAuthority"
        },
        {
          title: "荣誉名称",
          key: "honorName"
        },
        {
          title: "获奖时间",
          key: "prizeTime"
        },
        {
          title: "图片/附件",
          slot: "action"
        }
      ],
      registerArea: ""
    };
  },
  watch: {
    "form.xbCompany.registrationDate"(data) {
      this.form.xbCompany.registrationDate = formatDate(data);
      // console.log(this.form.xbCompany.registrationDate)
    },
    "form.xbCompany.actualAnniversary"(data) {
      this.form.xbCompany.actualAnniversary = formatDate(data);
      // console.log(this.form.xbCompany.actualAnniversary)
    }
  },
  mounted() {
    this.id || (this.id = this.$route.query.id);
    this.init();
  },
  methods: {
    init() {
      // console.log(1)
      if (this.type === "lessee") {
        getLesseeBrandInfoById(this.id).then(data => {
          console.log("lesseeBrandInfo:", data);
          this.form = data;
          return getDistrict(0, data.xbCompany.provinceId || 370000)
            .then(res => {
              this.registerArea += res.name;
              return getDistrict(0, data.xbCompany.cityId || 370600);
            })
            .then(res => {
              console.log("registerArea:", res);
              this.registerArea += res.name;
            });
          // this.company = data.xbCompany
          // this.listHonor = data.honor
          // this.listEvents = data.bigEvents
        });
      } else if (this.type === "supplier") {
        getSupplierBrandInformation(this.id).then(data => {
          this.form = data;
          // this.company = data.xbCompany
          // this.listHonor = data.honor
          // this.listEvents = data.bigEvents
          // console.log("data5:", data);
        });
      }
    },
    edit() {
      this.disabled = false;
    },
    save() {
      // console.log(this.form.xbCompany);
      updateLessee(this.form.xbCompany).then(data => {
        this.$Message.success("修改成功");
        this.disabled = true;
      });
    },
    zoom(data) {
      this.zoomUrl = data;
    },
    add(type) {
      if (type === "honor" && Object.keys(this.formHonor).length) {
        this.form.honor.push(this.formHonor);
        this.formHonor = {};
      } else if (type === "bigEvents" && Object.keys(this.formEvents).length) {
        this.form.bigEvents.push(this.formEvents);
        this.formEvents = {};
      }
    },
    uploadSuccess(response, file, fileList) {
      this.$set(this.formHonor, "url", response.result.fileUrl);
      // console.log(this.formHonor)
    }
  }
};
</script>

<style lang='less' scoped>
@import url("./index.less");
</style>

