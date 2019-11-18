<template>
  <div>
    <Form ref="form" :model="form" :rules="rules" :label-width="120">
      <div class="title-row">基本信息</div>

      <Row>
        <Col span="10">
          <FormItem label="品牌名称" prop="name">
            <selectSupplier
              :disabled="disabled"
              :val="form.name"
              type="insurance"
              @change="change"
            />
          </FormItem>

          <FormItem label="品牌简称" prop="nameForShort">
            <Input type="text" :disabled="disabled" v-model="form.nameForShort" placeholder="品牌简称" />
          </FormItem>

          <FormItem label="品牌成立日期" prop="foundingTime">
            <DatePicker
              :disabled="disabled"
              type="date"
              format="yyyy-MM-dd"
              placeholder="选择时间"
              style="width: 100%;"
              :value="form.foundingTime"
              @on-change="changeTime"
            ></DatePicker>
          </FormItem>

          <FormItem label="品牌类型" prop="typeRule">
            <RadioGroup v-model="form.typeRule">
              <Radio :label="0">寿险</Radio>
              <Radio :label="1">财险</Radio>
            </RadioGroup>
          </FormItem>
        </Col>

        <Col span="8">
          <FormItem label="品牌Logo" prop="logo">
            <Upload
              :action="$config.services.upload"
              :show-upload-list="false"
              :format="['jpg','jpeg','png']"
              :on-format-error="formatError"
              accept="image/*"
              :on-success="upFile"
            >
              <img class="logo" v-if="form.logo" :src="form.logo" />
              <div v-else class="upload-icon cp">+</div>
            </Upload>
          </FormItem>

          <FormItem label="可投保地区" prop="vitDictProvinceId">
            <Select
              :disabled="disabled"
              v-model="form.vitDictProvinceId"
              multiple
              :max-tag-count="3"
            >
              <Option
                v-for="(item, index) in cityList"
                :value="item.id"
                :key="index"
              >{{ item.province }}</Option>
            </Select>
          </FormItem>

          <FormItem label="宣传图" prop="logo">
            <Upload
              :action="$config.services.upload"
              :show-upload-list="false"
              :format="['jpg','jpeg','png']"
              :on-format-error="formatError"
              accept="image/*"
              :on-success="upFile1"
            >
              <img class="logo" v-if="form.publicityImage" :src="form.publicityImage" />
              <div v-else class="upload-icon cp">+</div>
            </Upload>
          </FormItem>
        </Col>
      </Row>
      <Divider />

      <div class="title-row">联系方式</div>
      <Row>
        <Col span="10">
          <FormItem label="公司地址" prop="companyAddress">
            <Input
              type="text"
              :disabled="disabled"
              v-model="form.companyAddress"
              placeholder="公司地址"
            />
          </FormItem>

          <FormItem label="联系电话" prop="contactPhone">
            <Input type="text" :disabled="disabled" v-model="form.contactPhone" placeholder="联系电话" />
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem label="公司网址" prop="companyWebsite">
            <Input
              type="text"
              :disabled="disabled"
              v-model="form.companyWebsite"
              placeholder="公司网址"
            />
          </FormItem>

          <FormItem label="全国统一服务电话" prop="nationalServicePhone">
            <Input
              type="text"
              :disabled="disabled"
              v-model="form.nationalServicePhone"
              placeholder="全国统一服务电话"
            />
          </FormItem>
        </Col>
      </Row>

      <div class="title-row">公司简介</div>
      <editor ref="editor" :value="form.supplierDescription" @on-change="handleChange" />
      <Divider />

      <div class="title-row">分公司</div>
      <Table border :columns="columns" :data="form.xbSupplierOrganization">
        <template slot-scope="{ row, index }" slot="action">
          <Icon type="ios-close-circle-outline" @click="remove(index)" />
        </template>
      </Table>

      <Row style="margin-top: 20px;" v-if="!disabled">
        <Col span="6">
          <Input
            :disabled="disabled"
            v-model="formChild.name"
            placeholder="请输入名称"
            style="width:73%; margin-right: 10px;"
          />
        </Col>
        <Col span="6">
          <Input
            :disabled="disabled"
            v-model="formChild.organizationAddress"
            placeholder="请输入地址"
            style="width:73%; margin-right: 10px;"
          />
        </Col>
        <Col span="6">
          <Input
            :disabled="disabled"
            v-model="formChild.organizationPhone"
            placeholder="请输入电话"
            style="width:73%; margin-right: 10px;"
          />
        </Col>
        <Col span="6">
          <Button type="info" @click="add()">添加</Button>
        </Col>
      </Row>
      <Divider />

      <div class="title-row">
        公司足迹
        <Button type="info" size="small" @click="add(0)">添加</Button>
      </div>
      <Row
        style="margin-top: 20px;"
        v-for="(item, index) of form.xbCompanyCard"
        :key="index"
        v-if="item.type == 0"
      >
        <Col span="10">
          <Input
            :disabled="disabled"
            v-model="item.bigEvents"
            placeholder="请输入大事记"
            style="width:73%; margin-right: 10px;"
          />
        </Col>
        <Col span="10">
          <DatePicker
            :disabled="disabled"
            type="date"
            format="yyyy-MM-dd"
            placeholder="请选择时间"
            style="width:73%; margin-right: 10px;"
            :value="item.time"
            @on-change="(data) => {item.time = data + ' 00:00:00'}"
          ></DatePicker>
        </Col>
        <Col span="4">
          <Button type="info" @click="remove(index, 'card')">删除</Button>
        </Col>
      </Row>
      <Divider />

      <div class="title-row">
        公司荣誉
        <Button type="info" size="small" @click="add(1)">添加</Button>
      </div>
      <Row
        style="margin-top: 20px;"
        v-for="(item, index) of form.xbCompanyCard"
        :key="index"
        v-if="item.type == 1"
      >
        <Col span="5">
          <Input :disabled="disabled" v-model="item.certificationAuthority" placeholder="请输入颁发机构" />
        </Col>
        <Col span="5">
          <Input :disabled="disabled" v-model="item.honorName" placeholder="请输入荣誉名称" />
        </Col>
        <Col span="5">
          <DatePicker
            :disabled="disabled"
            type="date"
            format="yyyy-MM-dd"
            placeholder="请选择时间"
            :value="item.prizeTime"
            @on-change="(data) => {item.prizeTime = data + ' 00:00:00'}"
          ></DatePicker>
        </Col>
        <Col span="5">
          <Upload
            :action="$config.services.upload"
            :show-upload-list="false"
            :format="['jpg','jpeg','png']"
            :on-format-error="formatError"
            accept="image/*"
            :on-success="upFile2"
            @click.native="upload(index)"
          >
            <img class="logo cp" v-if="item.url" :src="item.url" />
            <Button v-else icon="ios-cloud-upload-outline">上传证书或奖杯照片</Button>
          </Upload>
        </Col>
        <Col span="4">
          <Button type="info" @click="remove(index, 'card')">删除</Button>
        </Col>
      </Row>

      <Button v-if="!disabled" type="primary" @click="submit">确认</Button>
    </Form>
  </div>
</template>

<script>
import {
  saveSupplier,
  getSupplierDetail,
  getSupplierBrandInformation,
  getInsureAllProvice
} from "@/api/supplier";
import selectSupplier from "@/components/selectSupplier";
import Editor from "_c/editor";

// const defaultForm = {
//   name: "",
//   nameForShort: "",
//   typeRule: 0, // 0寿险,1财险
//   logo: "",
//   companyAddress: "",
//   companyWebsite: "",
//   contactPhone: "",
//   nationalServicePhone: "",
//   professionUrl: "",
//   supplierDescription: "",
//   foundingTime: "",
//   vitDictProvinceId: [],
//   xbSupplierOrganization: []
// };
// 子公司默认表单
const defaultFormChild = {
  name: "",
  organizationAddress: "",
  organizationPhone: "",
  type: 2
};
// 公司足迹和荣誉默认表单
const defaultFormChild1 = {
  type: "", // 0:公司足迹 1:公司荣誉
  time: "", // 时间
  bigEvents: "", // 大事记
  certificationAuthority: "", // 颁发机构
  honorName: "", // 荣誉名称
  prizeTime: "", // 获奖时间
  url: "", // 证书文件路径
  companyId: "", // 公司id
  sypplierId: "", // 供应商id
  createTime: "", // 创建时间
  updateTime: "" // 更新时间
};
export default {
  components: {
    selectSupplier,
    Editor
  },
  data() {
    return {
      insuranceId: 0, // 保险公司id
      form: {
        name: "",
        nameForShort: "",
        typeRule: 0, // 0寿险,1财险
        logo: "",
        companyAddress: "",
        companyWebsite: "",
        contactPhone: "",
        nationalServicePhone: "",
        professionUrl: "",
        supplierDescription: "",
        foundingTime: "",
        publicityImage: "",
        vitDictProvinceId: [],
        xbSupplierOrganization: [],
        xbCompanyCard: []
      },
      formChild: Object.assign({}, defaultFormChild),
      formChild1: Object.assign({}, defaultFormChild1),
      rules: {
        // name: [
        //     { required: true, message: '不能为空', trigger: 'change' }
        // ],
        nameForShort: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        typeRule: [
          {
            type: "number",
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        companyAddress: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        companyWebsite: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        contactPhone: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        professionUrl: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        supplierDescription: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        foundingTime: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        nationalServicePhone: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        xbSupplierOrganization: [
          {
            required: true,
            type: "array",
            message: "不能为空",
            trigger: "change"
          }
        ]
      },
      cityList: [],
      columns: [
        {
          title: "名称",
          key: "name"
        },
        {
          title: "地址",
          key: "organizationAddress"
        },
        {
          title: "电话",
          key: "organizationPhone"
        },
        {
          title: "操作",
          slot: "action",
          // width: '16%',
        }
      ],
      uploadIndex: 0
    };
  },
  computed: {
    disabled() {
      return Boolean(this.$route.query.readOnly);
    }
  },
  mounted() {
    this.$route.query.id && (this.form.id = this.$route.query.id);
    this.init();
  },
  methods: {
    init() {
      this.$refs.editor.setHtml("");
      this.getData();
      getInsureAllProvice().then(data => {
        this.cityList = data;
        // console.log(data)
      });
    },
    getData() {
      if (this.form.id) {
        getSupplierDetail(this.form.id).then(data => {
          // console.log("SupplierDetail", data);
          if (data) {
            this.form = data.xbSupplier;
            this.insuranceId = data.xbSupplier.relationId
            // let vitDictProvinceId = data.xbSupplier.vitDictProvinceId
            // if (vitDictProvinceId) {
            //   vitDictProvinceId = vitDictProvinceId.split(',')
            //   vitDictProvinceId = vitDictProvinceId.map(item => parseInt(item))
            //   this.$set(this.form, 'vitDictProvinceId', vitDictProvinceId)
            // }
            // 设置富文本内容
            this.$refs.editor.setHtml(this.form.supplierDescription);
            // console.log('form:', this.form)
          } else {
            this.$Message.error("暂无此记录，请稍后重试");
          }
        });
      }
    },
    submit() {
      this.$refs.form
        .validate()
        .then(data => {
          if (data) {
            // console.log('form:', this.form)
            // this.form.vitDictProvinceId = this.form.vitDictProvinceId.join()
            return saveSupplier(this.insuranceId, this.form);
          } else {
            return new Promise((resolve, reject) => {});
          }
        })
        .then(data => {
          this.$Message.success("操作成功");
          this.$router.push({ name: "supplierManage" });
        });
      // .catch(err => {
      //   this.$Message.success("服务器忙，请稍后重试")
      // })
    },
    upFile(response, file, fileList) {
      if (!response.result) {
        this.$Message.error(response.message);
      } else {
        this.form.logo = response.result.fileUrl;
      }
      // console.log(response, file, fileList)
      // console.log(response.result.fileUrl)
    },
    upFile1(response, file, fileList) {
      if (!response.result) {
        this.$Message.error(response.message);
      } else {
        this.form.publicityImage = response.result.fileUrl;
      }
    },
    upFile2(response, file, fileList) {
      if (!response.result) {
        this.$Message.error(response.message);
      } else {
        this.form.xbCompanyCard[this.uploadIndex].url = response.result.fileUrl;
      }
    },
    change(val) {
      this.form.name = val.name;
      this.insuranceId = val.id;
      // console.log(val)
    },
    handleChange(html, text) {
      // console.log(html, text);
      this.form.supplierDescription = html;
      // console.log(this.form.underwritingRulesText)
    },
    add(type) {
      if (type != undefined) {
        defaultFormChild1.type = type;
        this.form.xbCompanyCard || (this.form.xbCompanyCard = []);
        this.form.xbCompanyCard.push(Object.assign({}, defaultFormChild1));
        // console.log(this.form.xbCompanyCard);
      } else {
        this.form.xbSupplierOrganization.push(this.formChild);
        this.formChild = Object.assign({}, defaultFormChild);
      }
    },
    remove(index, type) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除么",
        onOk: () => {
          if (type == undefined) {
            this.form.xbSupplierOrganization.splice(index, 1);
          } else {
            this.form.xbCompanyCard.splice(index, 1);
          }
        }
      });
    },
    changeTime(data) {
      this.form.foundingTime = data + " 00:00:00";
      // this.form.foundingTime += ' 00:00:00'
      // console.log(this.form.foundingTime)
    },
    upload(index) {
      this.uploadIndex = index;
      // console.log(index);
    },
    formatError() {
      this.$Message.error("文件格式错误，仅限'jpg','jpeg','png'格式的文件");
    },
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>


