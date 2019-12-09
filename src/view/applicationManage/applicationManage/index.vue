<style lang="less" scoped>
.apps-manage {
  display: flex;
  flex-direction: column;
  width: 100%;
  // height: 100%;
  .s-wrapper {
    flex: 1;
    width: 100%;
    background: #f1f3f5;
    overflow-y: auto;
    .apps-manage-list {
      box-sizing: border-box;
      padding: 10px;
      display: flex;
      flex-direction: column;
      height: 100%;
      .s-title {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        color: #333;
        .search-input {
          width: 40%;
          height: 26px;
          text-align: left;
          line-height: 26px;
          color: #999;
          background: #fff;
          border-radius: 12px;
          input {
            vertical-align: top;
            border: none;
            width: calc(98% - 30px);
            height: 24px;
            font-size: 12px;
            background: none;
          }
          i {
            padding: 0 8px;
          }
        }
        .top-btn {
          span {
            display: inline-block;
            font-size: 12px;
            line-height: 24px;
            cursor: pointer;
          }
          .add-btn {
            padding: 0 10px;
            background: #6582ff;
            border: #6582ff solid 1px;
            color: #fff;
            border-radius: 4px;
            margin-right: 14px;
            &:hover {
              opacity: 0.8;
            }
            .iconfont {
              font-size: 12px;
            }
          }
          .other {
            border: #f1f3f5 solid 1px;
            border-radius: 4px;
            color: #6582ff;
            padding: 0 10px;
            &:hover {
              border-color: #6582ff;
            }
          }
        }
      }
      .a-content {
        display: flex;
        flex-direction: column;
        background: #fff;
        flex: 1;
        padding: 0 0 10px;
        overflow: auto;
        .apps-table {
          display: flex;
          flex-direction: column;
          background: #fff;
          flex: 1;
          overflow-y: auto;
        }
        .a-page {
          padding: 10px 0 20px;
          font-size: 12px;
        }
      }
    }
  }
}
/deep/.mask {
  z-index: 10000;
}
.logo {
  width: 89px;
  height: 83px;
  cursor: pointer;
}
.upload-icon {
  border: 1px dashed #000;
  width: 100px;
  padding: 30px;
  line-height: 21px;
  text-align: center;
}
/deep/.ivu-tag .ivu-icon-ios-close {
  visibility: hidden;
}
/deep/.ivu-tag:hover .ivu-icon-ios-close {
  visibility: visible;
}
</style>
<style lang="less">
.apps-manage {
  .search-input {
    .ivu-input-wrapper {
      vertical-align: top;
      width: 80%;
      input {
        border: none;
        height: 24px;
        font-size: 12px;
        background: none;
      }
    }
  }
  .ivu-poptip-popper {
    min-width: 100px;
  }
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal-body {
    padding: 0 15px;
  }
  .ivu-modal {
    top: 0;
  }
  .ivu-modal-header,
  .ivu-modal-footer {
    border: 0;
  }
  .ivu-modal-footer {
    .ivu-btn-large {
      padding: 5px 15px;
      font-size: 12px;
      line-height: 14px;
    }
    .ivu-btn-primary {
      background-color: #6582ff;
      border-color: #6582ff;
    }
  }
  .stopTip {
    padding: 10px 0 20px;
    color: #333;
  }
}
</style>
<template>
  <div class="apps-manage">
    <div class="s-wrapper">
      <div class="apps-manage-list">
        <div class="s-title">
          <div class="search-input">
            <i class="iconfont"></i>
            <input
              type="text"
              v-model="query.keywords"
              @keyup.enter="getData(1)"
              placeholder="搜你想搜、输入文字并按回车键搜索"
            />
          </div>
          <div class="top-btn">
            <span class="add-btn" @click="showApplication()">+ 新建</span>
            <span class="other" @click="getIds(0, true)">添加操作</span>
            <span class="other" @click="getIds(1, true)">应用配置</span>
            <span class="other" @click="getIds(2)">删除</span>
          </div>
        </div>
        <div class="a-content">
          <div v-if="total" class="apps-table ac">
            <Table
              ref="organUserList"
              :columns="columns"
              :data="list"
              @on-selection-change="selectChange"
              @on-row-dblclick="showApplication"
            >
              <template slot-scope="{ row }" slot="type">{{typeList[row.type]}}</template>
              <template slot-scope="{ row }" slot="companyIds">
                <!-- <span
                  v-for="(item, index) of row.companyRelationMenuList"
                  :key="index"
                >{{item.companyName}}</span>-->
                <div v-if="row.companyRelationMenuList.length === 0">全部</div>
                <div v-else>{{row.companyRelationMenuList[0].companyName}} {{row.companyRelationMenuList.length > 2 ? '...' : ''}}</div>
              </template>
              <template slot-scope="{ row }" slot="level">{{levelList[row.level]}}</template>
            </Table>
            <Page
              show-elevator
              show-total
              class-name="a-page"
              :total="total"
              :current="query.page"
              @on-change="getData"
            />
          </div>
        </div>

        <!-- 编辑/新建应用 -->
        <Drawer
          :title="applicantForm.id ? '编辑应用' : '新建应用'"
          v-model="isApplicantion"
          width="500"
          :styles="styles"
        >
          <Form
            ref="applicantForm"
            :model="applicantForm"
            :rules="rules"
            label-position="left"
            :label-width="80"
          >
            <FormItem label="应用名称" prop="name">
              <Input v-model.trim="applicantForm.name" placeholder="请输入功能名称" />
            </FormItem>
            <FormItem label="所属行业" prop="type">
              <RadioGroup v-model="applicantForm.type">
                <Radio v-for="(value, key) in typeList" :label="+key" :key="key">{{value}}</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="所属版本" prop="level">
              <RadioGroup v-model="applicantForm.level">
                <Radio v-for="(value, key) in levelList" :label="+key" :key="key">{{value}}</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="所属租户">
              <Select
                v-model="applicantForm.companyIds"
                filterable
                remote
                multiple
                :remote-method="getLesseePage"
                :loading="searchLoading"
                placeholder="请输入租户名称"
              >
                <!-- 过去配置的选项 -->
                <Option
                  v-for="(option, index) in applicantForm.companyRelationMenuList"
                  :value="option.companyId"
                  :key="index + 'a'"
                >{{option.companyName}}</Option>
                <!-- 查询列表 -->
                <Option
                  v-for="(option, index) in lesseeList"
                  :value="option.id"
                  :key="index"
                  @click.native="choiceOption(option)"
                >
                {{option.name}}
                </Option>
                <!-- 新增选项的列表 -->
                <Option v-show="false"
                  v-for="(option, index) in newSelectedList"
                  :value="option.id"
                  :key="index + 'b'"
                >{{option.name}}</Option>
              </Select>
            </FormItem>
            <FormItem label="适用终端" prop="terminal">
              <CheckboxGroup v-model="applicantForm.terminal">
                <Checkbox v-for="(value, key) in terminalList" :label="key" :key="key">{{value}}</Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem :label="applicantForm.terminal ? terminalList[applicantForm.terminal] : 'web' + '地址'">
              <Input v-model.trim="applicantForm.menuUrl" placeholder="请输入请求地址" />
            </FormItem>
            <FormItem label="ICON">
              <div
                class="bfc-d"
                style="margin: 0 20px 20px 0;"
                @click="showUpload('webImageUrl', 'applicantForm')"
              >
                <img class="logo" v-if="applicantForm.webImageUrl" :src="applicantForm.webImageUrl" />
                <div v-else class="upload-icon cp">web</div>
              </div>

              <div class="bfc-d" @click="showUpload('appImageUrl', 'applicantForm')">
                <img class="logo" v-if="applicantForm.appImageUrl" :src="applicantForm.appImageUrl" />
                <div v-else class="upload-icon cp">app</div>
              </div>
            </FormItem>
            <FormItem label="操作" v-show="applicantForm.id">
              <Tag
                v-for="(item, index) in applicantForm.operateStr"
                type="border"
                closable
                color="primary"
                @dblclick.native="showOperation(item, 2)"
                @on-close="applicantForm.operateStr.splice(index, 1)"
                :key="index"
              >{{item.name}}</Tag>
            </FormItem>
          </Form>
          <div class="demo-drawer-footer ar">
            <Button style="margin-right: 8px" @click="isApplicantion = false">取消</Button>
            <Button type="primary" @click="save(3, 'applicantForm')">确定</Button>
          </div>
        </Drawer>

        <!-- 编辑/新建操作 -->
        <Drawer
          :title="applicantForm.id ? '编辑操作' : '新建操作'"
          v-model="isOperation"
          width="500"
          :styles="styles"
        >
          <Form
            ref="operationForm"
            :model="operationForm"
            :rules="rules"
            label-position="left"
            :label-width="80"
          >
            <FormItem label="所属应用">{{operationForm.pName}}</FormItem>
            <FormItem label="操作名称" prop="name">
              <Input v-model.trim="operationForm.name" placeholder="请输入功能名称" />
            </FormItem>
            <FormItem label="适用终端" prop="terminal">
              <CheckboxGroup v-model="operationForm.terminal">
                <Checkbox v-for="(value, key) in terminalList" :label="key" :key="key">{{value}}</Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem :label="operationForm.terminal ? terminalList[operationForm.terminal] : 'web' + '地址'">
              <Input v-model.trim="operationForm.menuUrl" placeholder="请输入请求地址" />
            </FormItem>
            <FormItem label="ICON">
              <div
                class="bfc-d"
                style="margin: 0 20px 20px 0;"
                @click="showUpload('webImageUrl', 'operationForm')"
              >
                <img class="logo" v-if="operationForm.webImageUrl" :src="operationForm.webImageUrl" />
                <div v-else class="upload-icon cp">web</div>
              </div>

              <div class="bfc-d" @click="showUpload('appImageUrl', 'operationForm')">
                <img class="logo" v-if="operationForm.appImageUrl" :src="operationForm.appImageUrl" />
                <div v-else class="upload-icon cp">app</div>
              </div>
            </FormItem>
          </Form>
          <div class="demo-drawer-footer ar">
            <Button style="margin-right: 8px" @click="isOperation = false">取消</Button>
            <Button type="primary" @click="save(1, 'operationForm')">确定</Button>
          </div>
        </Drawer>

        <!-- 上传图片弹窗 -->
        <dialogBox v-model="upload.show">
          <div slot="title">图片上传</div>
          <Form style="width: 20vw;">
            <FormItem>
              <Input
                v-model="iconUrl"
                placeholder="请输入图片地址"
                style="width: 70%; margin-right: 10px;"
              />
              <Upload
                :action="$config.services.upload"
                :format="['png','gif','jpg']"
                :show-upload-list="false"
                :on-success="uploadSuccess"
                :on-format-error="formatError"
                style="display:inline-block;"
              >
                <Button icon="ios-cloud-upload-outline">上传</Button>
              </Upload>
            </FormItem>
          </Form>
          <div class="demo-drawer-footer ar">
            <Button style="margin-right: 8px" @click="upload.show = false">取消</Button>
            <Button type="primary" @click="uploadIcon">确定</Button>
          </div>
        </dialogBox>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getMenuList,
  getApplicationPage,
  addMenu,
  deleteMenu,
  updateMenu,
  getOperationList
} from "@/api/menu";
import { getLesseePageByJB, getLesseePage } from "@/api/lessee";
// import { getAllIds } from "@/config/util.js";
const defaultApplicationForm = {
  name: "", // *名称
  type: "", // 业务类型2:保险,1:Saas,0:信贷,3:基金;4:理财 默认保险
  level: "", // 所属版本 0:基础版 1:高级版 2:旗舰版 默认基础版
  companyIds: "", // 所属租户名称 ；1,2
  menuUrl: "", // *web地址
  webImageUrl: "", // web图标地址
  appImageUrl: "", // app图标地址
  classify: "", // *菜单类型,0菜单,1操作,2目录,3应用
  pid: "", // 父级id
  terminal: [], // 适用终端 0:web 1:app 2:pad 3:小程序 默认web
  operateStr: [] // 操作id集合 1,2,3
};
export default {
  name: "appManage",
  data() {
    return {
      query: {
        page: 1,
        size: 10,
        keywords: ""
      },
      total: 0,
      columns: [
        {
          type: "selection",
          align: "center",
          width: 80,
          key: "id"
        },
        {
          title: "应用名称",
          key: "name"
        },
        {
          title: "所属行业",
          slot: "type",
          tooltip: true
        },
        {
          title: "所属租户",
          slot: "companyIds",
          ellipsis: true
        },
        {
          title: "所属版本",
          slot: "level",
          tooltip: true
        }
      ],
      selectData: [],
      isApplicantion: false, // 显隐应用抽屉
      // 显隐上传icon弹窗
      upload: {
        show: false,
        terminal: 0, // 适用终端 0:web 1:app 2:pad 3:小程序 默认web
        type: 0 // 0 应用表单，1 操作表单
      },
      isOperation: false, // 显隐操作抽屉
      applicantForm: Object.assign({}, defaultApplicationForm),
      operationForm: Object.assign({}, defaultApplicationForm),
      // 抽屉样式
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      // 业务类型列表
      typeList: Object.freeze({
        0: "信贷",
        1: "Saas",
        2: "保险",
        3: "基金",
        4: "理财"
      }),
      // 版本列表
      levelList: Object.freeze({
        0: "基础版",
        1: "高级版",
        2: "旗舰版"
      }),
      // 终端列表
      terminalList: Object.freeze({
        0: "web",
        1: "app",
        2: "pad",
        3: "小程序"
      }),
      iconUrl: "",
      list: [],
      editOperation: {}, // 操作编辑项
      searchLoading: false,
      lesseeList: [],
      // 新选择的所选租户列表
      newSelectedList: [],
      rules: {
        name: [
          { required: true, message: "不能为空", trigger: "blur" },
          { max: 10, message: "长度不能超过10个字符", trigger: "blur" }
        ],
        type: [
          {
            type: "number",
            required: true,
            message: "必选项",
            trigger: "change"
          }
        ],
        level: [
          {
            type: "number",
            required: true,
            message: "必选项",
            trigger: "change"
          }
        ],
        terminal: [
          {
            type: "array",
            required: true,
            message: "至少选择一项",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    // let userInfo = localStorage.getItem("UserInfo")
    //   ? JSON.parse(localStorage.getItem("UserInfo"))
    //   : {};
    // if (userInfo.companyIds) {
    //   this.companyIds = userInfo.companyIds;
    // }
    this.getData();
  },
  methods: {
    getData(page) {
      page && (this.query.page = page);
      // 获取所有应用列表
      getApplicationPage(this.query).then(res => {
        // console.log("ApplicationPage：", res.records);
        this.list = res.records;
        this.total = Number(res.total);
      });
    },
    selectChange(selection) {
      this.selectData = selection;
    },
    // 显隐应用抽屉
    showApplication(data) {
      this.$refs.applicantForm.resetFields();
      this.isApplicantion = true;
      this.applicantForm = Object.assign({}, defaultApplicationForm);
      this.newSelectedList = []
      if (data) {
        this.applicantForm = Object.assign({}, data);
        // 适用终端字符串集合转为数组
        this.applicantForm.terminal = data.terminal.split(",");

        // 所属租户提取id数组
        this.applicantForm.companyIds = [];
        for (const iterator of data.companyRelationMenuList) {
          this.applicantForm.companyIds.push(iterator.companyId);
        }

        console.log("applicantForm: ", this.applicantForm);
        getOperationList(data.id).then(res => {
          // console.log('OperationList: ', res)
          this.$set(this.applicantForm, "operateStr", res || []);
          // this.isApplicantion = true;
        });
      }
    },
    // 显隐操作抽屉
    showOperation(data, type) {
      this.$refs.operationForm.resetFields();
      this.isOperation = true;
      if (type) {
        // console.log(data);
        // 编辑操作
        this.editOperation = data;
        this.operationForm = Object.assign({}, defaultApplicationForm, data);
        // 适用终端字符串集合转为数组
        typeof this.operationForm.terminal === "string" &&
          (this.operationForm.terminal = data.terminal.split(","));

        // 所属租户字符串集合转为数组
        typeof data.companyIds === "string" &&
          (this.operationForm.companyIds = data.companyIds.split(","));

        this.operationForm.pName = this.applicantForm.name;
        this.operationForm.pid = this.applicantForm.id;
      } else {
        // 添加操作
        this.operationForm = Object.assign({}, defaultApplicationForm);
        this.operationForm.pName = data.name;
        this.operationForm.pid = data.id;
      }
    },
    // 是否选中应用
    getIds(type, isSingle) {
      // type: 0:添加操作 1:编辑应用 2:删除应用
      // isSingle: 是否单选
      if (!this.selectData.length) {
        this.$Notice.destroy();
        this.$Notice.warning({
          title: "请选择应用"
        });
        return;
      }
      if (isSingle && this.selectData.length > 1) {
        this.$Notice.destroy();
        this.$Notice.warning({
          title: "只支持操作一种应用"
        });
        return;
      }
      switch (type) {
        case 0:
          this.showOperation(this.selectData[0]);
          break;
        case 1:
          this.showApplication(this.selectData[0]);
          break;
        case 2:
          this.delApps(this.selectData);
          break;
      }
    },
    // 编辑应用/操作
    save(classify, type) {
      this[type].classify = classify;
      let form = Object.assign({}, this[type]);
      // let form = JSON.parse(JSON.stringify(this[type]))
      // 适用终端数组转为字符串集合
      form.terminal += "";
      // 如果是编辑应用，则需提取操作id集合
      if (classify === 3 && this.applicantForm.id) {
        form.operateStr = [];
        for (const iterator of this.applicantForm.operateStr) {
          // debugger
          form.operateStr.push(iterator.id);
        }
      }
      // 操作id数组转为字符串集合
      form.operateStr += "";
      // form.operateStr && (form.operateStr += "");

      // 所属租户id数组转为字符串集合
      form.companyIds += "";

      this.$refs[type]
        .validate()
        .then(data => {
          if (data) {
            return form.id ? updateMenu(form) : addMenu(form);
          } else {
            return new Promise((resolve, reject) => {});
          }
        })
        .then(res => {
          classify === 3
            ? (this.isApplicantion = false)
            : (this.isOperation = false);
          this.selectData = [];
          this.$Message.success("操作成功");

          // 更新编辑后的操作
          Object.assign(this.editOperation, this.operationForm);
          // this.editOperation.name = this.operationForm.name;
          this.getData();
        });
    },
    // 删除应用
    delApps(data) {
      let form = [];
      for (const iterator of data) {
        form.push(iterator.id);
      }
      this.$Modal.confirm({
        title: "提示",
        content: "确定删除吗？",
        onOk: () => {
          deleteMenu(form + "", 3).then(res => {
            this.$Message.success("操作成功");
            this.selectData = [];
            this.getData();
          });
        }
      });
    },
    /**
     * 显示上传图标弹窗
     * classify 菜单类型,0菜单,1操作,2目录,3应用
     * terminal 适用终端 0:web 1:app 2:pad 3:小程序 默认web
     */
    showUpload(terminal, type) {
      this.upload = {
        show: true,
        terminal,
        type
      };
      this.iconUrl = this[this.upload.type][this.upload.terminal];
    },
    uploadSuccess(response, file, fileList) {
      this.iconUrl = response.result.fileUrl;
      // console.log(response, file)
    },
    uploadIcon() {
      this.$set(this[this.upload.type], this.upload.terminal, this.iconUrl);
      this.upload.show = false;
    },
    formatError() {
      this.$Message.error("文件格式错误，仅限[jpg,png,gif]格式的文件");
    },
    getLesseePage(name) {
      let query = {
        page: 1,
        size: 100,
        name
      };
      getLesseePage(query).then(res => {
        this.searchLoading = false;
        this.lesseeList = res.list;
      });
    },
    choiceOption(data) {
      for (const iterator of this.newSelectedList) {
        if (iterator.id === data.id) {
          return
        }
      }
      this.$nextTick(() => {
        this.newSelectedList.push(data);
      })
    }
  }
};
</script>
