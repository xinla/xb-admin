<style lang="less" scoped>
.apps-manage {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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
    .noData {
      width: 100%;
      height: 100%;
      font-size: 12px;
      color: #999;
      text-align: center;
      position: relative;
      .center {
        position: absolute;
        width: 100%;
        left: 0;
        top: 50%;
        margin-top: -40px;
        .btn {
          display: inline-block;
          color: #fff;
          font-size: 12px;
          cursor: pointer;
          padding: 0 15px;
          height: 26px;
          line-height: 26px;
          margin-top: 20px;
          border-radius: 4px;
          background: #6582ff;
          box-sizing: border-box;
        }
      }
    }
  }
}
/deep/.mask {
  z-index: 10000;
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
            <i class="iconfont">&#xe623;</i>
            <input type="text" v-model="keywords" @keyup.enter="search" placeholder="搜你想搜、输入文字并按回车键搜索" />
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
              :data="memberData"
              @selectChange="selectChange"
              @rowDoubleClick="rowDoubleClick"
            ></Table>
            <Page
              v-if="total"
              class-name="a-page"
              :total="total"
              :page-size="pageSize"
              @on-change="goPage"
            />
          </div>
          <div v-else class="noData">
            <div class="center">
              <p>暂无相关数据</p>
            </div>
          </div>
        </div>

        <Drawer
          :title="applicantForm.id ? '编辑应用' : '新建应用'"
          v-model="isApplicantion"
          width="500"
          :styles="styles"
        >
          <Form :model="applicantForm" label-position="left" :label-width="80">
            <FormItem label="应用名称">
              <Input v-model="applicantForm.name" placeholder="请输入功能名称" />
            </FormItem>
            <FormItem label="所属行业" prop="mainClass">
              <RadioGroup v-model="applicantForm.mainClass">
                <Radio :label="0">保险</Radio>
                <Radio :label="0">保险</Radio>
                <Radio :label="0">基金</Radio>
                <Radio :label="1">总控</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="所属版本" prop="mainClass">
              <RadioGroup v-model="applicantForm.mainClass">
                <Radio :label="0">基础版</Radio>
                <Radio :label="0">高级版</Radio>
                <Radio :label="1">旗舰版</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="所属租户">
              <Input v-model="applicantForm.name" placeholder="请输入租户名称" />
            </FormItem>
            <FormItem label="适用终端" prop="function">
              <CheckboxGroup v-model="applicantForm.function">
                <Checkbox label="0">web端</Checkbox>
                <Checkbox label="1">手机端</Checkbox>
                <Checkbox label="2">PAD端</Checkbox>
                <Checkbox label="3">小程序</Checkbox>
                <Checkbox label="4">投资理财</Checkbox>
                <Checkbox label="5">财富传承</Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="Web地址">
              <Input v-model="applicantForm.desc" placeholder="请输入请求地址" />
            </FormItem>
            <FormItem label="ICON">
              <Button style="margin-right: 8px" @click="isUpload = true">web</Button>
              <Button style="margin-right: 8px" @click="isUpload = false">app</Button>
            </FormItem>
          </Form>
          <div class="demo-drawer-footer">
            <Button style="margin-right: 8px" @click="isApplicantion = false">取消</Button>
            <Button type="primary" @click="editApps()">确定</Button>
          </div>
        </Drawer>

        <Drawer
          :title="operationForm.id ? '编辑操作' : '新建操作'"
          v-model="isOperation"
          width="500"
          :styles="styles"
        >
          <Form :model="applicantForm" label-position="left" :label-width="80">
            <FormItem label="所属应用">
              <Input v-model="applicantForm.name" placeholder="请输入功能名称" />
            </FormItem>
            <FormItem label="操作名称">
              <Input v-model="applicantForm.name" placeholder="请输入租户名称" />
            </FormItem>
            <FormItem label="适用终端" prop="function">
              <CheckboxGroup v-model="applicantForm.function">
                <Checkbox label="0">web端</Checkbox>
                <Checkbox label="1">手机端</Checkbox>
                <Checkbox label="2">PAD端</Checkbox>
                <Checkbox label="3">小程序</Checkbox>
                <Checkbox label="4">投资理财</Checkbox>
                <Checkbox label="5">财富传承</Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="Web地址">
              <Input v-model="applicantForm.desc" placeholder="请输入请求地址" />
            </FormItem>
            <FormItem label="ICON">
              <Button style="margin-right: 8px" @click="isUpload = true">web</Button>
              <Button style="margin-right: 8px" @click="isUpload = false">app</Button>
            </FormItem>
          </Form>
          <div class="demo-drawer-footer">
            <Button style="margin-right: 8px" @click="isOperation = false">取消</Button>
            <Button type="primary" @click="editOperation()">确定</Button>
          </div>
        </Drawer>

        <!-- 上传图片弹窗 -->
        <dialogBox v-model="isUpload">
          <div slot="title">图片上传</div>
          <Form :model="applicantForm">
            <FormItem>
              <Input v-model="applicantForm.name" placeholder="please enter user name" />
              <Upload
                :action="$config.services.upload"
                :format="['png','gif','jpg']"
                :show-upload-list="false"
                :on-success="uploadSuccess"
                :on-format-error="formatError"
                :data="{image: true}"
              >
                <Button icon="ios-cloud-upload-outline">上传</Button>
              </Upload>
            </FormItem>
          </Form>
          <div class="demo-drawer-footer">
            <Button style="margin-right: 8px" @click="isUpload = false">取消</Button>
            <Button type="primary" @click="isUpload = false">确定</Button>
          </div>
        </dialogBox>
      </div>
    </div>
  </div>
</template>
<script>
// import { getAllIds } from "@/config/util.js";
const defaultApplicationForm = {};
const defaultOperationForm = {};
export default {
  name: "appManage",
  data() {
    return {
      companyId: "",
      keywords: "",
      total: 2,
      pageSize: 9,
      pageNum: 1,
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
          key: "industry",
          tooltip: true
        },
        {
          title: "所属租户",
          key: "tenement",
          tooltip: true
        },
        {
          title: "所属版本",
          key: "versions",
          tooltip: true
        }
      ],
      memberData: [
        {
          id: "2222",
          name: "保单托管",
          industry: "保险",
          tenement: "全部",
          versions: "基础版"
        },
        {
          id: "1111",
          name: "制作建议书",
          industry: "保险",
          tenement: "全部",
          versions: "基础版"
        }
      ],
      selectData: [],
      isApplicantion: false, // 显隐应用抽屉
      isUpload: false, // 显隐上传icon弹窗
      isOperation: false, // 显隐操作抽屉
      applicantForm: Object.assign({}, defaultApplicationForm),
      operationForm: Object.assign({}, defaultOperationForm),
      // 抽屉样式
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      }
    };
  },
  mounted() {
    let userInfo = localStorage.getItem("UserInfo")
      ? JSON.parse(localStorage.getItem("UserInfo"))
      : {};
    if (userInfo.companyId) {
      this.companyId = userInfo.companyId;
    }
    this.intData();
  },
  methods: {
    intData() {},
    goPage(page) {
      this.pageNum = page;
    },
    search() {
      console.log(1)
    },
    selectChange(selection) {
      this.selectData = selection;
    },
    // 显隐应用抽屉
    showApplication(data) {
      this.isApplicantion = true;
      this.applicantForm = Object.assign({}, defaultApplicationForm);
      data && (this.applicantForm = data);
    },
    // 显隐操作抽屉
    showOperation(data) {
      this.isOperation = true;
      this.operationForm = Object.assign({}, defaultOperationForm);
      data &&
        ((this.operationForm.name = data.name),
        (this.operationForm.pid = data.id));
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
          this.showOperation(this.selectData[0])
          break;
        case 1:
          this.showApplication(this.selectData[0]);
          break;
        case 2:
          this.delApps(this.selectData);
          break;
      }
    },
    // 添加操作
    addOperate(ids) {
      console.log(ids);
    },
    // 编辑应用
    editApps() {
      this.isApplicantion = false;
      // 调用编辑更新应用接口
    },
    editOperation() {
      this.isOperation = false;
      // 调用编辑更新操作接口
    },
    // 删除应用
    delApps(data) {},
    rowDoubleClick(data) {
      this.isApplicantion = true;
      this.applicantForm = Object.assign({}, defaultApplicationForm);
      this.applicantForm = data;
    },
    uploadSuccess(response, file, fileList) {
      this.form.policyWording = response.result.fileUrl;
      this.form.policyWordingName = response.result.newName;
      this.form.policyWordingImages = response.result.imageUrl;
      // console.log(response, file)
    },
    formatError() {
      this.$Message.error("文件格式错误，仅限pdf和ppt格式的文件");
    }
  }
};
</script>
