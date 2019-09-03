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
            width: 80%;
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
    <Row>
      <Col span="6">
        <Select v-model="model1" style="width:45%">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="model1" style="width:45%">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Button type="primary" long>+ 新建菜单</Button>

        <menu-item :list="routesSaas"></menu-item>
      </Col>

      <Col span="18">
        <div class="s-wrapper">
          <div class="apps-manage-list">
            <div class="s-title">
              <div class="search-input">
                <i class="iconfont"></i>
                <Input type="text" v-model="searchName" placeholder="搜你想搜、输入文字并回车" />
              </div>
              <div class="top-btn">
                <span class="add-btn" @click="newsApps">
                  <i class="iconfont">&#xe657;</i>+添加应用
                </span>
                <span class="other" @click="getIds(0)">上移</span>
                <span class="other" @click="getIds(1, true)">下移</span>
                <span class="other" @click="getIds(2)">移出</span>
              </div>
            </div>
            <div class="a-content">
              <div v-if="total" class="apps-table">
                <Table
                  ref="organUserList"
                  :columns="columns"
                  :data="memberData"
                  @selectChange="selectChange"
                ></Table>
                <Page class-name="ac" :total="total" @on-change="goPage" />
              </div>
              <div v-else class="noData">
                <div class="center">
                  <p>暂无相关数据</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
// import { getAllIds } from "@/config/util.js";
import menuItem from './menu-item'

export default {
  name: "appManage",
  components: {
    menuItem
  },
  data() {
    return {
      companyId: "",
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
      selectData: []
    };
  },
  methods: {
    intData() {},
    goPage(page) {
      this.pageNum = page;
    },
    // 新建应用
    newsApps() {},
    selectChange(selection) {
      this.selectData = selection;
    },
    // 是否选中应用
    getIds(status, isSingle) {
      // status: 0:添加操作 1:编辑应用 2:删除应用
      // isSingle: 是否单选
      let selectListData = this.selectData;
      // let selectIds = getAllIds(selectListData);
      if (!selectListData.length) {
        this.$Notice.destroy();
        this.$Notice.warning({
          title: "请选择应用"
        });
        return;
      }
      if (isSingle && selectListData.length) {
        this.$Notice.destroy();
        this.$Notice.warning({
          title: "只支持操作一种应用"
        });
        return;
      }
      switch (status) {
        case 0:
          this.addOperate(selectIds);
          break;
        case 1:
          this.editApps(selectIds);
          break;
        case 2:
          this.delApps(selectIds);
          break;
      }
    },
    // 添加操作
    addOperate(ids) {
      console.log(ids);
    },
    // 编辑应用
    editApps(ids) {},
    // 删除应用
    delApps(ids) {}
  },
  mounted() {
    let userInfo = localStorage.getItem("UserInfo")
      ? JSON.parse(localStorage.getItem("UserInfo"))
      : {};
    if (userInfo.companyId) {
      this.companyId = userInfo.companyId;
    }
    this.intData();
  }
};
</script>
