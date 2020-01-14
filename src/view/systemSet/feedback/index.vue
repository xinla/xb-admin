<template>
  <div class="x-h100">
    <div class="bg pb24">
      <Select
        v-model="query.type"
        style="width:150px; margin-right:10px;"
        placeholder="请选择类型"
        @on-change="getData()"
      >
        <Option value>全部</Option>
        <Option v-for="(item, index) in typeList" :value="item.value" :key="index">{{ item.label }}</Option>
      </Select>
      <Select
        v-model="query.status"
        style="width:150px;"
        placeholder="请选择状态"
        @on-change="getData()"
      >
        <Option value>全部</Option>
        <Option
          v-for="(item, index) in statusList"
          :value="item.value"
          :key="index"
        >{{ item.label }}</Option>
      </Select>

      <div class="right fr">
        <Button
          type="primary"
          :disabled="!this.selectData.length || disDispose"
          @click="multEdit(1)"
        >处理</Button>
        <Button
          type="primary"
          :disabled="!this.selectData.length || disClose"
          @click="multEdit(2)"
        >关闭</Button>
        <Button type="error" :disabled="!this.selectData.length" @click="multEdit(0)">删除</Button>
      </div>
    </div>

    <Table :loading="loading" :columns="columns" :data="list" @on-selection-change="selectChange">
      <template slot-scope="{ row }" slot="type">{{row.type | type}}</template>
      <template slot-scope="{ row }" slot="status">
        <Tag :color="statusList[row.status].color">{{statusList[row.status].label}}</Tag>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button size="small" class="button-pri" @click="goDetail(row)">详情</Button>
        <Button :disabled="row.status != 0" class="button-pri" @click="edit(row, 1)">处理</Button>
        <Button
          type="warning"
          class="button-pri"
          :disabled="row.status > 1"
          @click="edit(row, 2)"
        >关闭</Button>
        <Button class="button-err" @click="edit(row, 3)">删除</Button>
      </template>
    </Table>

    <Page
      v-show="+total"
      :total="total"
      :current="query.page"
      show-elevator
      show-total
      class="c-page" 
      @on-change="getData"
    />

    <dialogBox v-model="isModal">
      <div slot="title">反馈详情</div>
      <Form ref="form" :label-width="80">
        <FormItem label="类型：">{{form.type | type}}</FormItem>
        <FormItem label="当前状态：">
          <Tag :color="transStatus(form.status).color">{{transStatus(form.status).label}}</Tag>
        </FormItem>
        <FormItem label="反馈人：">{{form.companyName}} {{form.userName}}</FormItem>
        <FormItem label="反馈时间：">{{form.createTime}}</FormItem>
        <FormItem label="内容：">{{form.content}}</FormItem>
        <FormItem label="图片：">
          <img
            class="img"
            v-for="(item, index) in (form.imgUrl ? form.imgUrl.split(',') : [])"
            :src="item"
            :key="index"
          />
        </FormItem>
        <FormItem label>
          <Button
            type="primary"
            size="small"
            :disabled="form.status != 0"
            style="margin-right: 20px"
            @click="edit(form, 1)"
          >处理</Button>
          <Button
            type="warning"
            size="small"
            :disabled="form.status > 1"
            style="margin-right: 20px"
            @click="edit(form, 2)"
          >关闭</Button>
          <Button type="error" size="small" style="margin-right: 20px" @click="edit(form, 3)">删除</Button>
          <Button type="info" size="small" style="margin-right: 20px" @click="isModal = false">取消</Button>
        </FormItem>
      </Form>
    </dialogBox>
  </div>
</template>

<script>
import {
  saveFeedback,
  getFeedbackPage,
  multSaveFeedback
} from "@/api/systemHelp";

const defaultForm = {
  type: 0, // 0 建议，1 问题
  content: "",
  imgUrl: "",
  modelData: "",
  userId: "",
  companyId: "",
  createTime: "",
  status: 0
};
const type = [
  {
    label: "建议",
    value: 0
  },
  {
    label: "问题",
    value: 1
  }
];
export default {
  filters: {
    type(val) {
      if (val > 1) {
        return;
      }
      val || (val = 0);
      return type[val].label;
    }
  },
  data() {
    return {
      loading: false,
      query: {
        page: 1,
        size: 10,
        type: "",
        status: ""
      },
      columns: [
        {
          type: "selection",
          width: 50
        },
        {
          title: "类型",
          slot: "type",
          filters: type,
          width: 80,
          filterMultiple: false,
          filterMethod(value, row) {
            return row.type === value;
          }
        },
        {
          title: "反馈时间",
          key: "createTime"
        },
        {
          title: "内容详情",
          key: "content",
          tooltip: true
        },
        {
          title: "当前状态",
          slot: "status"
        },
        {
          title: "所属用户",
          key: "userName"
        },
        {
          title: "所属租户",
          key: "companyName"
        },
        {
          title: "操作",
          slot: "action",
          width: 240
        }
      ],
      list: [],
      total: 0,
      typeList: type,
      // 0 未处理  1已处理 2已关闭
      statusList: [
        {
          value: 0,
          label: "未处理",
          color: "default"
        },
        {
          value: 1,
          label: "已处理",
          color: "success"
        },
        {
          value: 2,
          label: "已关闭",
          color: "error"
        }
      ],
      isModal: false,
      form: Object.assign({}, this.defaultForm),
      selectData: []
    };
  },
  computed: {
    disDispose() {
      // type 0删除 1处理 2关闭
      for (const iterator of this.selectData) {
        if (iterator.status != 0) {
          // this.$Message.error("所选项存在非未处理项，不可进行处理操作");
          return true;
        }
      }
    },
    disClose() {
      for (const iterator of this.selectData) {
        if (iterator.status > 1) {
          // this.$Message.error("所选项存在已关闭项，不可进行关闭操作");
          return true;
        }
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(page) {
      page && (this.query.page = page);
      this.loading = true;
      getFeedbackPage(this.query).then(res => {
        // console.log("FeedbackPage: ", res);
        this.loading = false;
        this.list = res.list;
        this.total = res.total;
      });
    },
    goDetail(data) {
      this.isModal = true;
      this.form = data;
    },
    edit(data, type) {
      let form = Object.assign({}, data);
      if (type != 3) {
        form.status = type;
      } else {
        form.isDel = 1;
      }
      if (form.isDel) {
        this.$Modal.confirm({
          title: "提示",
          content: "确定要删除吗",
          onOk: () => {
            saveFeedback(form).then(res => {
              this.$Message.success("操作成功");
              this.isModal = false;
              this.getData();
            });
          }
        });
        return;
      }
      saveFeedback(form).then(res => {
        this.$Message.success("操作成功");
        this.isModal = false;
        this.getData();
      });
    },
    multEdit(type) {
      let status = "";
      let isDelete = "";
      if (type) {
        status = type;
      } else {
        isDelete = 1;
      }
      if (isDelete) {
        this.$Modal.confirm({
          title: "提示",
          content: "确定要删除吗",
          onOk: () => {
            multSaveFeedback(this.selectData, status, isDelete).then(res => {
              this.$Message.success("操作成功");
              this.getData();
              this.selectData = [];
            });
          }
        });
        return;
      }
      multSaveFeedback(this.selectData, status, isDelete).then(res => {
        this.$Message.success("操作成功");
        this.getData();
        this.selectData = [];
      });
    },
    selectChange(data) {
      this.selectData = data;
    },
    transStatus(val) {
      // console.log(val)
      val || (val = 0);
      return this.statusList[val];
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.dialog {
  width: 40vw;
}
.img {
  width: 70px;
  height: 70px;
  margin: 2px 5px 2px 0;
}
</style>
