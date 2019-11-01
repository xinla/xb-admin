<style lang="less" scoped>
.apps-manage {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .menu-apps {
    display: flex;
    .all-menu-wrap {
      width: 30%;
      margin-right: 1%;
      flex: 1;
      max-width: 300px;
    }
  }
  .apps-manage-list {
    background: #f1f3f5;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 60%;
    flex: 1;
    .top-btn {
      padding: 10px;
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
    .a-content {
      display: flex;
      flex-direction: column;
      background: #fff;
      flex: 1;
      overflow: auto;
      .a-page {
        padding: 10px 0 20px;
        font-size: 12px;
      }
    }
  }
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
// iview 下拉菜单列表过多支持滚动
/deep/.ivu-select-dropdown {
  max-height: 200px;
  overflow: auto;
}
.no-data{
  text-align: center;
  padding: 100px 0;
}
/deep/.ivu-checkbox-group-item {
    vertical-align: top;
        width: 105px;
}
.app-icon{
  width: 100px;
  height: 100px;
  margin: 10px 15px 15px 0;
}
</style>
<style lang="less">
.apps-manage {
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
    <div class="menu-apps">
      <div class="all-menu-wrap">
        <Select v-model="meunType1" style="width:45%; margin-right: 8%;" @on-change="getAllMenu()">
          <Option v-for="(value, key) in typeList" :value="+key" :key="key">{{ value }}</Option>
        </Select>
        <Select v-model="meunType2" style="width:45%" @on-change="getAllMenu()">
          <Option value="管理面板" :key="0">管理面板</Option>
          <Option value="工作台" :key="1">工作台</Option>
        </Select>
        <Button type="primary" long style="margin: 10px 0;" @click="editMenu()">+ 新建菜单</Button>

        <div style="background: #fff;">
          <menu-item
            v-if="allMenu.length"
            :list="allMenu"
            :is-more-menu="true"
            @clickMenu="getData"
            @clickMoreMenu="clickMoreMenu"
          ></menu-item>
          <div v-else class="no-data">暂无数据</div>
        </div>
      </div>

      <div class="apps-manage-list">
        <div class="top-btn ar">
          <span class="add-btn" @click="showApplicantion">
            <i class="iconfont"></i>+添加应用
          </span>
          <span class="other" @click="edit(0)">上移</span>
          <span class="other" @click="edit(1)">下移</span>
          <span class="other" @click="edit(2)">移出</span>
        </div>
        <div class="a-content">
            <Table
              ref="organUserList"
              :loading="loading"
              :columns="columns"
              :data="applicantionList"
              @on-selection-change="selectChange"
            ></Table>
        </div>
        <Page :total="total" :current="query.page" show-elevator show-total style="text-align:center;margin-top:20px;" @on-change="getDataPage"/>
      </div>
    </div>

    <!-- 新建/编辑菜单 -->
    <dialogBox v-model="isMenu">
      <div slot="title">{{menuForm.id ? '编辑' : '新建'}}{{menuForm.pid !== allMenu.id && '子'}}菜单</div>
      <Form :model="menuForm" label-position="left" :label-width="80" style="width: 20vw;">
        <FormItem label="所属行业" v-show="menuForm.pid == allMenu.id">
          <div>{{typeList[menuForm.type]}}</div>
          <!-- <Select v-model="menuForm.type" placeholder="请输入行业名称" disabled>
            <Option v-for="(value, key) in typeList" :value="+key" :key="key">{{ value }}</Option>
          </Select>-->
        </FormItem>
        <FormItem label="匹配位置" v-show="menuForm.pid == allMenu.id">
          <div>{{meunType2}}</div>
          <!-- <Select v-model="meunType2" placeholder="请输入匹配位置" disabled>
            <Option :value="0" :key="0">管理面板</Option>
            <Option :value="1" :key="1">工作台</Option>
          </Select>-->
        </FormItem>
        <FormItem label="菜单名称">
          <Input v-model="menuForm.name" placeholder="请输入菜单名称" />
        </FormItem>
        <FormItem label="上级菜单">
          <!-- <Input v-model="menuForm.pName" readonly @on-focus="showMenuSelect" placeholder="请选择上级菜单名称" @on-blur="showMenuSelect" />
          <transition name="slide-up">
          <menu-item v-show="menuForm.isSelect" :list="allMenu" @clickMenu="clickMenu1"></menu-item>
          </transition>-->

          <Dropdown
            trigger="custom"
            :visible="menuForm.isSelect"
            placement="bottom-start"
            @on-clickoutside="menuForm.isSelect = false"
            style="width: 100%;"
          >
            <Input
              v-model="menuForm.pName"
              readonly
              placeholder="请选择上级菜单名称"
              @on-focus="showMenuSelect"
            />
            <DropdownMenu slot="list" style="margin-left: 8px;">
              <menu-item :list="allMenu" @clickMenu="clickMenu1"></menu-item>
            </DropdownMenu>
          </Dropdown>
        </FormItem>
        <FormItem label="ICON">
          <!-- <Upload
            :action="$config.services.upload"
            :format="['png','gif','jpg']"
            :show-upload-list="false"
            :on-success="uploadSuccessWeb"
            :on-format-error="formatError"
            style="display: inline-block; margin: 0 20px 20px 0;"
          >
            <img class="logo" v-if="menuForm.webImageUrl" :src="menuForm.webImageUrl" />
            <div v-else class="upload-icon cp">web端</div>
          </Upload>

          <Upload
            :action="$config.services.upload"
            :format="['png','gif','jpg']"
            :show-upload-list="false"
            :on-success="uploadSuccessApp"
            :on-format-error="formatError"
            style="display: inline-block;"
          >
            <img class="logo" v-if="menuForm.appImageUrl" :src="menuForm.appImageUrl" />
            <div v-else class="upload-icon cp">APP</div>
          </Upload>-->

          <div class="bfc-d" style="margin: 0 20px 20px 0;" @click="showUpload('webImageUrl')">
            <img class="logo" v-if="menuForm.webImageUrl" :src="menuForm.webImageUrl" />
            <div v-else class="upload-icon cp">web</div>
          </div>

          <div class="bfc-d" @click="showUpload('appImageUrl')">
            <img class="logo" v-if="menuForm.appImageUrl" :src="menuForm.appImageUrl" />
            <div v-else class="upload-icon cp">app</div>
          </div>
        </FormItem>
      </Form>
      <div class="demo-drawer-footer ar">
        <Button style="margin-right: 20px" @click="isMenu = false">取消</Button>
        <Button type="primary" @click="save(0)">确定</Button>
      </div>
    </dialogBox>

    <!--  -->
    <Drawer title="添加应用" v-model="isApplicantion" width="500">
      <CheckboxGroup v-model="addApplicantionsList">
        <Checkbox
          v-for="(item, index) of allApplicantions"
          :label="item.id"
          :key="index"
        >{{item.name}}
        <img class="app-icon" v-if="item.webImageUrl" :src="item.webImageUrl" />
        </Checkbox>
      </CheckboxGroup>
      <div class="demo-drawer-footer ar" style="margin-top: 20px">
        <Button style="margin-right: 8px" @click="isApplicantion = false">取消</Button>
        <Button type="primary" @click="addApplicantion()">确定</Button>
      </div>
    </Drawer>

    <!-- 上传图片弹窗 -->
    <dialogBox v-model="upload.show">
      <div slot="title">图片上传</div>
      <Form style="width: 20vw;">
        <FormItem>
          <Input v-model="iconUrl" placeholder="请输入图片地址" style="width: 70%; margin-right: 10px;" />
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
</template>
<script>
// import { getAllIds } from "@/config/util.js";
import {
  getMenuList,
  getApplicationPage,
  getApplicationListByMenuId,
  addMenu,
  deleteApp,
  deleteMenu,
  moveApp,
  getMenuDetail,
  updateMenu,
  saveApplicationForMenu
} from "@/api/menu";
import menuItem from "./menu-item";

const defaultMenuForm = {
  name: "", // *名称
  type: "", // 业务类型2:保险,1:Saas,0:信贷,3:基金;4:理财 默认保险
  level: "", // 所属版本 0:基础版 1:高级版 2:旗舰版 默认基础版
  companyName: "", // 所属租户名称 ；1,2
  menuUrl: "", // *web地址
  webImageUrl: "", // web图标地址
  appImageUrl: "", // app图标地址
  classify: "", // *菜单类型,0菜单,1操作,2目录,3应用
  pid: "", // 父级id
  terminal: "", // 适用终端 0:web 1:app 2:pad 3:小程序 默认web

  isSelect: false,
  currentMore: ""
};
const defaultMenuFormChildren = {};
export default {
  name: "appManage",
  components: {
    menuItem
  },
  data() {
    return {
      query: {
        keyword: "",
        page: 1,
        size: 10,
        pid: ""
      },
      searchName: "",
      total: 2,
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
      applicantionList: [],
      selectData: [],
      meunType1: 2, // 业务类型   2:保险,1:Saas,0:信贷,3:基金;4:理财
      meunType2: "管理面板",
      typeList: {
        0: "信贷",
        1: "Saas",
        2: "保险",
        3: "基金",
        4: "理财"
      },
      isMenu: false,
      isApplicantion: false,
      menuForm: Object.assign({}, defaultMenuForm),
      // menuFormChildren: Object.assign({}, defaultMenuFormChildren),
      allMenu: [],
      addApplicantionsList: [],
      allApplicantions: [],
      loading: false, // 应用列表加载loading
      // 显隐上传icon弹窗
      upload: {
        show: false,
        terminal: 0 // 适用终端 0:web 1:app 2:pad 3:小程序 默认web
      },
      iconUrl: ""
    };
  },
  mounted() {
    this.intData();
  },
  methods: {
    intData() {
      this.getAllMenu();
    },
    getAllMenu() {
      getMenuList(this.meunType1).then(res => {
        // console.log("MenuList: ", res);
        async function recursiveGetMenu(data) {
          for (const iterator of data) {
            if (iterator.hasChild) {
              iterator.children = await getMenuList(
                this.meunType1,
                iterator.id
              );
              await recursiveGetMenu.call(this, iterator.children);
            }
          }
          return data;
        }
        recursiveGetMenu.call(this, res).then(_res => {
          // console.log("_res:", _res);
          // this.allMenu = _res;

          for (const iterator of _res) {
            if (iterator.name == this.meunType2) {
              this.allMenu = iterator.children || [];
              // 设置默认一级菜单id
              this.allMenu.id = iterator.id;
              break;
            }
          }
        });
      });
    },
    selectChange(selection) {
      this.selectData = selection;
    },
    // 是否选中应用
    edit(type) {
      // type: 0:上移 1:下移 2:删除应用
      // isSingle: 是否单选
      if (!this.selectData.length) {
        this.$Notice.destroy();
        this.$Notice.warning({
          title: "请选择应用"
        });
        return;
      }
      if (type !== 2 && this.selectData.length > 1) {
        this.$Notice.destroy();
        this.$Notice.warning({
          title: "只支持操作一种应用"
        });
        return;
      }
      switch (type) {
        case 0:
          this.moveUp(this.selectData[0], this.applicantionList);
          break;
        case 1:
          this.moveDown(this.selectData[0], this.applicantionList);
          break;
        case 2:
          this.remove(this.selectData);
          break;
      }
    },
    // 上移动
    moveUp(data, currentTxt) {
      let index;
      for (const iterator of currentTxt) {
        if (data.id === iterator.id) {
          index = currentTxt.indexOf(iterator);
          break;
        }
      }
      if (index === 0) {
        this.$Message.warning("已经移在改页最顶部");
        return;
      }
      // 被移动项
      let move = currentTxt[index - 1];
      moveApp(data.id, move.id).then(res => {
        // 移动项互换位置
        currentTxt[index - 1] = data;
        currentTxt.splice(index, 1, move);
      });
    },
    // 下移动
    moveDown(data, currentTxt) {
      let index;
      for (const iterator of currentTxt) {
        if (data.id === iterator.id) {
          index = currentTxt.indexOf(iterator);
          break;
        }
      }
      if (index === currentTxt.length - 1) {
        this.$Message.warning("已经移在改页最底部");
        return;
      }
      // 被移动项
      let move = currentTxt[index + 1];
      moveApp(data.id, move.id).then(res => {
        // 移动项互换位置
        currentTxt[index + 1] = data;
        currentTxt.splice(index, 1, move);
      });
    },
    // 移出应用
    remove() {
      let selectData = [];
      for (const iterator of this.selectData) {
        selectData.push(iterator.id);
      }
      this.$Modal.confirm({
        title: "提示",
        content: "确定要移出吗",
        onOk: () => {
          deleteApp(selectData + "").then(res => {
            this.$Message.success("操作成功");
            this.getData();
          });
        }
      });
    },
    // uploadSuccessWeb(response, file, fileList) {
    //   this.$set(this.menuForm, "webImageUrl", response.result.fileUrl);
    //   // this.menuForm.webImageUrl = response.result.fileUrl;
    //   // console.log(response, file)
    // },
    // uploadSuccessApp(response, file, fileList) {
    //   this.$set(this.menuForm, "appImageUrl", response.result.fileUrl);
    //   // this.menuForm.appImageUrl = response.result.fileUrl;
    //   // console.log(response, file)
    // },
    formatError() {
      this.$Message.error("文件格式错误，仅限[jpg,png,gif]格式的文件");
    },
    addApplicantion() {
      this.isApplicantion = false;
      // let applicatonIds = [];
      // for (const iterator of this.addApplicantionsList) {
      //   applicatonIds.push(iterator.id);
      // }
      // applicatonIds += "";
      // console.log(this.addApplicantionsList);
      saveApplicationForMenu(
        this.query.pid,
        this.addApplicantionsList + ""
      ).then(res => {
        this.$Message.success("操作成功");
        this.getData()
      });
    },
    getData(data) {
      // console.log(data);
      if (data) {
        this.query = {
          keyword: "",
          page: 1,
          size: 10,
          pid: data.id
        };
      }
      this.loading = true;
      getApplicationPage(this.query).then(res => {
        console.log("ApplicationPage：", res)
        this.loading = false;
        this.total = res.total;
        this.applicantionList = res.records;
      });
    },
    getDataPage(page) {
      this.query.page = page
      this.getData()
    },
    clickMoreMenu(args) {
      switch (args[0]) {
        case "edit":
          this.editMenu(args[1]);
          break;
        case "addChildMenu":
          this.addChildMenu(args[1]);
          break;
        case "moveMenuUp":
          this.moveUp(args[1], args[2]);
          break;
        case "moveMenuDown":
          this.moveDown(args[1], args[2]);
          break;
        case "remove":
          this.$Modal.confirm({
            title: "提示",
            content: "确定要删除吗",
            onOk: () => {
              deleteMenu(args[1].id, 0).then(res => {
                this.$Message.success("操作成功");
                args[2].splice(args[2].indexOf(args[1]), 1);
              });
            }
          });
          break;
        default:
          break;
      }
    },
    editMenu(data) {
      this.isMenu = true;
      // console.log("editMenu: ", data);
      // this.menuForm = Object.assign({}, defaultMenuForm);
      if (data) {
        getMenuDetail(data.id).then(res => {
          // console.log(res)
          this.menuForm = Object.assign({}, res);
        });
      } else {
        this.menuForm = Object.assign({}, defaultMenuForm, {
          pid: this.allMenu.id
        });
      }
      this.menuForm.type = this.meunType1;
    },
    addChildMenu(data) {
      this.isMenu = true;
      // console.log("addChildMenu: ", data);
      this.menuForm = Object.assign({}, defaultMenuForm);
      this.menuForm.pName = data.name;
      this.menuForm.pid = data.id;
      this.menuForm.type = this.meunType1;
    },
    save(type) {
      this.menuForm.classify = type;
      Promise.resolve()
        .then(() => {
          if (this.menuForm.id) {
            return updateMenu(this.menuForm);
          } else {
            return addMenu(this.menuForm);
          }
        })
        .then(res => {
          this.$Message.success("操作成功");
          this.isMenu = false;
          this.getAllMenu();
        });
    },
    showMenuSelect() {
      setTimeout(() => {
        this.$set(this.menuForm, "isSelect", !this.menuForm.isSelect);
      }, 200);
      // console.log('isSelect: ', this.menuForm.isSelect)
    },
    clickMenu1(data) {
      this.$set(this.menuForm, "isSelect", !this.menuForm.isSelect);
      this.menuForm.pid = data.id;
      this.$set(this.menuForm, "pName", data.name);
      // console.log("isSelect: ", data);
    },
    showApplicantion() {
      if (!this.query.pid) {
        this.$Message.warning("请点击选择要添加菜单项");
        return;
      }
      getApplicationListByMenuId(this.query.pid).then(res => {
        // console.log("allApplicationPage：", res);
        this.isApplicantion = true;
        // 已添加应用
        let applicatonIds = [];
        for (const iterator of this.applicantionList) {
          applicatonIds.push(iterator.id);
        }
        this.addApplicantionsList = applicatonIds;
        this.allApplicantions = res;
      });
    },
    /**
     * 显示上传图标弹窗
     * classify 菜单类型,0菜单,1操作,2目录,3应用
     * terminal 适用终端 0:web 1:app 2:pad 3:小程序 默认web
     */
    showUpload(terminal) {
      this.upload = {
        show: true,
        terminal
      };
    },
    uploadSuccess(response, file, fileList) {
      this.iconUrl = response.result.fileUrl;
      // console.log(response, file)
    },
    uploadIcon() {
      this.$set(this.menuForm, this.upload.terminal, this.iconUrl);
      this.upload.show = false;
    }
  }
};
</script>
