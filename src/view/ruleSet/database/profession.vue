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
.pt {
  margin: 20px 0 10px 20px;
}

.li {
  padding: 15px;
  &:hover {
    background: #ebf7ff;
  }
  .dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #6582ff;
    margin-right: 10px;
  }
}
.card {
  display: flex;
  flex-wrap: wrap;
  .item {
    vertical-align: top;
    padding: 10px;
    width: 160px;
    line-height: 30px;
  }
}
.upload-wrap {
  width: 50%;
  .upload {
    padding: 79px 0;
    background: rgba(248, 249, 255, 1);
    border: 1px dashed rgba(101, 130, 255, 1);
  }
}
/deep/.ivu-tooltip-rel {
  display: block;
}
</style>
<template>
  <div class="x-h100" style="padding: 0;">
    <div class="pb24 bg">
      <Input
        v-model="query.params"
        class="search-input bw"
        placeholder="请输入关键字搜索"
        style="width:280px;"
      />
      <Button type="primary" shape="circle" icon="ios-search" @click="getData()"></Button>
      <div class="fr">
        <Button type="primary" @click="isUpload = true">上传职业代码表</Button>
        <Button type="primary" @click="getData(1, 1)">查看常用职业</Button>
      </div>
    </div>

    <Row style="height: calc(100% - 58px);">
      <Col span="6" class="x-h100" style="border-right: 24px solid #f5f7f9;">
        <div class="title-row pt">保险企业</div>
        <Menu active-name="1-2" width="auto" style="height: calc(100% - 44px);  overflow: auto;">
          <MenuItem
            v-for="item in listBrand"
            :name="item.id"
            :key="item.id"
            @click.native="getClass(0, item.id)"
          >{{ item.name }}</MenuItem>
        </Menu>
      </Col>
      <Col span="18" class="x-h100" style="overflow: auto;">
        <!-- 上传职业代码表 -->
        <div v-if="isUpload" class="upload-wrap cc">
          <Upload
            v-if="!uploadFileName"
            type="drag"
            :action="uploadUrl"
            :data="{supplierId: currentBrandId}"
            :format="['xls','xlsx']"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
            :on-format-error="formatError"
          >
            <div class="upload ac">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p style="width: 154px; margin: 25px auto;">
                或将文件拖拽至此区域
                <br />仅支持xls、xlsx格式文件
              </p>

              <Button type="primary" :loading="upLoading">
                <span v-if="!upLoading">选择文件</span>
                <span v-else>上传中</span>
              </Button>
            </div>
          </Upload>

          <div v-else class="upload ac">
            <Icon type="md-checkmark-circle" size="34" style="color: #009F55"></Icon>
            <p style="width: 154px; margin: 25px auto;">{{uploadFileName}}</p>
            <Button type="primary" @click="uploadFileName = ''">完成</Button>
          </div>

          <div style="line-height: 35px;">
            说明：
            <p>
              请使用职业代码表模板上传。
              <span style="color: #6582ff;" class="cp" @click="download">下载EXCEL模板</span>
            </p>
            <p>请将左侧对应保险公司的职业代码数据导入职业代码表模板。</p>
          </div>
        </div>

        <!-- 搜索列表/常用职业 -->
        <div v-else-if="isList" class="x-h100 bg">
          <div v-if="list.length && !query.type" style="padding-bottom: 20px;">
            查到{{this.total}}条与
            <span style="padding: 0 5px; color: #6581FF;">{{query.params}}</span>有关的内容
          </div>
          <div
            style="border-bottom: 24px solid #f5f7f9;"
            v-for="(unit, unique) of list"
            :key="unique"
          >
            <Card :padding="0" style="padding: 0 15px;">
              <ul class="card bw">
                <li class="item" v-for="(item, index) of columns" :key="index">
                  <b>{{item.title}}</b>
                  <div v-if="!item.type">
                    <Tooltip
                      placement="top"
                      :content="unit[item.key]"
                      :disabled="String(unit[item.key]).length < 8"
                      style="max-width: 100%;"
                    >
                      <div class="oe">{{unit[item.key] || '不设'}}</div>
                    </Tooltip>
                  </div>
                  <div v-else>
                    <i-switch v-model="unit[item.key]" :true-value="1" :false-value="1" disabled />
                  </div>
                </li>
              </ul>
            </Card>
          </div>

          <div v-if="!list.length" style="padding: 150px 0;" class="bw ac">暂无相关数据</div>
        </div>

        <template v-else>
          <div class="bw bfc-o" :style="{height: currentClass > 3 ? '60%' : '100%'}">
            <div class="title-row pt">
              <!-- 面包屑 -->
              <template v-for="(item, index) of breadcrumb">
                <span v-show="item.key <= currentClass" :key="index" @click="switchClass(item.key)">
                  <em v-show="item.key > 0">/</em>
                  {{item.value}}
                </span>
              </template>
            </div>
            <!-- 分类 -->
            <ul style="height: calc(100% - 44px); overflow: auto;">
              <li
                class="li cp"
                v-for="(item, index) of listClass"
                :key="index"
                @click="getClass(currentClass + 1, item)"
              >
                <span class="dot"></span>
                {{item[['primaryCategoryName', 'secondaryCategoryName', 'minorCategoryName', 'occupationName', 'occupationName'][currentClass]]}}
              </li>
              <li v-if="!listClass.length" style="padding: 150px 0;" class="ac">
                {{currentBrandId ? '暂无相关数据' : '请选择保险企业'}}
              </li>
            </ul>
          </div>

          <!-- 职业详情 -->
          <Card
            v-show="currentClass > 3"
            :padding="0"
            style="padding: 0 15px;
            border-top: 24px solid #f5f7f9;
            overflow: auto;
            height: 40%;"
          >
            <ul class="card bw">
              <li class="item" v-for="(item, index) of columns" :key="index">
                <b>{{item.title}}</b>
                <div v-if="!item.type">
                  <Tooltip
                    placement="top"
                    :content="professionInfo[item.key]"
                    :disabled="String(professionInfo[item.key]).length < 8"
                    style="max-width: 100%;"
                  >
                    <div class="oe">{{professionInfo[item.key] || '不设'}}</div>
                  </Tooltip>
                </div>
                <div v-else>
                  <i-switch
                    v-model="professionInfo[item.key]"
                    :true-value="1"
                    :false-value="1"
                    disabled
                  />
                </div>
              </li>
            </ul>
          </Card>
        </template>
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

    <!-- <Table :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="cmmonCareer">
        <RadioGroup v-model="row.isCommonOccupation">
          <Radio label="0">不常用</Radio>
          <Radio label="1">常用</Radio>
        </RadioGroup>
      </template>
      <template slot="action" slot-scope="{ row }">
        <Button type="primary" size="small" @click="submit(row)">确定</Button>
      </template>
    </Table>

    <Page
      :total="total"
      show-elevator
      show-total
      style="text-align:center;margin-top:20px;"
      @on-change="getData"
    />-->
  </div>
</template>

<script>
import * as A from "@/api/rulesSet/profession";
import selectSupplier from "@/components/selectSupplier";

export default {
  components: {
    selectSupplier
  },
  props: {},
  data() {
    return {
      // form: {
      //   supplierId: "",
      //   code: "",
      //   name: ""
      // },
      uploadUrl:
        this.$config.domain + this.$config.services.profession + "/import",
      loading: false,
      upLoading: false,
      query: {
        insuranceCompanyId: "",
        params: "",
        type: undefined,
        page: 1,
        size: 10
      },
      columns: [
        {
          title: "职业名称",
          key: "occupationName",
          align: "center"
        },
        {
          title: "职业代码",
          key: "occupationCode",
          align: "center",
          width: 120
        },
        {
          title: "所属小类",
          key: "minorCategoryName",
          align: "center"
        },
        {
          title: "所属中类",
          key: "secondaryCategoryName",
          align: "center"
        },
        {
          title: "所属大类",
          key: "primaryCategoryName",
          align: "center"
        },
        {
          title: "常用设置",
          type: "template",
          key: "isCommonOccupation",
          align: "center"
        },
        {
          title: "职业风险等级",
          key: "occupationRiskLevel",
          align: "center",
          width: 120
        },
        {
          title: "寿险风险等级",
          key: "lifeRiskLevel",
          align: "center",
          width: 120
        },
        {
          title: "综合住院险风险等级",
          key: "hospitalRiskLeve",
          align: "center",
          width: 120
        },
        {
          title: "医疗风险等级",
          key: "medicalRiskLevel",
          align: "center",
          width: 120
        },
        {
          title: "意外险风险等级",
          key: "emergencyRiskLevel",
          align: "center",
          width: 120
        },
        {
          title: "住院费用险风险等级",
          key: "hospitalizationExpenseRiskLeve",
          align: "center",
          width: 120
        },
        {
          title: "住院津贴险风险等级",
          key: "hospitalizationAllowanceRiskLeve",
          align: "center",
          width: 120
        },
        {
          title: "豁免保费险风险等级",
          key: "exemptionPremiumRiskLevel",
          align: "center",
          width: 120
        },
      ],
      list: [],
      // listAll: [],
      total: 0,
      listBrand: [],
      isUpload: false,

      breadcrumb: [],
      listClass: [],
      listMainClass: [],
      listMiddleClass: [],
      listSmallClass: [],
      listPro: [],
      currentClass: 0,
      currentBrandId: '',
      professionInfo: {},
      isLoadClass: false,
      isList: false,
      uploadFileName: ''
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getAllBrand()
    // this.getClass(0)

  },
  methods: {
    getClass(type, args) {
      if (this.isLoadClass) {
        return
      }
      this.isLoadClass = true
      Promise.resolve().then(() => {
        switch (type) {
          case 0:
            this.query.insuranceCompanyId = args
            this.currentBrandId = args

            this.isList = false
            this.isUpload = false

            A.getProfessionTabs(this.currentBrandId).then((res) => {
              // console.log(res)
              this.breadcrumb = res
            })
            A.getProfessionClasses(this.currentBrandId, type).then(res => {
              this.listClass = this.listMainClass = res
              this.currentClass = 0
            })
            break;

          case 1: A.getProfessionClasses(this.currentBrandId, type, args).then(res => {
            this.listClass = this.listMiddleClass = res
            this.currentClass++
          })
            break;

          case 2: A.getProfessionClasses(this.currentBrandId, type, args).then(res => {
            this.listClass = this.listSmallClass = res
            this.currentClass++
          })
            break;

          case 3: A.getProfessionClasses(this.currentBrandId, type, args).then(res => {
            this.listClass = this.listPro = res
            this.currentClass++
          })
            break;

          case 4:
            //  A.getProfessionClasses(this.currentBrandId, type, args).then(res => {
            // })
            this.professionInfo = args
            this.currentClass++
            break;
          default:
            break;
        }
      }).then(() => {
        this.isLoadClass = false
      }).catch(() => {
        this.isLoadClass = false
      })
    },
    switchClass(type) {
      this.currentClass = type
      switch (type) {
        case 0:
          this.listClass = this.listMainClass
          break;

        case 1:
          this.listClass = this.listMiddleClass
          break;

        case 2:
          this.listClass = this.listSmallClass
          break;

        case 3:
          this.listClass = this.listPro
          break;

        default:
          break;
      }
    },
    getData(page, type) {
      if (!this.currentBrandId) {
        this.$Message.error("请选择品牌后进行");
        return;
      }
      this.isList = true
      this.query.page = page || 1
      this.loading = true;
      this.query.type = type
      type && (this.query.params = '')
      A.getProfessionPage(this.query).then(res => {
        console.log("ProfessionPage: ", res);
        this.loading = false;
        this.isUpload = false
        this.total = res.total;
        this.list = res.list;
        // this.getPage()
      });
    },
    getAllBrand() {
      A.getProfessionAllBrand().then((res) => {
        console.log("AllBrand: ", res);
        this.listBrand = res
      })
    },
    download() {
      this.$Modal.info({
        title: '提示',
        content: '暂未提供模板'
      });
      // downloadProfessionTable();
    },
    beforeUpload() {
      if (!this.currentBrandId) {
        this.$Message.error("请选择品牌后再上传");
        return false;
      }
      this.upLoading = true;
    },
    formatError() {
      this.$Message.error("文件格式错误，仅限['.xls','.xlsx']格式的文件");
    },
    uploadSuccess(response, file, fileList) {
      // console.log(response, file, fileList);
      this.uploadFileName = file.name
      if (response.code === 0) {
        this.upLoading = false;
        this.$Message.success("上传成功");
        // this.getData();
        this.getAllBrand()
      } else {
        this.upLoading = false;
        this.$Message.error("上传失败");
      }
    },
    change1(item) {
      this.form.supplierId = item.id;
      // this.form.name = item.name;
      // console.log(item)
    },
    // change(item) {
    //   this.query.supplierId = item.id;
    // },
    submit(data) {
      console.log(data);
      A.updateProfession(data).then(res => {
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
  }
};
</script>
